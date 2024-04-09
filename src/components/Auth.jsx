import React from 'react'
import { auth, provider } from "../config/firebase"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate, Navigate } from 'react-router-dom'
import { useGetUserInfo } from '../hooks/useGetUserInfo'

function Auth() {

    let navigate = useNavigate()
    const { isAuth } = useGetUserInfo()

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider)

        const authInfo = {
            userID: results.user.uid,
            userName: results.user.displayName,
            userPhoto: results.user.photoURL,
            isAuth: true
        }

        localStorage.setItem('auth', JSON.stringify(authInfo))
        navigate("/expanse-tracker")
    }

    if (isAuth) {
        return <Navigate to="/expanse-tracker" />
    }


    return (
        <div className='login-page'>
            <p>Signin with google to continue</p>
            <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign In With Google </button>
        </div>
    )
}

export default Auth
