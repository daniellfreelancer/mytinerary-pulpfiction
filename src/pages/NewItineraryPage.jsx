import React from 'react'
import NewItinerary from '../components/NewItinerary'
import Layout from '../layouts/Layout'
import UnderConstruction from './UnderConstruction'

function NewItineraryPage() {
  return (
    <Layout>
      <NewItinerary />
      <UnderConstruction/>
    </Layout>
  )
}

export default NewItineraryPage