# Home Library Service

### Downloading

```
git clone https://github.com/taleatg/nodejs2022Q2-service.git
```

### Installing NPM modules

```
npm install
```

### Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Testing

After application running open new terminal and to run all tests without authorization:

```
npm run test
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

---

### Endpoints

<details> 
  <summary>Users</summary>
    
- `/user`

    * `GET /user` - get all users
    * `GET /user/:id` - get single user by id
    * `POST /user` - create user
    * `PUT /user/:id` - update user's password
    * `DELETE /user/:id` - delete user
    
</details>

<details> 
  <summary>Artists</summary>
    
- `/artist`

    * `GET /artist` - get all artists
    * `GET /artist/:id` - get single artist by id
    * `POST /artist` - create new artist
    * `PUT /artist/:id` - update artist info
    * `DELETE /artist/:id` - delete artist

</details>

<details> 
  <summary>Albums</summary>

- `/album`

    * `GET /album` - get all albums
    * `GET /album/:id` - get single album by id
    * `POST /album` - create new album
    * `PUT /album/:id` - update album info
    * `DELETE /album/:id` - delete album
    
</details>

<details> 
  <summary>Tracks</summary>
    
- `/track`

    * `GET /track` - get all tracks
    * `GET /track/:id` - get single track by id
    * `POST /track` - create new track
    * `PUT /track/:id` - update track info
    * `DELETE /track/:id` - delete track

</details>

<details> 
  <summary>Favorites</summary>
    
- `/favs`

    * `GET /favs` - get all favorites
    * `POST /favs/track/:id` - add track to the favorites
    * `DELETE /favs/track/:id` - delete track from favorites
    * `POST /favs/album/:id` - add album to the favorites
    * `DELETE /favs/album/:id` - delete album from favorites
    * `POST /favs/artist/:id` - add artist to the favorites
    * `DELETE /favs/artist/:id` - delete artist from favorites

</details>
