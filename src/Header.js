import React from 'react'
import {FaLaptop , FaMobileAlt , FaTabletAlt} from 'react-icons/fa'
import useWindowSize from './api/hooks/useWindowSize';

const Header = ({title}) => {
  const {width} = useWindowSize();
  return (
    <header className='header'>
        <h1>{title}</h1>
        {
        width < 768 ? <FaMobileAlt/> 
        : width < 992 ? <FaTabletAlt/> 
        : <FaLaptop/>
        
      }
    </header>
  )
}

export default Header