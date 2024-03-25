// In controllers/meeting_controller.js

const Meeting = require('../models/meeting');

// Controller function to get all meetings
exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get a specific meeting by ID
exports.getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to create a new meeting
exports.createMeeting = async (req, res) => {
  try {
    const newMeeting = new Meeting(req.body);
    const savedMeeting = await newMeeting.save();
    res.status(201).json(savedMeeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to update an existing meeting by ID
exports.updateMeeting = async (req, res) => {
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMeeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }
    res.json(updatedMeeting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to delete a meeting by ID
exports.deleteMeeting = async (req, res) => {
  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!deletedMeeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }
    res.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
