const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false }
);

module.exports = model('Post', PostSchema);
