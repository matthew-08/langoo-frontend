Authentication for this project is handled by session IDs stored in a Redis cache and implemented with express-session.

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

Sessions are persisted
