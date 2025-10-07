import React from 'react'
import logo from '../assets/logo.png'

function Logo({width='100px'}) {
  return (
    <div><img width={width}src={logo}/></div>
  )
}

export default Logo