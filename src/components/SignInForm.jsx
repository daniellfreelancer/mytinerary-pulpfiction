import React, { useRef } from 'react'
import SignInGoogle from './SignInGoogle'

function SignInForm() {

    const passwordUserRef = useRef()
    const emailUserRef = useRef()




    //const [addNewUser] = useSignUpMutation();

    const handleSubmit = (e) => {
        e.preventDefault();

        let userFrom = 'form'

        let newUser = {
            password: passwordUserRef.current.value,
            email: emailUserRef.current.value,
            from: userFrom
        };
        console.log(newUser)
    }

    //   addNewUser(newUser)
    //       .then((res) => console.log(res))
    //       .catch((error) => {
    //         console.log(error);
    //       });

    //       let signupForm = document.querySelector("#form-new-users");
    //       signupForm.reset();
    //     };


    const arrayForm = [
        {
            id: "_password",
            name: "Password",
            type: "text",
            value: passwordUserRef,
        },
        {
            id: "_email",
            name: "Email",
            type: "email",
            value: emailUserRef,
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
                <p>
                    Simply fill in the blanks
                </p>

                {arrayForm.map(formView)}

                <input className="input-submit" type="submit" value="Submit" />

            </fieldset>
            <fieldset>
                <SignInGoogle />
            </fieldset>
        </form>
    )
}

export default SignInForm