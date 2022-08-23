const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    userName: String,
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      country: String,
      city: String,
      street: String,
      zipcode: String,
      suite: String,
    },
    phone: String,
    avatarUrl: String,
  },
  { versionKey: false }
);

module.exports = model('User', UserSchema);
