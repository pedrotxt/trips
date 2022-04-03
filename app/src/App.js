import Routes from "./route";

import { BrowserRouter } from 'react-router-dom';

// esse Provider vai deixar com que todos os componentes consigam acessar as propriedades do redux, os conteudos, os reduxers...
import { Provider } from 'react-redux';

// Provider espera que passemos uma store
import store from './store';

import './index.css';

import Header from './components/Header';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes/>
    </BrowserRouter>
    </Provider>
  );
}
export default App;