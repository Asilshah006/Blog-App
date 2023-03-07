import React from 'react'
import { Link } from 'react-router-dom'
const Nav = ({search , setSearch}) => {
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