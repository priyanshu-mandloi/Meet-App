const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  meeting_id: {
    type: Number,
    required: true,
    unique: true
  },
  meeting_title: {
    type: String,
    required: true
  },
  meeting_uid: {
    type: String,
    required: true,
    unique: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Define auto-increment for meeting_id
meetingSchema.pre('save', function(next) {
  const self = this;
  if (!self.isNew) {
    next();
    return;
  }
  mongoose.model('Meeting', meetingSchema).countDocuments(function(err, count) {
    if (err) {
      next(err);
    } else {
      self.meeting_id = count + 1;
      next();
    }
  });
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
