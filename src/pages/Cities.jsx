import React from 'react'
import '../styles/App.css'
import Layout from '../layouts/Layout'
import CityCard from '../components/CityCard'
import SearchBar from '../components/SearchBar'

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