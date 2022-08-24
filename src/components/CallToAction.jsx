import React from 'react'
import {Link as LinkTo} from 'react-router-dom'

function CallToAction() {
  return (
    <LinkTo className='btn' to='/cities'>Enter</LinkTo>
  )
}

export default CallToAction