import React from 'react'
import Footer from '../components/Footer'

function Layout({children}) {
  return (

    <>
        {/* componente NavBar */}
        <main>
            {children}
        </main>
        <Footer/>
    </>
  )
}

export default Layout