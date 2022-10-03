import React from 'react'
import '../styles/App.css'
import Layout from '../layouts/Layout'
import CityCard from '../components/CityCard'

const Cities = () => {
  return (
    <>
        <Layout>
          <CityCard/>
        </Layout>
    </>
  )
}

export default Cities