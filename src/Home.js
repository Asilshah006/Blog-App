import React from 'react'
import Feed from './Feed'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const Home = () => {
  const {searchResults} = useContext(DataContext);
  return (
    <main>
        {searchResults.length ? (
            <Feed posts = {searchResults}/>
        ): <p style={{marginTop : "2rem" }}> No Blogs to display</p>
    }
  
    </main>
  )
}

export default Home