//Require express
const express = require('express');
// Getting the data from the data.json
const data = require('./data/data.json');
const projects = data.projects;

// Tells the app to use express
const app = express();

// Sets the view engine to use pug files
app.set('view engine', 'pug');

// Static method to use the files in public folder
app.use('/static', express.static('public'))

// Home page is being requested 
app.get('/', (req, res) => {
  const ProjectData = { projects }
  res.render('index', ProjectData);
});

// Project pages get request. 
app.get('/project/:id', (req, res, next) => {
  const { id } = req.params;

  // If the id sent to the route is greater than the number of projects, or if the id is not a number, call next.
  if (id > projects.length || isNaN(id)) {
    return next();
  }

  // Sets all the data to variables
  const project = projects[id];
  const projectTitle = project.project_Title;
  const description = project.description;
  const technologies = project.technologies;
  const liveLink = project.live_link;
  const githubLink = project.github_Link;
  const imageLinks = project.image_Links;

  // Object that holds all the data
  const ProjectData = {
    projectTitle,
    description,
    technologies,
    liveLink,
    githubLink,
    imageLinks
  }

  // Renders the project page with the data
  res.render('project', ProjectData);

});

// About page get request
app.get('/about', (req, res) => {
  res.render('about');
});

// Creates a new 404 status error
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Renders the error page with the error information
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error')
})

// Assigning Port to 3000
let port = process.env.PORT || 3000;

// Listens for connections to the specified port and runs the app with a message of what port the app is running on
app.listen(port, () => {
  console.log(`The application is running on localhost:3000!${port}`);
});