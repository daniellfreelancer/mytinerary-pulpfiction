import React from 'react'
import Layout from '../layouts/Layout'
import {Link as LinkRouter} from 'react-router-dom'

function VerifiedPage() {
  return (
    <Layout>
        <div className='form-new-users'>
            <h3 className='welcome-title'>Congratulations on verifying your account!</h3>
            <img className='welcome-img' src="https://c.tenor.com/Hu60muQsGeEAAAAC/congratulations-celebrate.gif" alt="verify_url_photo" />
            <div className='buttons-welcome'>
            <LinkRouter to='/signin' className='Comment-button'>Log In!</LinkRouter>
            <LinkRouter to='/' className='Comment-button'>Go Home!</LinkRouter>
            </div>
        </div>
    </Layout>
  )
}

export default VerifiedPage