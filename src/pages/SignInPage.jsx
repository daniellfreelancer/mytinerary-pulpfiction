import React from 'react'
import SignInForm from '../components/SignInForm'
import Layout from '../layouts/Layout'

function SignInPage() {
  return (
    <Layout>
      {/* <div className='Mytineraries-div-title'>
        <h2>Sign In</h2>
      </div> */}
      <SignInForm />
    </Layout>
  )
}

export default SignInPage