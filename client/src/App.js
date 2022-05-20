//Aqui vamos a setear nuestras rutas

import { Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Home from"./components/Home";
import Detail from"./components/Detail";
import CreateActivity from "./components/CreateActivity";
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<Header/>}/>
        <Route path='/countries/:id' element={<Header/>}/>
        <Route path='/create' element={<Header/>}/>
      </Routes>

      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/countries/:id" element={<Detail/>}/>
        <Route path="/create" element={<CreateActivity/>}/>
      </Routes>

      <Routes>
        <Route path='/home' element={<Footer/>}/>
        <Route path='/countries/:id' element={<Footer/>}/>
        <Route path='/create' element={<Footer/>}/>
      </Routes>
    </div>
  );
}

export default App;
