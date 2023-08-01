import React, { SetStateAction, useState,useEffect } from 'react'
import { Container, Button } from 'reactstrap'
import Image from 'next/image'
import useBoundStore from '@/zustand'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
const Header = ({ setIsopen }: { setIsopen: React.Dispatch<SetStateAction<boolean>> }) => {
  const [showSignOut,setShowSignOut] = useState(false)
  const isAuthenticated = useBoundStore(state => state.isAuthenticated)
  const signOutFromStore = useBoundStore(state => state.signOut)
  const signOutUser = () => {
    signOut(auth)
    signOutFromStore()
  }

  useEffect(() => {
    setShowSignOut(isAuthenticated)
  }, [isAuthenticated])
  

  return (
    <div style={{ borderBottom: "1px solid #F1E4FF" }} >
      <Container className=' py-3  ' >
        <div className="d-flex justify-content-between align-items-center ">
          <h3 className=' fw-bold mb-0' >Logo</h3>
          <div className="d-flex gap-4 align-items-center">
            <div className="d-flex align-items-center gap-3">

            </div>
            {!showSignOut ? <Button color='secondary' onClick={() => setIsopen(true)} >Sign in </Button> : <Button color='secondary' onClick={signOutUser} >Sign out </Button>}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Header