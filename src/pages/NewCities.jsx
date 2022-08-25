import React from 'react'
import NewCityForm from '../components/NewCityForm';
import Layout from '../layouts/Layout'
import "../styles/App.css";

function NewCities() {
  return (
    <>
    <Layout>
        <NewCityForm/>
    </Layout>
    </>
  )
}

export default NewCities