So first of all we have installed we installation like express mongoose bcrypts jsonwebtoken and other dependencies and then initialized all the files under backend\src

Backend
Environment Setup:

Created a .env file with MongoDB URI and server port.
Database Connection:

Implemented a database connection function in src/lib/db.js using Mongoose.
User Model:

Defined a user schema and model in src/models/user.model.js with fields for email, full name, password, and profile picture.
Authentication Controllers:

Created basic authentication controllers for signup, login, and logout in src/controllers/auth.controoler.js.
Authentication Routes:

Set up authentication routes in src/routes/auth.route.js to handle signup, login, and logout requests.
Server Setup:

Configured the Express server in src/index.js to use the authentication routes and connect to the database.
