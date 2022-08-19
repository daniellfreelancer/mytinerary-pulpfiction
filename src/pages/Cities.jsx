import React from 'react'
import Carousel from '../components/Carousel'
//import RenderCarousel from '../components/RenderCarousel'
import '../App.css'
import RenderCarousel from '../components/RenderCarousel'
import Layout from '../layouts/Layout'

const Cities = () => {
  return (
    <>
        <Layout>
          <RenderCarousel/>
        </Layout>
        


        {/* <RenderCarousel/> */}
    </>
  )
}

export default Cities