const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


//create a user using: POST "/api/auth/". Doesn't require auth
router.post('/', [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('password' , 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('email', 'Enter Valid Email ID').isEmail()
] , (req,res)=>{
    // console.log(req.body);
    // const user = User(req.body);
    // user.save()
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }).then(user => res.json(user)).catch(error => {console.log(error)
        res.json({error: 'Please enter a unique value for email', message: error.message})})
    // res.send(req.body);
})
module.exports = router