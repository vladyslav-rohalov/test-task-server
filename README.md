<h1>Tech task SERVER</h1>

<h2>Server</h2>
<p>https://teck-task-server.onrender.com/</p>

<h2>Swagger</h2>
<p>https://teck-task-server.onrender.com/docs/</p>

<p>To install locally</p>
<ul>
        <li>download the application using the command in your terminal:  gh repo clone vladyslav-rohalov/test-task-server</li>
        <li>install packages with the command: npm install</li>
        <li>create an .env file in the backend folder using the following example</li>
        <li>start the project in development mode: npm run dev</li>       
</ul>

<h3>Languages and Tools</h3>

<ul>
        <li>Nodejs - development environment</li>
        <li>Expressjs - for creating server</li>
        <li>MongoDB - database</li>
        <li>Mongoose - simplifies interactions with MongoDB</li>
        <li>Joi - validation</li>
        <li>bcrypt - hashing password</li>
        <li>jsonwebtoken - token</li>
</ul>

<h3>Description</h3>
<p>In writing the server I used the MVC model.</p>
 <ul>
        <li>For users I created a model that consists of schemas.</li>
        <li>For the processing of all methods for auth and users there are controllers.</li>
        <li>For the processing of requests created routes, also for auth and users.</li>
 </ul>
<p>Middlewares</p>
 <ul>
        <li>Authenticate - checks the user's bearer token, and set user data to request </li>
        <li>Validation body - checking for scheme consistency</li>
        <li>IsValidId - checking the validity of the id</li>
        <li>IsBoss - checking user role</li>
 </ul>
<p>Helpers</p>
 <ul>
        <li>Controller wrapper - reused for all controllers, wrapper controller into try & ctach.</li>
        <li>HTTP ERROR - used to handle client errors.</li>
        <li>handle mogoose error - specific error handling .</li>
 </ul>

