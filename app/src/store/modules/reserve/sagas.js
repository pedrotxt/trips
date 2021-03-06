// Redux Saga

// select conseguimos trazer todo nosso state
// não podemos fazer dentro do saga requisições http igual fazia, para isso precisamos importar do redux saga o metodo call
import { select, call, put, all, takeLatest } from 'redux-saga/effects';

// pegando nossas actions
import { addReserveSuccess, updateAmountSuccess } from './actions';

// importando api para fazer requisições
import api from '../../../services/api';



// * - generator (tem a mesma função de esperar uma requisição para proseguir do async/await)
function* addToReserve({id}){

  // yield funciona como se fosse o await
  // redux saga é um middler - ex: quando solicitar uma reserva, iria disparar uma action, saga vai receber essa action, fazer a requisição e em algum momento o saga poderia disparar uma action pro reducer e o reducer iria mostrar as informações completas da api

  const tripExists = yield select(
    // verificando se o item ja existe na minha lista
    state => state.reserve.find(trip => trip.id === id)
  );

  // fazendo verificação do estoque das viagens
  // fazendo a requisição e tendo acesso ao id e ao amount(quantidade)
  const myStock = yield call(api.get, `stock/${id}`);

  // colocando a quantidade de vagas disponiveis nessa const
  const stockAmount = myStock.data.amount;

  // verificando se essa viagem existe, se existe pegar a quantidade que temos dentro da nossa lista
  // se não existe, quer dizer que não tem esse id na lista e ele começa com 0
  const currentStock = tripExists ? tripExists.amount : 0;

  // somando para sempre ter valor atual de vagas
  const amount = currentStock + 1;

  // se valor atual de vagas for maior a quantidade de vagas disponivel não pode passar
  if(amount > stockAmount){
    alert('Quantidade maxima atingida!');
    return;
  }
  
  // se a quantidade atual de vagas ainda for menor que vagas disponiveis então adiciona mais 1 toda vez que chamar essa action e vai seguir aqui para baixo e fazer a adição e etc..
  if(tripExists){
    yield put(updateAmountSuccess(id, amount));

  } else {
    // se ainda não tiver esse item clicado na lista, ele vai chamar a api e adicionar na lista
    const response = yield call(api.get, `trips/${id}`);

    const data = {
      ...response.data,
      amount: 1
    };

    // disparar actions do redux saga com put para nosso reduce
    yield put(addReserveSuccess(data));

 

  }
  
}

function* updateAmount({ id, amount }){
  if(amount <=0 ) return;

  const myStock = yield call(api.get, `stock/${id}`);

  const stockAmount = myStock.data.amount;

  if(amount > stockAmount){
    alert('Quantidade maxima atingida.');
    return;
  }

  yield put(updateAmountSuccess(id, amount));

}

// metodo all: listeners - vai ficar ouvindo
export default all([
  // metodo takeLatest: ex: fazendo varias requisições(clicou 2 vezes muito rapido) - no takeLatest se ele ainda tiver terminando ainda a primeira requisição ele so vai executar a ultima requisição(no caso a do 2 clique)
  takeLatest('ADD_RESERVA_REQUEST', addToReserve),
  takeLatest('UPDATE_RESERVE_REQUEST', updateAmount)
]);