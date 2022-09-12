import React from 'react'
import SignUpForm from '../components/SignUpForm'
import Layout from '../layouts/Layout'

function SignUpPage() {
  return (
    <Layout>
      <div className='Mytineraries-div-title'>
        <h2>Sign Up</h2>
      </div>
      <SignUpForm />
    </Layout>
  )
}

export default SignUpPage