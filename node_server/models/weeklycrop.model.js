const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User schemwa
const weeklySchema = new Schema({
  cropName: {
    type: String,
    // trim: true,
    minlength: 1
  },
  username: {
    type: String,
  },
  heights: [{
    height: {
        type: String
    },
    weekNum: {
        type: String
    },
    points: {
        type: Number,
        default: 0
    },
    imagePath: {
        type: String,
    },
  }]
}, {
  timestamps: true
});



const Weekly = mongoose.model('Weekly', weeklySchema);

module.exports = Weekly;
