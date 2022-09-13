import React, { useEffect, useRef } from 'react'
import * as jose from 'jose'
import { useSignUpUserMutation } from '../features/userAPI';


function SignUpGoogle() {

    const buttonDiv = useRef()
    const [addNewUser] = useSignUpUserMutation();




    async function handleCredentialResponse(response) {

        let  myJWT = jose.decodeJwt(response.credential)
        console.log(myJWT);

        let newUser = {
            name:myJWT.given_name ,
            country: myJWT.azp,
            photo: myJWT.picture,
            pass: myJWT.sub,
            role: "admin",
            email: myJWT.email,
            from: "google"
        };

        addNewUser(newUser)
        .then((res) => console.log(res))
        .catch((error) => {
         console.log(error)
         });



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
        <div>
            <div ref={buttonDiv}></div>
        </div>
    )
}

export default SignUpGoogle