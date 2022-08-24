import React from 'react'

function ActualDate() {
    let today = new Date()
    let year = today.getFullYear()
  return (
    <p>{year} © All Rights Reserved</p>
  )
}

export default ActualDate