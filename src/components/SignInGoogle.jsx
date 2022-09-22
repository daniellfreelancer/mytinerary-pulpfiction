import React, { useEffect, useRef, useState } from 'react'
import * as jose from 'jose'
import { useSignInUserMutation } from '../features/userAPI';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { setUserLogin } from "../features/authSignIn";

function SignInGoogle() {

    const buttonDiv = useRef()
    const [signInUser] = useSignInUserMutation();
    const goToMyAccount = useNavigate()
    const dispatch = useDispatch()

    async function handleCredentialResponse(response) {

        let myJWT = jose.decodeJwt(response.credential)

        console.log(myJWT)
        let loginUserFromGoogle = {
            email: myJWT.email,
            pass: myJWT.sub,
            from: "google"
        }
        signInUser(loginUserFromGoogle)
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
                    console.log(res)

                    dispatch(setUserLogin(res.data.response.user))

                    localStorage.setItem('token', JSON.stringify(res.data.response.token))

                    localStorage.getItem("token");

                    swal.fire({
                        title: "Welcome again! ",
                        text: dataSuccess,
                        icon: "success",
                    });

                     setTimeout(() => {
                         goToMyAccount('/cities')
                     }, 2000)


                }

            })
            .catch((error) => {
                console.log(error)
            });


    }


    useEffect(() => {

        /*global google*/

        google.accounts.id.initialize({
            client_id: "820739169251-195lv27q4l66i7m1fd0j6gbq4es0oh8l.apps.googleusercontent.com",
            callback: handleCredentialResponse,
            context: "signin"
        });


        google.accounts.id.renderButton(
            buttonDiv.current,
            { theme: "filled_black", size: "medium", text:'Sign In', shape:'pill' }  // customization attributes
        );


    }, [])


    return (
        <>
            <div className='div-modal-signinGoogle'>
            </div>
            <div>
                <div ref={buttonDiv} className='signin'></div>
            </div>
        </>
    )
}

export default SignInGoogle