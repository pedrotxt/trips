export function addReserve(trip){
  return (
    {
      // parametro obrigatorio type
      type: 'ADD_RESERVA',
      // o que passar para nosso redux
      trip
    }
  )
}

export function removeReserve(id){
  return (
    {
      type: 'REMOVE_RESERVE',
      id,
    }
  )
}

export function updateAmountReserve(id, quantidade){
  return (
    {
      type: 'UPDATE_RESERVE',
      id,
      quantidade
    }
  )
}