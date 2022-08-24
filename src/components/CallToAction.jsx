import React from 'react'
import {Link as LinkTo} from 'react-router-dom'

function CallToAction() {
  return (
    <LinkTo className='btn' to='/cities'>
      <img className='imgCallTo' src='https://raw.githubusercontent.com/daniellfreelancer/citiesCloudImg/main/callTo.png' alt="callTo"/>
    </LinkTo>
  )
}

export default CallToAction