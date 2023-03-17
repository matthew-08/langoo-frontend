# Authentication

### Motivation / Goals:

Most of my projects that preceded this one utilized JWTs in order to manage authentication and persistant user sessions. For this project I wanted to explore the world of sessions.

## Client-side authentication:

Some basic form validation is done on the front-end for both the register and sign in forms. I used react-hook-form for managing form state and the yup libary for defining the schemas and relevant error messages.

As an example, here is the validation schema I used for the sign-in form:

```typescript
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(6, 'Username must be at least 6 characters long')
    .max(20, 'Username must not exceed 20 characters'),
  password: Yup.string().required('Password is required'),
});
```

This method of front-end validation prevents some invalid or unnecessary requests from being sent to the backend.

In order to prevent unauthorized users from accessing the dashboard (the core of the application), a ro

```typescript
export default function PrivateRoutes() {
  const isAuth = useAppSelector((state) => state.authReducer.user.loggedIn);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}
```

Authentication for this project is handled by session IDs stored in a Redis DB and implemented with express-session.

Upon load of the application, a GET request is sent to the backend. If an existing session is found for the client, their session is returned to the server and they are forwarded to the dashboard.

Frontend:

````typescript
    useEffect(() => {
        dispatch(checkForSession())
    }, [])```
````

Backend:

```javascript
router.route('/signIn').get(async (req, res) => {
    if(req.session.user && req.session.user.username) {
        req.session.save()
        return res.status(200)
        .json({
            loggedIn: true,
            ...req.session.user
        })
    } else {
        return res.status(404).end()
    }
```
