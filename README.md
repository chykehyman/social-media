# Socialize

Social-Media is an Apollo Graphql enabled application where posts can be created, viewed, deleted, liked and commented on.

### Features

- View all posts
- View details of a single post
- Login and register
- Create new post
- Like post (only authenticated users)
- Delete post (only authenticated users and user who created the post)
- Create comment for a post (only authenticated users)
- Delete comment (only authenticated users and user who created the comment)

### Technologies Used

- NodeJs and ExpressJs
- MongoDb
- Apollo Graphql(Both server and client)
- ReactJs
- Semantic UI React

### Run the app

- Clone the repository on github
- cd into the server and client directories on separate terminals and run `npm install` on server dir and `yarn install` on client dir, to install all project dependencies.
- Create a `.env` file on the server dir and populate according to what is on the `.env.sample` file
- Run `npm run serve` on the server dir to start the server
- Run `yarn start` on the client dir to start the client
- Open `http://localhost:3000` on your browser to launch the application

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
