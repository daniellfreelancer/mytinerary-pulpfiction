import React from 'react'
import Footer from '../components/Footer'
import '../App.css'
import Header from '../components/Header'

function Layout({children}) {
  return (

    <>
        <Header />
        <main id='top' className='Cities-Layout'>
            {children}
        </main>
        <Footer/>
    </>
  )
}

export default Layout