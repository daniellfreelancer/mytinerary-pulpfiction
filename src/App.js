import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Cities from './pages/Cities';
import NewCities from './pages/NewCities';
import UnderConstruction from './pages/UnderConstruction';
import Welcome from './pages/Welcome';

function App() {



  return (
      <BrowserRouter> 
          <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/cities' element={<Cities/>}/>
            <Route path='*' element={<UnderConstruction/>}/>
            <Route path='/newCities' element={<NewCities/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
