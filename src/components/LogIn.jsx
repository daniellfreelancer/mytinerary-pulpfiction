import React, { useState } from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { useSignOutUserMutation } from "../features/userAPI";
import AlertComponent from "./AlertComponent";
import '../styles/App.css'
import swal from 'sweetalert2';

function LogIn() {

  const [signUp, setSignUp] = useState(
    { id: "_signUp", to: "/signup", title: "Sign Up" }
  )


  const [signOutUser] = useSignOutUserMutation();

  const [userSignIn, setUsersignIn] = useState({
    id: "_signin",
    to: "/signin",
    title: "Sign In"
  })

  const [userSignOut, setUsersignOut] = useState({
    id: "_signout",
    to: "/signin",
    title: "Sign Out"
  })
  const [modalOpen, setModalOpen] = useState(false);
  const [messageError, setMessageError] = useState("")
  const [messageTittle, setMessageTittle] = useState("")
  const [iconSVG, setIconSVG] = useState("")

  const [show, setShow] = useState(false);

  const goToSignIn = useNavigate()

  function showUserInt() {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  }



  let variableTest

  if( JSON.parse(localStorage.getItem('testUser'))) {
      variableTest =  JSON.parse(localStorage.getItem('testUser'))
  }

   const handleSignOut = (e) =>{
      e.preventDefault();

      let userMail = {
          email:variableTest.email
      }

      signOutUser(userMail)
      .then((res) =>{

        if (res.error){

        let dataError = res.error
        let dataMessage = dataError.data

        swal.fire({
          title: "Error!",
          text: dataMessage.message,
          icon: "error",
        });

      //   setModalOpen(true)
      //   setMessageError(dataMessage.message)
      //   setMessageTittle("Error")
      //   setIconSVG(<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
      //   <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      // </svg>)

        } else {
          let dataResponse = res.data
          let dataSuccess = dataResponse.message
          swal.fire({
            title: "Bye! " + variableTest.name,
            text: dataSuccess,
            icon: "success",
          });

      //    setModalOpen(true)
      //    setMessageError(dataSuccess)
      //    setMessageTittle("Success")
      //    setIconSVG(<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="currentColor" className="bi bi-check-square-fill" viewBox="0 0 16 16">
      //    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
      //  </svg>)

        }

      } )
      .catch((error) => {
        console.log(error);
      });

      setTimeout(()=>{
        goToSignIn('/signin')
        localStorage.removeItem('testUser')
        localStorage.removeItem('token')
      },2500)

      
   }

  return (
    <div className="LogIn-box">
      <button className="user-btn" onClick={showUserInt}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
      </button>
      <div>
        {show ? (
          <div className="Dropdown-menu-UI">
            {  localStorage.length > 0 ? (<p className="navlink-burger"> {variableTest.name} </p>  ) : (<LinkRouter className="navlink-burger" to={signUp.to} key={signUp.id}>
                {signUp.title}
              </LinkRouter>)}

            {
              localStorage.length == 0 ? (
                <LinkRouter className="navlink-burger" to={userSignIn.to} key={userSignIn.id}>
                  {userSignIn.title}
                </LinkRouter>
              ) : (
                <button className="navlink-burger navlink-signout" onClick={handleSignOut} >
                  {userSignOut.title}
                </button>
              )
            }


          </div>
        ) : null}
      </div>
      {/* {modalOpen == true ?
     <AlertComponent
     setOpenModal={setModalOpen}
     setMessageError={messageError}
     setMessageTittle={messageTittle}
     setIconSVG={iconSVG}
     /> :
     null} */}

    </div>
  );
}

export default LogIn;
