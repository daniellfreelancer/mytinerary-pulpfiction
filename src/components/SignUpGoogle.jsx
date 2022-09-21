import React, { useEffect, useRef, useState } from 'react'
import * as jose from 'jose'
import { useSignUpUserMutation } from '../features/userAPI';
import AlertComponent from './AlertComponent';
import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function SignUpGoogle() {

    const buttonDiv = useRef()
    const [addNewUser] = useSignUpUserMutation();
    const [modalOpen, setModalOpen] = useState(false);
    const [messageError, setMessageError] = useState("")
    const [messageTittle, setMessageTittle] = useState("")
    const [iconSVG, setIconSVG] = useState("")
    const gotToSignIn = useNavigate()



    async function handleCredentialResponse(response) {

        let myJWT = jose.decodeJwt(response.credential)

        let newUser = {
            name: myJWT.given_name,
            lastName: myJWT.family_name,
            country: myJWT.azp,
            photo: myJWT.picture,
            pass: myJWT.sub,
            role: "admin",
            email: myJWT.email,
            from: "google"
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

                }

            })
            .catch((error) => {
                console.log(error)
            });

            setTimeout(()=>{
                gotToSignIn('/signin')
            },2000)

    }


    useEffect(() => {

        /*global google*/

        google.accounts.id.initialize({
            client_id: '820739169251-195lv27q4l66i7m1fd0j6gbq4es0oh8l.apps.googleusercontent.com',
            callback: handleCredentialResponse,
            context: "signup"
        })


        google.accounts.id.renderButton(
            buttonDiv.current,
            { theme: "outline", size: "large" }
        )


    }, [])


    return (
        <>
            <div>
                <div ref={buttonDiv}></div>
            </div>
        </>
    )
}

export default SignUpGoogle