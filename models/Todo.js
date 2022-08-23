const { Schema, model } = require('mongoose');

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false }
);

module.exports = model('Todo', TodoSchema);
