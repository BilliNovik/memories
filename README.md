# MERN Stack [Memories App](https://memories-xi.vercel.app/)

## Technologies

- [React](https://reactjs.org/docs/create-a-new-react-app.html) for the frontend
- [Redux-Toolkit](https://redux-toolkit.js.org/) for frontend application state
- [Material UI](https://material-ui.com/) for UI
- [MongoDB & Mongoose](https://mongoosejs.com/) for the database
- [Node & Express](http://expressjs.com/) for the backend
- [Google OAuth2](https://developers.google.com/identity/protocols/oauth2/web-server) for authentication

## Features

- [x] Google OAuth
- [x] Custom authentication and register
- [x] Ability to like each post
- [x] Search by posts
- [x] Adding photo realized by base64
- [x] Adding new memories
- [x] Commenting each post
- [ ] Pagination

## Deploying to your computer

First press **'Code'** button and choose **'Download ZIP'**, then unpacking zip to your any folder and open in Visual Studio Code or other program.
Your structure can be like...

```bash
. 
├── server
└── client
```

Open the terminal in two window and write in first window `cd server` and then `npm start` and other window `cd client` and then `npm start` 

Don't forget adding your .env params in folder...

```bash
. 
├── server
│   └── .env  
└── client
    └── .env  
```

Then you can use my program :)
