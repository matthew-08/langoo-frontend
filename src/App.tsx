import './global.css';
import { useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useAppDispatch, useAppSelector } from './hooks';
import { checkForSession } from './features/authSlice';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.authReducer.loading);
  const isLoggedIn = useAppSelector((state) => state.authReducer.user.loggedIn);
  useEffect(() => {
    console.log('inital mount');
    dispatch(checkForSession());
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      console.log('check');
      navigate('/chat');
    }
  }, [isLoggedIn]);
  return (
    <div className="App">
      {isLoading ? <div>LOADING</div>
        : <AppRoutes />}
    </div>
  );
}

export default App;
