import React from 'react'
import { Link } from 'react-router-dom'
const Missing = () => {
  return (
    <main>
        <h2>Page Not Found</h2>
        <p>Well, that's disappointing </p>
        <p>
          <Link target={'/'} to ='/' >Return To Home</Link>
        </p>
    </main>
  )
}

export default Missing