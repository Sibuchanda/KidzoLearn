# User Controller Documentation

## signup(req, res)
Validates inputs using Zod and then Checks if the email is already registered or not then Hashes the password and Saves the user in the database. At last Returns success message and user data

- Parameters:
  - `req`: Express request object (expects `username`, `email`, `password`, `confirmpassword` in body)
  - `res`: Express response object

- Returns:
  - `201`: User registered successfully
  - `400`: If fields are missing, invalid, or user already exists


## login(req, res)
Validates input fields and Checks if user exists and password matches. Generates JWT token and stores it in a cookie and also in logged in user's database schema. And then Returns username and token.

- Parameters:
  - `req`: Express request object (expects `email`, `password` in body)
  = `res`: Express response object

- Returns:
  = `200`: Login successful
  - `400`: If credentials are invalid or fields are missing


## getProfile(req, res)
 Reads JWT token from cookies and Verifies the token. Fetches and returns user's email and username

- Parameters:
  - `req`: Express request object (reads `req.cookies.jwt`)
  = `res`: Express response object

- Returns:
  - `200`: Email and username
  - `401`: If token is missing or invalid
  - `404`: If user is not found

## logout(req, res)
Clears the cookie named `jwt`

- Parameters:
  - `req`: Express request object
  - `res`: Express response object

- Returns:
  - `200`: Message saying user logged out successfully
