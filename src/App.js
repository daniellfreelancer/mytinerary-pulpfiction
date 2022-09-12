import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Cities from './pages/Cities';
import NewCities from './pages/NewCities';
import UnderConstruction from './pages/UnderConstruction';
import Welcome from './pages/Welcome';
import Details from './pages/Details';
import EditCity from './pages/EditCity';
import MyTineraries from './pages/MyTineraries';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

function App() {

  return (
      <BrowserRouter> 
          <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/cities' element={<Cities/>}/>
            <Route path='*' element={<UnderConstruction/>}/>
            <Route path='/newCities' element={<NewCities/>}/>
            <Route path='/details/:id' element={<Details/>}/>
            <Route path='/editCity/:id' element={<EditCity/>}/>
            <Route path='/myTineraries' element={<MyTineraries/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/signin' element={<SignInPage/>}/>

          </Routes>
      </BrowserRouter>
  );
}

export default App;
