import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {fetchProducts} from './redux/slices/productsSlice'
import Home from './pages/Home';
import Detail from './pages/Detail';
import Layout from '../src/components/layout';
import Sepet from "./pages/Sepet"


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  },[])




  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' exact element={<Layout><Home/></Layout> } />
        <Route path='/sepet' exact element={<Layout><Sepet/></Layout>} />
        <Route path='/item/:id' exact element={<Layout><Detail/></Layout>} />
      </Routes>
    </Router>




    </div>
  );
}

export default App;
