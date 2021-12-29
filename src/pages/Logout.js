import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import useAuth from '../contexts/Auth'
import { signOut } from 'firebase/auth'
import { authentication } from '../helpers/firebase'
import Loader from '../parts/Loader'
import '../assets/styles/login.css'

function Logout() {
    const history = useHistory()
    const { setCurrentUser } = useAuth()
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        
        signOut(authentication)
        setLoading(false)
        history.push('/')
        // document.title = 'Britam - With you every step of the way'
    })

    if (isLoading)
        return <Loader />

    return (
        <div className='logout'>
            <h1>
                You've logged out
            </h1>
            <Link to="/login">
                <button className='btn btn-primary cta'>Login</button>
            </Link>
        </div>
    )
}

export default Logout
