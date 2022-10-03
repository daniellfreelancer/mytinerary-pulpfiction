import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSignInUserMutation } from "../features/userAPI";
import SignInGoogle from "./SignInGoogle";
import swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { setUserLogin } from "../features/authSignIn";

function SignInForm() {
  const passwordUserRef = useRef();
  const emailUserRef = useRef();
  const [signInUser] = useSignInUserMutation()
  const dispatch = useDispatch()


  const goToMyAccount = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userFrom = "form";

    let newUser = {
      pass: passwordUserRef.current.value,
      email: emailUserRef.current.value,
      from: userFrom,
    };

    signInUser(newUser)
      .then((res) => {
        if (res.error) {
          let dataError = res.error;
          let dataMessage = dataError.data;
          swal.fire({
            title: "Error!",
            text: dataMessage.message,
            icon: "error",
          });

        } else {

          let dataResponse = res.data;
          let dataSuccess = dataResponse.message;
          dispatch(setUserLogin(res.data.response.user))
          localStorage.setItem('token', JSON.stringify(res.data.response.token))
          swal.fire({
            title: "Welcome again!",
            text: dataSuccess,
            icon: "success",
          });
          let signupForm = document.querySelector("#form-log-users");
          signupForm.reset();

          setTimeout(() => {
            goToMyAccount('/cities')
          }, 2500)

        }
      })
      .catch((error) => {
        console.log(error);
      });

      localStorage.getItem("token");
  };

  

  

  const arrayForm = [
    {
      id: "_email",
      name: "Email",
      type: "email",
      value: emailUserRef,
    },
    {
      id: "_password",
      name: "Password",
      type: "password",
      value: passwordUserRef,
    },
  ];

  const formView = (e) => {
    return (
      <label key={e.id}>
        Enter the {e.name}: <br />
        <input
          className="btn-form"
          type={e.type}
          name={e.name}
          ref={e.value}
        />
      </label>
    );
  };
  return (
    <>
      <form id="form-log-users" onSubmit={handleSubmit}>

        <div className="container-form">
          <div className="form-new" >
            <p>Welcome</p>
            {arrayForm.map(formView)}
            <input className='btn-form' type="submit" value="Sign in" />
            <p>or</p>
            <SignInGoogle />
          </div>
        </div>
      </form>
      <div className="div-modal">
      </div>

    </>
  );
}

export default SignInForm;