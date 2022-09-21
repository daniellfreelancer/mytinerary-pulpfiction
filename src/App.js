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
import MyAccount from './pages/MyAccount';
import { useDispatch, useSelector } from 'react-redux';
import { setStateLogin } from './features/stateLocalStorage';
import VerifiedPage from './pages/VerifiedPage';
import {useSignInTokenMutation } from "./features/userAPI";
import {useEffect} from 'react'
import swal from 'sweetalert2';
import { setUserLogin, setUserLogout } from './features/authSignIn';


function App() {
  const loginStateRedux = useSelector(state => state.statesLocalStorage)
  const dispatchLogin = useDispatch()
  const [signInToken] =useSignInTokenMutation()

   if (JSON.parse(localStorage.getItem('token'))){
    
    dispatchLogin(setStateLogin(true))
   } else {
    dispatchLogin(setStateLogin(false))
  }

  const signInWithToken = async () =>{

    signInToken()
    .then((res)=>{
      if (res.error) {
        let dataError = res.error;
        let dataMessage = dataError.data;
        swal.fire({
          title: "Error!",
          text: dataMessage.message,
          icon: "error",
        });
        
        dispatchLogin(setUserLogout())
        localStorage.removeItem('token')
        
      } else {
        let dataResponse = res.data;
        let dataSuccess = dataResponse.message;
        let thisIsTheUser = res.data.response.user
        dispatchLogin(setUserLogin(thisIsTheUser))
        swal.fire({
          title: "Welcome again!",
          text: dataSuccess,
          icon: "success",
        });
        
      }
    }).catch((error)=>{
      console.log(error)
      dispatchLogin(setUserLogout())

    })
  }
  
  useEffect(() => {

      signInWithToken()

    
  }, [])


  return (
      <BrowserRouter> 
          <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/cities' element={<Cities/>}/>
            <Route path='*' element={<UnderConstruction/>}/>
            <Route path='/newCities' element={loginStateRedux === true && <NewCities/> }/>
            <Route path='/details/:id' element={<Details/>}/>
            <Route path='/editCity/:id' element={<EditCity/>}/>
            <Route path='/myTineraries' element={<MyTineraries/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/signin' element={<SignInPage/>}/>
            <Route path='/newitinerary' element={<NewItineraryPage/>}/>
            <Route path='/myAccount' element={loginStateRedux === true ? <MyAccount/> : <UnderConstruction/>}/>
            <Route path='/auth/verify' element={<VerifiedPage/>}/>

          </Routes>
      </BrowserRouter>
  );
}

export default App;
