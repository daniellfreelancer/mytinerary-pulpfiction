import React, { useRef } from 'react'
import { useSignInUserMutation, useSignOutUserMutation } from '../features/userAPI';
import SignInGoogle from './SignInGoogle'

function SignInForm() {

    const passwordUserRef = useRef()
    const emailUserRef = useRef()
    const [signInUser] = useSignInUserMutation();
    const [signOutUser] = useSignOutUserMutation();

    
    const handleSubmit = (e) => {
        e.preventDefault();

        let userFrom = 'google'

        let newUser = {
            pass: passwordUserRef.current.value,
            email: emailUserRef.current.value,
            from: userFrom
        };

        signInUser(newUser)
          .then((res) => {

            console.log(res)
            
          localStorage.setItem('testUser', JSON.stringify(res.data.response.user));

        })
          .catch((error) => {
            console.log(error);
          });

        let signupForm = document.querySelector("#form-new-users");
        signupForm.reset();
    }
    let variableTest

    if(localStorage.length === 0) {
        console.log("local esta vacio")
    } else {
        variableTest =  JSON.parse(localStorage.getItem('testUser'))
    }

    console.log(variableTest)

     const handleSignOut = (e) =>{
        e.preventDefault();

        let userMail = {
            email:variableTest.email
        }

        console.log(userMail)

        signOutUser(userMail)
        .then((res) =>console.log(res))
        .catch((error) => {
          console.log(error);
        });

        localStorage.clear()
     }

    

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
        }
    ];

    const formView = (e) => {
        return (
            <label key={e.id}>
                Enter the {e.name}: <br />
                <input
                    className="input-text"
                    type={e.type}
                    name={e.name}
                    ref={e.value}
                />
            </label>
        );
    };
    return (
      <form id="form-new-users" onSubmit={handleSubmit}>
        <fieldset>
          <h2>Here you can Sign In your account!</h2>
          <p>Simply fill in the blanks</p>

          {arrayForm.map(formView)}

          <input className="input-submit" type="submit" value="Submit" />
        </fieldset>
        <fieldset>
          <SignInGoogle />

          <br />
          {localStorage.length !== 0 ? (
                      <div key={variableTest.id}>
                      <button onClick={handleSignOut}>sign Out</button>
                      <p> {variableTest.id} </p>
                      <p> {variableTest.name} </p>
                      <p> {variableTest.email} </p>
                      <img src={variableTest.photo} alt={variableTest.name} />
                    </div>
          ) : (
            <button>No está logueado</button>
          )}

        </fieldset>
      </form>
    );
}

export default SignInForm