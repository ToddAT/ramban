import React from 'react'

const Header = (props) => {
  return (
    <h1 className={ props.className ? props.className : 'header' }>
      { props.value }
    </h1>
  )
}

export default Header