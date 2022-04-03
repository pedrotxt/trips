// quem vai ouvir essa action é o reducer
export function addReserveSuccess(trip){
  return(
    {
      // parametro obrigatorio type
      type: 'ADD_RESERVA_SUCESS',
      // o que passar para nosso redux
      trip
    })
}

// quem vai ouvir essa action é o redux saga
export function addReserveRequest(id){
  return(
    {
      type: 'ADD_RESERVA_REQUEST',
      id 
    })
}

export function removeReserve(id){
  return(
    {
      type: 'REMOVE_RESERVE',
      id
    })
}

// ouvida pelo saga, e quando ele fizer sua requisição e tiver tudo certo, vamos chamar a action sucess e quem vai estar ouvindo a sucess é o nosso reducer
export function updateAmountRequest(id, amount){
  return( 
    {
      type: 'UPDATE_RESERVE_REQUEST',
      id,
      amount
    })
}
export function updateAmountSuccess(id, amount){
  return( 
    {
      type: 'UPDATE_RESERVE_SUCCESS',
      id,
      amount
    })
}