import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import queries from './queries.js'
import jwt from 'jsonwebtoken'
import jwtConfig from './jwtConfig'
import authenticate from './middlewares/authenticate'
// import passport-local from 'passport-local'

// var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var config = require('../config/config'),
    dbname = config.cloudant.dbname,
    dbname2 = config.cloudant.dbname2

require('../config/passport')(passport);

const app = express();
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

var Cloudant = require('cloudant')({account:config.cloudant.account, password:config.cloudant.password});
app.listen(8080, () => console.log('Server is running on localhost:8080'));

function validate(data) {
    let errors = {};
    if (data.username === '') errors.uname = "Username can't be empty!";
    if (data.password === '') errors.password = "Password can't be empty!";
    if (data.gender === '') errors.gender = "Gender can't be empty!";
    if (data.fname === '') errors.fname = "Gender can't be empty!";
    if (data.lname === '') errors.lname = "Gender can't be empty!";
    const isValid = Object.keys(errors).length === 0
    return { errors, isValid}
}

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/');
}

app.post('/api/login', (req, res) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err || !user) {
      res.status(500).json({ errors: { global: info.message }});
    } else {
      req.logIn(user, (err) => {
        if (err) {
          res.status(500).json(err);
        } else {
          const token = jwt.sign({
            user: user
          }, jwtConfig.jwtSecret,{expiresIn: '12h'})
          res.status(200).send({ loginEmp: user, token: token });
        }
      });
    }
  })(req, res);
})

app.get('/api/logout', (req, res) => {
    req.logout();
    res.status(200).send();
})

app.get('/api/emps', (req, res) => {
   	const db = Cloudant.db.use(dbname);
   	db.find({selector:{username:{ $gt : 0}}}, (err, emps) => {
   	  res.json({emps: emps.docs});
  })
})

app.post('/api/emps', (req, res) => {
  const { errors, isValid } = validate(req.body);
  if (isValid) {
    setTimeout( () => {
      passport.authenticate('local-signup', (err, user, info) => {
        if (err || !user) {
        res.status(500).json({ errors: { global: info.message }});
        } else {
          res.status(200).send({ emp: user });
        }
      })(req, res);
  }, 2000);
  } else {
    res.status(400).json({ errors });
  }
})

app.put('/api/emps/:id', authenticate, (req, res) => {
  const { errors, isValid } = validate(req.body);
  console.log(req.body)
  if (isValid) {
    const db = Cloudant.db.use(dbname);
    db.insert(req.body, (err, result) => {
      if (err) {
        res.status(500).json({ errors: { global: 'Something went wrong'}});
      } else {
        res.status(200).json({ emp: result})
      }
    })
  } else {
    res.status(400).json({ errors });
  }
})

app.get('/api/emps/:_id', (req, res) => {
  const db = Cloudant.db.use(dbname);
  db.get(req.params._id, (err, emp) => {
    if (err) {
        res.status(500).json({ errors: { global: 'Something went wrong'}});
      } else {
        res.json({ emp: emp})
      }
  })
})

app.delete('/api/emps/:_id', (req, res) => {
  const db = Cloudant.db.use(dbname);
  db.destroy(req.body.id, req.body.rev, (err, r) => {
    if (err) { res.status(500).json({ errors: { global: err}}); return; }
    res.json({});
  })
})

app.get('/api/attributes', (req,res) => {
  const db = Cloudant.db.use(dbname2);
  db.find(queries.desc_all, (err, attributes) => {
    res.json({attributes: attributes.docs[0].attributes});
  })
})

//ADD TO DATABASE
app.post('/api/attributes', (req, res) => {
  console.log("in adding")
  const { attribute, access_level } = req.body;
  const db = Cloudant.db.use(dbname2);
  db.insert({attribute, access_level}, (err, result) => {
   if (err) {
     res.status(500).json({ errors: { global: 'Something went wrong'}});
   } else {
    res.json({ attributes: result})
   }
 })
})

//UPDATING
app.put('/api/attributes', (req, res) => {
  const db = Cloudant.db.use(dbname2);
  db.insert(req.body, (err, result) => {
   if (err) {
     console.log(err)
     res.status(500).json({ errors: { global: 'Something went wrong'}});
   } else {
    res.json({ attributes: result})
   }
 })
})

app.use((req, res) => {
  res.status(404).json({
    errors: {
      global: 'still working on it. Please try again later.'
    }
  })
})
