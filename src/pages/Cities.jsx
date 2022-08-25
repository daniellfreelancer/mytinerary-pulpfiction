import React from 'react'
import '../styles/App.css'
import Layout from '../layouts/Layout'
import CityCard from '../components/CityCard'
import SearchBar from '../components/SearchBar'

const Cities = () => {
  return (
    <>
        <Layout>
          <div className='upperbox'>
            <SearchBar/>
          </div>
          <CityCard/>
        </Layout>
    </>
  )
}

export default Cities