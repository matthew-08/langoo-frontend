import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../utils/hooks'

export default function PrivateRoutes() {
    const isAuth = useAppSelector((state) => state.authReducer.user.loggedIn)
    console.log(`${isAuth}in priv route`)
    return isAuth ? <Outlet /> : <Navigate to="/" />
}
