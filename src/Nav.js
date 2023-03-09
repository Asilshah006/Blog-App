import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from './context/DataContext'

const Nav = () => {
  const {search , setSearch} = useContext(DataContext);
  return (
   <nav className='Nav'>
    <form action="search post" onSubmit={(e)=> e.preventDefault()}>
        <label htmlFor="search post">Search Posts</label>
        <input
            id='searchbox' 
            type="text" 
            placeholder='Search Posts'
            value={search}
            onChange ={(e)=> setSearch(e.target.value)}/>
    </form>

    <ul>
        <li><Link to='/'  className='link'>Home</Link></li>
        <li><Link to='/post' className='link' >Posts</Link></li>
        <li><Link to='/about' className='link' >About</Link></li>
    </ul>
   </nav>
  )
}

export default Nav