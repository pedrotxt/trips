import Routes from "./route";

import { BrowserRouter } from 'react-router-dom';

import './index.css';

import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes/>
    </BrowserRouter> 
  );
}
export default App;