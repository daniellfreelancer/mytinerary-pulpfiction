import React from 'react'
import SignUpGoogle from '../components/SignUpGoogle'
import SignInGoogle from '../components/SignInGoogle'
import Layout from '../layouts/Layout'

function Registration() {
  return (
    <Layout>
        <SignInGoogle/>
        <SignUpGoogle/>
    </Layout>
  )
}

export default Registration