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

export function updateAmountReserve(id, quantidade){
  return( 
    {
      type: 'UPDATE_RESERVE',
      id,
      quantidade
    })
}