import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../utils/hooks'

export default function PrivateRoutes() {
    const isAuth = useAppSelector((state) => state.authReducer.user.loggedIn)
    return isAuth ? <Outlet /> : <Navigate to="/" />
}
