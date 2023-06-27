import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../src/screens/Home.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
