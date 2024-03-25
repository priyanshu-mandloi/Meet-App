// In routes/users.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get a specific user by ID
router.get('/:id', userController.getUserById);

// Route to create a new user
router.post('/', userController.createUser);

// Route to update an existing user by ID
router.put('/:id', userController.updateUser);

// Route to delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
