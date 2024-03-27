const express = require('express');
const router = express.Router();
const cors = require('cors');
require('dotenv').config();
const { test,registerUser,loginUser,getProfile} = require('../controller/auth_controller');

// Middleware
router.use(cors({
  credentials: true,
  methods: ['GET', 'POST'],
  origin: process.env.FRONTEND_URL
}));

router.get('/', test);
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',getProfile);

module.exports = router;
