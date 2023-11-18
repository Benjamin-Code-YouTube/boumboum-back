# Music Match API with AdonisJS

An innovative application that connects people based on their musical preferences, drawing inspiration from Tinder.

## User Flow

### User Registration/Login
- Users sign up or log in using their Spotify credentials.

### Profile Creation
- Users complete their profiles, including basic information (name, date of birth, brief description, gender preference, and profile picture).
- Users select and customize their top 4 favorite tracks from Spotify, retrieved using the Spotify API.

### Matchmaking
- Users are presented with potential matches based on their gender preference.

### Interaction
- Users see their matches.
- For mutual matches, they can view the email of the match.

## API Requirements

We seek a skilled Node.js developer to create this API using the AdonisJS framework. The chosen database engine can be PostgreSQL or MySQL based on your expertise and recommendation.

## Required Endpoints

1. **User Registration/Login**
   - Implement OAuth2 authentication with Spotify to allow users to register or log in.

2. **Logout Endpoint**
   - Provide a secure endpoint for users to log out of their accounts.

3. **Profile Management**
   - Create endpoints for users to complete their profiles, including basic information and their preferred Spotify tracks.

4. **Matching Endpoint**
   - Develop an endpoint to retrieve and match users based on their gender preference.

5. **Spotify Integration**
   - Implement an endpoint to search for songs using the Spotify API.

6. **Match History**
   - Develop an endpoint to list all matches, indicating whether the match is mutual. Include relevant user data for each match.

## Additional Spotify Data

Upon user registration, it's crucial to save the user's Spotify preferences for future use, including:
- User's top 20 artists
- User's top 20 tracks
- Artists the user follows

## Technical Details

- **Framework:** AdonisJS
- **Database:** MySQL
- **Authentication:** OAuth2 with Spotify

## Getting Started

1. **Install Dependencies**
    ```bash
    npm install
    ```

2. **Configure Database Connection**
    - Set up the database connection details in your `.env` file.

3. **Configure Spotify API**
    - Add your Spotify client_id and client_secret in your `.env` file.

4. **Run Migrations and Seed Data**
    ```bash
    node ace migration:run
    node ace db:seed
    ```

5. **Start the Application**
    ```bash
    npm run dev
    ```

6. **Access the API at**
   - [http://localhost:3333/api](http://localhost:3333/api)

## API Documentation

- For the Login API (http://localhost:3333/api/signin), open it in a browser as the request will be redirected to Spotify for authentication. This API won't work in Postman.
- All other APIs are provided in the Postman collection.
