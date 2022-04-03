import produce from 'immer';

// reducer por padrão tem uma state
// acesso as actions
export default function reserve( state = [], action){

  // o onclick da Home vai disparar uma ação pro redux com o respectivo type e também levando o que eu passei para essa ação, e quando ele chega no nosso reducer, vai verificar qual é a ação com action.type e depois retornar algo, caso não seja a action buscada retorna a state vazia por padrão
  // a action tem acesso ao type de todos nossos reducer
  switch(action.type){
    case 'ADD_RESERVA':
      // pegando tudo que ja tem no array e adicionando um objeto com uma nova trip a cada ação e uma quantidade

      // return [ ...state, {
      //   ...action.trip,
      //   quantidade: 1,
      // } ];

      // primeiro a state original depois a copia(draft) que vai ter acesso a toda nossa state original, assim podemos manipular o valor que tem na nossa state no draft
      return produce(state, draft =>{
        // const tripIndex: procura por algum index onde o trip.id é igual ao action.trip.id (se existir um index do objeto que for igual ao index desse mesmo objeto salvo na action, quer dizer que ele ja mandou esse objeto para action alguma vez, então a resposta dentro da constante vai ser esse index, e caso não tenha nenhuma action ainda com esse id a resposta vai ser -1)
        const tripIndex = draft.findIndex(trip => trip.id === action.trip.id);

        // se tiver um item repetido (quando não tem é -1), pegue o index dessa state/draft e adicione a quantidade +1 para ele
        if(tripIndex >= 0) {
          draft[tripIndex].quantidade += 1;
        } else {
          // se não tiver esse item na nossa lista adiciona normalmente
          draft.push({
            ...action.trip,
            quantidade: 1,
          });
        }
      });

    case 'REMOVE_RESERVE':
      return produce(state, draft =>{
        // não tem mais o trip pois estou mandando diretamente o id
        // buscando se tem alguma id dentro dessa lista
        const tripIndex = draft.findIndex(trip => trip.id === action.id);
        
        if(tripIndex >= 0){
          // excluir esse item do meu array passando qual a posição e excluindo o 1 objeto
          draft.splice(tripIndex, 1);
        }
      });

    case 'UPDATE_RESERVE':
      
      if(action.quantidade <= 0) {
        return state;
      }

      return produce(state, draft =>{
        // buscando qual produto ele clicou
        const tripIndex = draft.findIndex(trip => trip.id === action.id);

        if(tripIndex >= 0){
          // localizando o produto e vendo a quantidade que ja ta dentro dele e substituo pelo o que estou mandando na minha action (se é +1, -1)          
          draft[tripIndex].quantidade = Number(action.quantidade)
        }
      });

    default:
      return state;
  }

  
}