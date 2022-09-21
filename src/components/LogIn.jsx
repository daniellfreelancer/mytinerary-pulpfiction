import React, { useState } from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { useSignOutUserMutation } from "../features/userAPI";
import '../styles/App.css'
import swal from 'sweetalert2';
import {useSelector} from 'react-redux'

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


  const [show, setShow] = useState(false);

  const goToSignIn = useNavigate()

  function showUserInt() {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  }

  const userLoggin = useSelector((state) => state.auth)



  const handleSignOut = (e) => {
    e.preventDefault();

    let userMail = {
      email: userLoggin.email
    }

    signOutUser(userMail)
      .then((res) => {

        if (res.error) {

          let dataError = res.error
          let dataMessage = dataError.data

          swal.fire({
            title: "Error!",
            text: dataMessage.message,
            icon: "error",
          });
        } else {
          let dataResponse = res.data
          let dataSuccess = dataResponse.message
          swal.fire({
            title: "Bye! " + userLoggin.name,
            text: dataSuccess,
            icon: "success",
          });
        }

      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      goToSignIn('/signin')
      localStorage.removeItem('token')
    }, 2500)


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
            { userLoggin.logged === true ? (<p className="navlink-burger"> {userLoggin.name} </p>) : (<LinkRouter className="navlink-burger" to={signUp.to} key={signUp.id}>
              {signUp.title}
            </LinkRouter>)}
            {
              localStorage.length === 0 ? (
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
    </div>
  );
}

export default LogIn;
