import { Routes, Route } from 'react-router-dom'
import Register from '../pages/homepage/components/RegisterForm'
import SignIn from '../pages/homepage/SignIn'
import Dashboard from '../pages/dashboard/Dashboard'
import PrivateRoutes from './PrivateRoutes'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<Register />} />

            <Route path="/chat" element={<PrivateRoutes />}>
                <Route path="/chat" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<SignIn />} />
        </Routes>
    )
}
