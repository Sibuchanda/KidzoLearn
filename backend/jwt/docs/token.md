# Token Generator Documentation

## generateToken(userId, res)
Generates a JWT token using the user's ID, stores it in an HTTP-only cookie, and also updates the token in the user's database record.

This function is used during login to create a secure token. It sets the token in the browser's cookie and also stores the token in the `token` field of the user in the database.

- Process 
  - Creates a JWT token signed with the secret key stored in `.env` file.
  - Sets the token expiry to **7 days**.
  - Stores the token as an **HTTP-only cookie** in the user's browser with the following options:
    - `httpOnly: true` → Cannot be accessed by client-side JavaScript (for security).
    - `secure: false` → Can work on non-HTTPS for development.
    - `sameSite: "lax"` → Allows the cookie to be sent with top-level navigations.
    - `path: "/"` → Cookie is valid across the whole app.
    - Updates the user's record in the database with the generated token.
    - Returns the token to be used as needed.


- Parameters:
  - `userId` (String): The unique ID of the logged-in user.
  - `res` (Object): Express response object (used to set the cookie).

- Returns:
  - `token` (String): The JWT token that was generated.


