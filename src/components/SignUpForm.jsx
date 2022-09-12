import { React, useRef } from "react";
import "../styles/App.css";
import SignUpGoogle from "./SignUpGoogle";


function SignUpForm() {

    const nameUserRef = useRef()
    const photoUserRef = useRef()
    const passwordUserRef = useRef()
    const roleUserRef = useRef()
    const fromUserRef = useRef()
    const emailUserRef = useRef()
    const countryUserRef = useRef()

    //const [addNewUser] = useSignUpMutation();

    const handleSubmit = (e) => {
        e.preventDefault();


        let newUser = {
            name: nameUserRef.current.value,
            country: countryUserRef.current.value,
            photo: photoUserRef.current.value,
            password: passwordUserRef.current.value,
            role: roleUserRef.current.value,
            email: emailUserRef.current.value,
            from: fromUserRef.current.value
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
            id: "_country",
            name: "Country",
            type: "text",
            value: countryUserRef,
        },
        {
            id: "_photo",
            name: "Photo",
            type: "text",
            value: photoUserRef,
        },
        {
            id: "_name",
            name: "Name",
            type: "text",
            value: nameUserRef,
        },
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
        },
        {
            id: "_role",
            name: "Admin / User",
            type: "text",
            value: roleUserRef,
        },
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
                <h2>Here you can Sign Up!</h2>
                <p>
                    Simply fill in the blanks
                </p>

                {arrayForm.map(formView)}

                <input className="input-submit" type="submit" value="Submit" />

            </fieldset>
            <fieldset>
                <SignUpGoogle />
            </fieldset>
        </form>
    )
}

export default SignUpForm