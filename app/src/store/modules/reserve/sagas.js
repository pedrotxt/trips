// Redux Saga

// não podemos fazer dentro do saga requisições http igual fazia, para isso precisamos importar do redux saga o metodo call
import { call, put, all, takeLatest } from 'redux-saga/effects';

// pegando nossas actions
import { addReserveSuccess } from './actions';

// importando api para fazer requisições
import api from '../../../services/api';

// * - generator (tem a mesma função de esperar uma requisição para proseguir do async/await)
function* addToReserve({id}){
  // yield funciona como se fosse o await
  // redux saga é um middler - ex: quando solicitar uma reserva, iria disparar uma action, saga vai receber essa action, fazer a requisição e em algum momento o saga poderia disparar uma action pro reducer e o reducer iria mostrar as informações completas da api
  const response = yield call(api.get, `trips/${id}`);

  // disparar actions do redux saga com put para nosso reduce
  yield put(addReserveSuccess(response.data));
}

// metodo all: listeners - vai ficar ouvindo
export default all([
  // metodo takeLatest: ex: fazendo varias requisições(clicou 2 vezes muito rapido) - no takeLatest se ele ainda tiver terminando ainda a primeira requisição ele so vai executar a ultima requisição(no caso a do 2 clique)
  takeLatest('ADD_RESERVA_REQUEST', addToReserve)
]);