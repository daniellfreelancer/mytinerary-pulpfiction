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
import NewItineraryPage from './pages/NewItineraryPage';
import { useEffect, useState } from 'react';
import MyAccount from './pages/MyAccount';


function App() {

  const [statusLogged, setStatusLogged] = useState(false)

  useEffect(() => {

    if( localStorage.length > 0){
      setStatusLogged(true)
    } 
  }, [statusLogged]);




  return (
      <BrowserRouter> 
          <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/cities' element={<Cities/>}/>
            <Route path='*' element={<UnderConstruction/>}/>
            <Route path='/newCities' element={statusLogged === true && <NewCities/>}/>
            <Route path='/details/:id' element={<Details/>}/>
            <Route path='/editCity/:id' element={<EditCity/>}/>
            <Route path='/myTineraries' element={<MyTineraries/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/signin' element={<SignInPage/>}/>
            <Route path='/newitinerary' element={<NewItineraryPage/>}/>
            <Route path='/myAccount' element={statusLogged === true && <MyAccount/>}/>

          </Routes>
      </BrowserRouter>
  );
}

export default App;
