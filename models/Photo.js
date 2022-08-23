const { Schema, model } = require('mongoose');

const PhotoSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    alt: String,
    albumId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Album',
      },
    ],
  },
  { versionKey: false }
);

module.exports = model('Photo', PhotoSchema);
