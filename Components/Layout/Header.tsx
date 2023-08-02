import React, { SetStateAction, useState,useEffect } from 'react'
import { Container, Button } from 'reactstrap'
import {FaUserCircle} from "react-icons/fa"
import useBoundStore from '@/zustand'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import Link from 'next/link'
const Header = ({ setIsopen }: { setIsopen: React.Dispatch<SetStateAction<boolean>> }) => {
  const [showSignOut,setShowSignOut] = useState(false)
  const {isAuthenticated,name} = useBoundStore(state => ({isAuthenticated:state.isAuthenticated,name:state.auth.name}))
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

          <Link href="/ " className=' fs-3 fw-bold mb-0' >Logo</Link>
          <div className="d-flex gap-4 align-items-center">
           {showSignOut&& <div className="d-flex align-items-center gap-3">
              <FaUserCircle size={28}  />
               <span>{name}</span>
            </div>}
            {!showSignOut ? <Button color='secondary' onClick={() => setIsopen(true)} >Sign in </Button> : <Button color='secondary' onClick={signOutUser} >Sign out </Button>}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Header