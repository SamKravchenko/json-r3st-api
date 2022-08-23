const Comment = require('../models/Comment');
const fieldsHelper = require('../helpers/fieldsHelper');
const sortHelper = require('../helpers/sortHelper');
const errorHandlers = require('../helpers/ErrorHandlers');

class CommentController {
  async getAll(req, res, next) {
    try {
      const {
        sort = '1',
        limit,
        select,
        populate = false,
        ...otherFields
      } = req.query;
      const commentFields = fieldsHelper(otherFields, {
        id: (_, value) => ['_id', value],
        _id: (key, value) => [key, value],
        postId: (key, value) => [key, value],
      });
      const correctedSort = sortHelper(sort);
      const comments = await Comment.find(commentFields)
        .select(select)
        .limit(+limit)
        .sort(select ? { [select]: correctedSort } : { _id: correctedSort })
        .populate(
          populate === 'true' ? { model: 'Post', path: 'postId' } : undefined
        );
      return res.json({ success: true, comments });
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const { select, populate } = req.query;
      const comment = await Comment.findById(id)
        .select(select)
        .populate(
          populate === 'true' ? { model: 'Post', path: 'postId' } : undefined
        );
      if (!comment) {
        return errorHandlers.notFound(res, 'Comment Not Found');
      }
      return res.json({ success: true, comment });
    } catch (error) {
      next(error);
    }
  }
  async insertMany(req, res, next) {
    try {
      const { postId, comments } = req.body;
      const commentsWithPostId = comments.map((comment) => ({
        ...comment,
        postId,
      }));
      const commentsResult = await Comment.insertMany(commentsWithPostId);
      return res.json({ success: true, comments: commentsResult });
    } catch (error) {
      next(error);
    }
  }
  async updateMany(req, res, next) {
    try {
      const { search, update } = req.body;
      const updated = await Comment.updateMany(search, update);
      return res.json({ success: true, modifiedCount: updated.modifiedCount });
    } catch (error) {
      next(error);
    }
  }
  async deleteMany(req, res, next) {
    try {
      const deleted = await Comment.deleteMany({ ...req.body });
      return res.json({ success: true, deletedCount: deleted.deletedCount });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
