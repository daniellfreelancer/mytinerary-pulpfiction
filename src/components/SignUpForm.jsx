import { React, useRef } from "react";
import { useSignUpUserMutation } from "../features/userAPI";
import "../styles/App.css";
import SignUpGoogle from "./SignUpGoogle";
import swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


function SignUpForm() {

    const nameUserRef = useRef()
    const photoUserRef = useRef()
    const passwordUserRef = useRef()
    const emailUserRef = useRef()
    const countryUserRef = useRef()
    const lastNameUserRef = useRef()
    const gotToSignIn = useNavigate()

    const [addNewUser] = useSignUpUserMutation();




    const handleSubmit = (e) => {
        e.preventDefault();


        let newUser = {
            name: nameUserRef.current.value,
            lastName: lastNameUserRef.current.value,
            country: countryUserRef.current.value,
            photo: photoUserRef.current.value,
            pass: passwordUserRef.current.value,
            role: "user",
            email: emailUserRef.current.value,
            from: "form"
        };


        addNewUser(newUser)
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
                        title: "Welcome! ",
                        text: dataSuccess,
                        icon: "success",
                    });

                    //Account has been create with success!!


                    let signupForm = document.querySelector("#form-new-users");
                    signupForm.reset();

                }

            })
            .catch((error) => {
                console.log(error)
            });
        setTimeout(() => {
            gotToSignIn('/signin')
        }, 2500)

    };






    const arrayForm = [
        {
            id: "_name",
            name: "Name",
            type: "text",
            value: nameUserRef,
        },
        {
            id: "_lastName",
            name: "LastName",
            type: "text",
            value: lastNameUserRef,
        },
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
        }


    ];

    const formView = (e) => {
        return (
            <label key={e.id}>
                Enter {e.name}: <br />
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
            <form id="form-new-users" onSubmit={handleSubmit}>

                <div className="container-form new-user">
                    <div className="form-new" >
                        <p>Sign Up</p>
                        <div className="new-user-input">
                            {arrayForm.map(formView)}
                        </div>
                        <input className="btn-form" type="submit" value="Submit" />
                        <p>or</p>
                        <SignUpGoogle />
                    </div>
                </div>
            </form>
            <div className="div-modal">
            </div>

        </>
    )
}

export default SignUpForm