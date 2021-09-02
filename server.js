const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bugService = require('./services/bug.service');
const userService = require('./services/user.service');

// Create and Configure the Express App
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(
  session({
    secret: '343ji43j4n3jn4jk3n',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// LIST
app.get('/api/bug', (req, res) => {
  bugService.query().then((bugs) => {
    res.send(bugs);
  });
});

// CREATE
app.post('/api/bug', (req, res) => {
  const { loggedinUser } = req.session;
  console.log(loggedinUser);
  if (!loggedinUser) return res.status(403).send('Login first');
  const bug = {
    _id: Math.floor(Math.random() * 1000).toString(),
    title: req.body.title,
    description: req.body.description,
    severity: req.body.severity,
    createdAt: Date.now(),
    creator: req.session.loggedinUser,
  };
  bugService.save(bug, loggedinUser).then((savedBug) => {
    res.send(savedBug);
  });
});

// UPDATE
app.put('/api/bug', (req, res) => {
  const { loggedinUser } = req.session;
  if (!loggedinUser) return res.status(403).send('Login first');
  const bug = {
    _id: req.body._id,
    title: req.body.title,
    description: req.body.description,
    severity: req.body.severity,
    createdAt: Date.now(),
    creator: loggedinUser,
  };
  bugService.save(bug, loggedinUser).then((savedBug) => {
    res.send(savedBug);
  });
});

// READ
app.get('/api/bug/:bugId', (req, res) => {
  const { bugId } = req.params;
  bugService.getById(bugId).then((bug) => {
    res.send(bug);
  });
});

// DELETE
app.delete('/api/bug/:bugId', (req, res) => {
  const { bugId } = req.params;
  console.log('* | app.delete | bugId', bugId);
  const { loggedinUser } = req.session;
  console.log('* | app.delete | loggedinUser', loggedinUser._id);

  bugService
    .remove(bugId, loggedinUser)
    .then(() => {
      res.send('Deleted');
    })
    .catch((err) => {
      res.status(403).send('Cannot remove Bug');
    });
});

app.post('/api/login', (req, res) => {
  const credentials = req.body;
  userService.checkLogin(credentials).then((user) => {
    if (user) {
      req.session.loggedinAt = Date.now();
      req.session.loggedinUser = user;
      res.send(user);
    } else {
      res.status(401).send('Invalid username/password');
    }
  });
});

app.post('/api/signup', (req, res) => {
  const credentials = req.body;

  userService.save(credentials).then((user) => {
    if (user) {
      req.session.loggedinAt = Date.now();
      req.session.loggedinUser = user;
      res.send(user);
    }
  });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.send();
});

app.get('/api/user/:userId', (req, res) => {
  const { userId } = req.params;
  userService.getById(userId).then((user) => {
    res.send(user);
  });
});

app.get('/nono', (req, res) => res.redirect('/'));

app.listen(2556, () =>
  console.log('Server listening on port 2556!')
);
