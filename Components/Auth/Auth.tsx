import React, { SetStateAction } from 'react'
import { Modal, ModalBody, ModalFooter, Button, ModalHeader } from "reactstrap"
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, } from 'firebase/auth'
import { db, auth } from '@/firebase'
import { addDoc, where, collection, query, getDocs } from "firebase/firestore"
import useBoundStore from '@/zustand'
import { toast } from "react-toastify"
import {shallow} from "zustand/shallow"
type ModalProps = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}
const Auth = ({ isOpen, setIsOpen }: ModalProps) => {
    const toggle = () => setIsOpen(prev => !prev)
    const singInIUser = useBoundStore(state => state.signIn,shallow)

    const socialSignIn = async (method: "google" | "facebook") => {
        const googleProvider = new GoogleAuthProvider();
        const facebookProvider = new FacebookAuthProvider()
        try {
            const res = await signInWithPopup(auth, method === "google" ? googleProvider : facebookProvider);
            const user = res.user;
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            singInIUser({ name: (user?.displayName || null), email: (user?.email || null), token: (await user?.getIdToken() || null) })
            setIsOpen(false)
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
                console.log(user);

            }
        } catch (err: any) {

            toast.error(err.message)
        }
    };



    return (
        <Modal isOpen={isOpen} toggle={toggle} centered >
            <ModalHeader toggle={toggle} >
                Sign In With Us
            </ModalHeader>
            <ModalFooter className='px-5' >
                <Button className='w-100 text-primary' color="secondary" onClick={() => socialSignIn("google")}>
                    sign in with google
                </Button>

                <Button className='w-100' color="primary" onClick={() => socialSignIn("facebook")}>
                    sign in with facebook
                </Button>

            </ModalFooter>
        </Modal>
    )
}

export default Auth