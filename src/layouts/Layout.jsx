import React from 'react'
import Footer from '../components/Footer'
import '../App.css'

function Layout({children}) {
  return (

    <>
        {/* componente NavBar */}
        <main id='top' className='Cities-Layout'>
            {children}
        </main>
        <Footer/>
    </>
  )
}

export default Layout