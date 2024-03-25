// In meetings.js (inside the routes folder)

const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meeting_controller');

// Route to get all meetings
router.get('/', meetingController.getAllMeetings);

// Route to get a specific meeting by ID
router.get('/:id', meetingController.getMeetingById);

// Route to create a new meeting
router.post('/', meetingController.createMeeting);

// Route to update an existing meeting by ID
router.put('/:id', meetingController.updateMeeting);

// Route to delete a meeting by ID
router.delete('/:id', meetingController.deleteMeeting);

module.exports = router;
