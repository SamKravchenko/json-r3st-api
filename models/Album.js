const { Schema, model } = require('mongoose');

const DEFAULT_ALBUM_TITLE = `album_${new Date().toJSON()}`;

const AlbumSchema = new Schema(
  {
    title: {
      type: String,
      default: DEFAULT_ALBUM_TITLE,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false }
);

module.exports = model('Album', AlbumSchema);
