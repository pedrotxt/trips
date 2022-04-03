import React, {useState, useEffect} from 'react';

// reponsavel por disparar uma ação pro redux
import { useDispatch } from 'react-redux';

import { addReserve } from '../../store/modules/reserve/actions';

import {MdFlightTakeoff} from 'react-icons/md';

import './style.css';

import api from '../../services/api';


export default function Home() {

  const dispatch = useDispatch();
  
  const [trips, setTrips] = useState([]);
  
  useEffect(()=>{

    async function loadApi(){
      const response = await api.get('trips');
      setTrips(response.data);

      console.log(response.data);
    }

    loadApi();

  }, []);

  // onClick vai receber o objeto inteiro com todas informações (trip)
  function handleAdd(trip){
    // disparando uma ação para nosso redux
    dispatch(addReserve(trip));
  }

  // renderização condicional no status
 return (
   <div>
     <div className='box'>
       {trips.map(trip => (
         <li key={trip.id}>
           <img src={trip.image} alt={trip.title} />
           <strong>{trip.title}</strong>
           <span>Status: {trip.status ? 'Disponivel' : 'Indisponivel'}</span>

           <button
            type='button'
            onClick={ ()=> handleAdd(trip) }
           >
             <div>
               <MdFlightTakeoff size={16} color='#FFF' />
             </div>
             <span>Solicitar reserva</span>
           </button>
         </li>
       ))}
     </div>
   </div>
 );
}