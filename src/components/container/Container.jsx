import React, { Children } from 'react'

function Container({Children}) {
  return <div className='w-full max-w-7xl mx-auto'>{Children}</div>;
}

export default Container