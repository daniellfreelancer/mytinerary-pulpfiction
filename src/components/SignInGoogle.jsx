import React, { useEffect, useRef } from 'react'
import * as jose from 'jose'

function SignInGoogle() {

    const buttonDiv = useRef()


    function handleCredentialResponse(response) {

        let responsePayload = jose.decodeJwt(response.credentials)
        console.log(response);
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
            { theme: "outline", size: "large" }  // customization attributes
        );


    }, [])

    
    return (
        <div>
            <div ref={buttonDiv}></div>
        </div>
    )
}

export default SignInGoogle