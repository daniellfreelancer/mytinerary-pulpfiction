import React, { useEffect, useRef, useState } from 'react'
import * as jose from 'jose'
import AlertComponent from './AlertComponent';
import { useSignInUserMutation } from '../features/userAPI';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2'

function SignInGoogle() {

    const buttonDiv = useRef()
    const [signInUser] = useSignInUserMutation();
    const [modalOpen, setModalOpen] = useState(false);
    const [messageError, setMessageError] = useState("")
    const [messageTittle, setMessageTittle] = useState("")
    const [iconSVG, setIconSVG] = useState("")
    const goToMyAccount = useNavigate()

    async function handleCredentialResponse(response) {

        let myJWT = jose.decodeJwt(response.credential)

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
                    let userLogged


                    if( JSON.parse(localStorage.getItem('testUser')) ) {
                        userLogged = JSON.parse(localStorage.getItem('testUser'))
                      } else {
                        
                        localStorage.setItem('token',JSON.stringify(res.data.response.token))
                        localStorage.setItem('testUser',JSON.stringify(res.data.response.user));
                        localStorage.getItem("testUser");
                        localStorage.getItem("token");

                        userLogged = JSON.parse(localStorage.getItem('testUser')) 
                      }
                      swal.fire({
                        title: "Welcome! " + userLogged.name,
                        text: dataSuccess,
                        icon: "success",
                      });

                    setTimeout(()=>{
                        goToMyAccount('/cities')
                    },2000)
                    

                }

            })
            .catch((error) => {
                console.log(error)
            });

        localStorage.getItem("testUser");
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
            { theme: "outline", size: "small" }  // customization attributes
        );


    }, [])


    return (
        <>
            <div className='div-modal-signinGoogle'>
                
            
                {/* {modalOpen === true ?
                    <AlertComponent
                        setOpenModal={setModalOpen}
                        setMessageError={messageError}
                        setMessageTittle={messageTittle}
                        setIconSVG={iconSVG}
                    /> :
                    null} */}
                </div>
            <div>
                <div ref={buttonDiv} className='signin'></div>
            </div>



        </>
    )
}

export default SignInGoogle