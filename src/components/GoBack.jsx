import React from 'react'
import {Link as LinkTo} from 'react-router-dom'

function GoBack() {
  return (
    <LinkTo className='goback-btn navlink' to='/cities'>GoBack</LinkTo>
  )
}

export default GoBack