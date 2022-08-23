const Album = require('../models/Album');
const Photo = require('../models/Photo');
const fieldsHelper = require('../helpers/fieldsHelper');
const sortHelper = require('../helpers/sortHelper');
const errorHandlers = require('../helpers/ErrorHandlers');

class AlbumController {
  async getAll(req, res, next) {
    try {
      const {
        sort = '1',
        limit,
        select,
        populate = false,
        ...otherFields
      } = req.query;
      const albumFields = fieldsHelper(otherFields, {
        id: (_, value) => ['_id', value],
        _id: (key, value) => [key, value],
        userId: (key, value) => [key, value],
      });
      const correctedSort = sortHelper(sort);
      const albums = await Album.find(albumFields)
        .select(select)
        .limit(+limit)
        .sort(select ? { [select]: correctedSort } : { _id: correctedSort })
        .populate(
          populate === 'true' ? { model: 'User', path: 'userId' } : undefined
        );
      return res.json({ success: true, albums });
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const { select, populate } = req.query;
      const album = await Album.findById(id)
        .select(select)
        .populate(
          populate === 'true' ? { model: 'User', path: 'userId' } : undefined
        );
      if (!album) {
        return errorHandlers.notFound(res, 'Album Not Found');
      }
      return res.json({ success: true, album });
    } catch (error) {
      next(error);
    }
  }
  async getAlbumPhotos(req, res, next) {
    try {
      const { id } = req.params;
      const { select, populate } = req.query;
      const photos = await Photo.find({ albumId: id })
        .select(select)
        .populate(
          populate === 'true' ? { model: 'Album', path: 'albumId' } : undefined
        );
      if (!photos.length) {
        return errorHandlers.notFound(res, 'Photos Not Found');
      }
      return res.json({ success: true, photos });
    } catch (error) {
      next(error);
    }
  }
  async insertMany(req, res, next) {
    try {
      const { userId, albums } = req.body;
      const albumsWithUserId = albums.map((album) => ({ ...album, userId }));
      const albumsResult = await Album.insertMany(albumsWithUserId);
      return res.json({ success: true, albums: albumsResult });
    } catch (error) {
      next(error);
    }
  }
  async updateMany(req, res, next) {
    try {
      const { search, update } = req.body;
      const updated = await Album.updateMany(search, update);
      return res.json({ success: true, modifiedCount: updated.modifiedCount });
    } catch (error) {
      next(error);
    }
  }
  async deleteMany(req, res, next) {
    try {
      const deleted = await Album.deleteMany({ ...req.body });
      return res.json({ success: true, deletedCount: deleted.deletedCount });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AlbumController();
