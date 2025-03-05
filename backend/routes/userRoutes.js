const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Public routes for registration and login
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

// Other routes (for example, to fetch, update, or delete users)
router.get('/', userController.getUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
