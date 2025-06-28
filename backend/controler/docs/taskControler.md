# Task Controller Documentation

## completeTask(req, res)
Handles task completion and awards +1 point to the user only if it's completed for the first time. Updates the `activityProgress` map and increases `points` in the user schema.

- Parameters:
  - `req`: Express request object (expects `activityName`, `taskKey` in body)
  - `res`: Express response object

- Process:
  - Checks if required fields are present
  - Gets user from the request (injected by middleware)
  - Checks if the task was already completed
  - If not completed before:
    - Adds taskKey under the respective activity
    - Increases the user's points by 1
    - Saves updated data

- Returns:
  - `200`: If task already completed or +1 point awarded
  - `400`: If fields are missing
  - `500`: Internal server error


## getUserProgress(req, res)
Fetches and returns the logged-in user's progress including username, total points, and activity progress.

- Parameters:
  - `req`: Express request object (expects `req.user` to be available from middleware)
  - `res`: Express response object

- Returns:
  - `200`: User progress with `username`, `points`, `activityProgress`
  - `404`: If user not found
  - `500`: If an error occurs during fetch
