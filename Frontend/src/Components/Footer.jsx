import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div><footer className="py-3 my-4">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
      <li className="nav-item"><Link to="/login" className="nav-link px-2 text-white">Login</Link></li>
    </ul>
    <p className="text-center text-white">© 2022 GoFood Inc</p>
  </footer></div>
  )
}

export default Footer