const { Schema, model } = require('mongoose');

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  { versionKey: false }
);

module.exports = model('Comment', CommentSchema);
