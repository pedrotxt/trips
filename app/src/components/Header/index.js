import React from 'react';
// useSelector é responsavel por conectar o redux com nossos reducers 
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './style.css';

export default function Header() {
  const reserveSize = useSelector(state => state.reserve.length);

 return (
   <header className='container'>

     <Link to='/'>
      <img className='logo' src={logo} alt="Logo do projeto" />
     </Link>

     <Link className='reserva' to='/reservas'>
       <div>
         <strong>Minhas Reservas</strong> <br/>
         <span>{reserveSize} reservas</span>
       </div>
     </Link>

   </header>
 );
}