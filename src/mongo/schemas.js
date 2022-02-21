
const MONGOOSE = require('mongoose');
const Schema = MONGOOSE.Schema;

let docSchema = new Schema({
  _id: false,
  mediaUrl: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    required: true
  },
});

module.exports = {
  docSchema
};
