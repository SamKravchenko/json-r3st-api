const Photo = require('../models/Photo');
const fieldsHelper = require('../helpers/fieldsHelper');
const sortHelper = require('../helpers/sortHelper');
const errorHandlers = require('../helpers/ErrorHandlers');

class PhotoController {
  async getAll(req, res, next) {
    try {
      const {
        sort,
        limit,
        select,
        populate = false,
        ...otherFields
      } = req.query;
      const photoFields = fieldsHelper(otherFields, {
        id: (_, value) => ['_id', value],
        _id: (key, value) => [key, value],
        albumId: (key, value) => [key, value],
      });
      const correctedSort = sortHelper(sort);
      const photos = await Photo.find(photoFields)
        .select(select)
        .limit(+limit)
        .sort(select ? { [select]: correctedSort } : { _id: correctedSort })
        .populate(
          populate === 'true' ? { model: 'Album', path: 'albumId' } : undefined
        );
      return res.json({ success: true, photos });
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const { select, populate } = req.query;
      const photo = await Photo.findById(id)
        .select(select)
        .populate(
          populate === 'true' ? { model: 'Album', path: 'albumId' } : undefined
        );
      if (!photo) {
        return errorHandlers.notFound(res, 'Photo Not Found');
      }
      return res.json({ success: true, photo });
    } catch (error) {
      next(error);
    }
  }
  async insertMany(req, res, next) {
    try {
      const { albumId, photos } = req.body;
      const photosWithAlbumId = photos.map((photo) => ({ ...photo, albumId }));
      const photosResult = await Photo.insertMany(photosWithAlbumId);
      return res.json({ success: true, photos: photosResult });
    } catch (error) {
      next(error);
    }
  }
  async updateMany(req, res, next) {
    try {
      const { search, update } = req.body;
      const updated = await Photo.updateMany(search, update);
      return res.json({ success: true, modifiedCount: updated.modifiedCount });
    } catch (error) {
      next(error);
    }
  }
  async deleteMany(req, res, next) {
    try {
      const deleted = await Photo.deleteMany({ ...req.body });
      return res.json({ success: true, deletedCount: deleted.deletedCount });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PhotoController();
