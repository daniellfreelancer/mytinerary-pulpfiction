import React from 'react'
import '../App.css'
import RenderCarousel from '../components/RenderCarousel'
import Layout from '../layouts/Layout'

const Cities = () => {
  return (
    <>
        <Layout>
          <RenderCarousel/>
          <p>Cities and filters will be added later</p>
        </Layout>
    </>
  )
}

export default Cities