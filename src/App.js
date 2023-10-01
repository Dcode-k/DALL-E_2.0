import {BrowserRouter} from 'react-router-dom'
// import styles from './App.module.css'
import Header from './components/Header/Header';
import Main from './components/Main/Main';


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Main/>
    </BrowserRouter>
  );
}

export default App;
