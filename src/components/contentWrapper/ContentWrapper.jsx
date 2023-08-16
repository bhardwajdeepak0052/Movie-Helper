import React from 'react'
import './style.scss'

// Or we may use props in place of children
function ContentWrapper({children}) {
  return (
    <div className='contentWrapper'>{children}</div>
  )
}

export default ContentWrapper