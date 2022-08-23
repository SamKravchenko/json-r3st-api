const Post = require('../models/Post');
const Comment = require('../models/Comment');
const fieldsHelper = require('../helpers/fieldsHelper');
const sortHelper = require('../helpers/sortHelper');
const errorHandlers = require('../helpers/ErrorHandlers');

class PostController {
  async getAll(req, res, next) {
    try {
      const { sort = '1', limit, select, populate, ...otherFields } = req.query;
      const postFields = fieldsHelper(otherFields, {
        id: (_, value) => ['_id', value],
        _id: (key, value) => [key, value],
        userId: (key, value) => [key, value],
      });
      const correctedSort = sortHelper(sort);
      const posts = await Post.find(postFields)
        .select(select)
        .limit(+limit)
        .sort(select ? { [select]: correctedSort } : { _id: correctedSort })
        .populate(
          populate === 'true' ? { model: 'User', path: 'userId' } : undefined
        );
      return res.json({ success: true, posts });
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const { select, populate } = req.query;
      const post = await Post.findById(id)
        .select(select)
        .populate(
          populate === 'true' ? { model: 'User', path: 'userId' } : undefined
        );
      if (!post) {
        return errorHandlers.notFound(res, 'Post Not Found');
      }
      return res.json({ success: true, post });
    } catch (error) {
      next(error);
    }
  }
  async getPostComments(req, res, next) {
    try {
      const { id } = req.params;
      const { select, populate } = req.query;
      const comments = await Comment.find({ postId: id })
        .select(select)
        .populate(
          populate === 'true' ? { model: 'Post', path: 'postId' } : undefined
        );
      if (!comments.length) {
        return errorHandlers.notFound(res, 'Comments Not Found');
      }
      return res.json({ success: true, comments });
    } catch (error) {
      next(error);
    }
  }
  async insertMany(req, res, next) {
    try {
      const { userId, posts } = req.body;
      const postsWithUserId = posts.map((post) => ({ ...post, userId }));
      const postsResult = await Post.insertMany(postsWithUserId);
      return res.json({ success: true, posts: postsResult });
    } catch (error) {
      next(error);
    }
  }
  async updateMany(req, res, next) {
    try {
      const { search, update } = req.body;
      const updated = await Post.updateMany(search, update);
      return res.json({ success: true, modifiedCount: updated.modifiedCount });
    } catch (error) {
      next(error);
    }
  }
  async deleteMany(req, res, next) {
    try {
      const deleted = await Post.deleteMany({ ...req.body });
      return res.json({ success: true, deletedCount: deleted.deletedCount });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
