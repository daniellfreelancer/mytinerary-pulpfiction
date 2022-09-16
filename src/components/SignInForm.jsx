import React, { useRef, useState } from "react";
import { useSignInUserMutation } from "../features/userAPI";
import AlertComponent from "./AlertComponent";
import SignInGoogle from "./SignInGoogle";

function SignInForm() {
  const passwordUserRef = useRef();
  const emailUserRef = useRef();
  const [signInUser] = useSignInUserMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageTittle, setMessageTittle] = useState("");
  const [iconSVG, setIconSVG] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let userFrom = "google";

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
          setModalOpen(true);
          setMessageError(dataMessage.message);
          setMessageTittle("Error");
          setIconSVG(
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fillRule="currentColor"
              className="bi bi-exclamation-diamond-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          );
        } else {
          let dataResponse = res.data;
          let dataSuccess = dataResponse.message;
          setModalOpen(true);
          setMessageError(dataSuccess);
          setMessageTittle("Success");
          setIconSVG(
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fillRule="currentColor"
              className="bi bi-check-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
            </svg>
          );
          localStorage.setItem(
            "testUser",
            JSON.stringify(res.data.response.user)
          );
          let signupForm = document.querySelector("#form-log-users");
          signupForm.reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    localStorage.getItem("testUser");
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
      type: "text",
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
            <input class='btn-form' type="submit" value="Sign in" />
            <p>or</p>
            <SignInGoogle />
          </div>
        </div>
      </form>
      <div className="div-modal">
        {modalOpen === true ? (
          <AlertComponent
            setOpenModal={setModalOpen}
            setMessageError={messageError}
            setMessageTittle={messageTittle}
            setIconSVG={iconSVG}
          />
        ) : null}
      </div>

    </>
  );
}

export default SignInForm;