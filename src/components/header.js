import React from 'react'
import "../css/Header.css"
import { Link } from "react-router-dom"


export default function Header() {


  return (
    <Link to={`/`}>
    <div className="header">

    <img src="https://arutesolutions.com/wp-content/uploads/2022/07/arute-solutions-logo-retina.png" alt="Arute Solutions Logo"/>
        
    </div>
    </Link>
  )
}
