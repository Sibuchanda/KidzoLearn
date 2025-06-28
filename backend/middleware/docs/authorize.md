# Authentication Middleware Documentation

## authenticate(req, res, next)

Middleware to verify the JWT token stored in cookies. It checks if the token is valid, finds the user from the database, and attaches the user object to the `req` object.

If valid → attaches user data to `req.user` and continues to next middleware. If invalid or missing → returns an unauthorized error.


- Parameters:
  - `req` (Object): Express request object (reads `req.cookies.jwt`).
  - `res` (Object): Express response object (used to return error if unauthorized).
  - `next` (Function): Express `next()` function to move to the next middleware or route.

- Returns:
  - `401 Unauthorized`: If token is missing or invalid.
  - `404 Not Found`: If user from token is not found in the database.
  - Proceeds to next route if user is authenticated successfully.

