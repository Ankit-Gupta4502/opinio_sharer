import React, { useState } from 'react'
import Header from './Header'
import Auth from '../Auth/Auth'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsopen] = useState(false)
  return (
    <div >
      <Header setIsopen={setIsopen} />
      {children}
      <Auth isOpen={isOpen} setIsOpen={setIsopen} />
    </div>
  )
}

export default Layout