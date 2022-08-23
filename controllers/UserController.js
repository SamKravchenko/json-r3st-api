const User = require('../models/User');
const Post = require('../models/Post');
const Todo = require('../models/Todo');
const Album = require('../models/Album');
const fieldsHelper = require('../helpers/fieldsHelper');
const sortHelper = require('../helpers/sortHelper');
const errorHandlers = require('../helpers/ErrorHandlers');

class UserController {
  async getAll(req, res, next) {
    try {
      const { sort, limit, select, ...otherFields } = req.query;
      const userFields = fieldsHelper(otherFields, {
        country: (key) => [`address.${key}`],
        city: (key) => [`address.${key}`],
        suite: (key) => [`address.${key}`],
        zipcode: (key) => [`address.${key}`],
        street: (key) => [`address.${key}`],
        id: (_, value) => ['_id', value],
        _id: (key, value) => [key, value],
      });
      const correctedSort = sortHelper(sort);
      const users = await User.find(userFields)
        .select(select)
        .limit(+limit)
        .sort(select ? { [select]: correctedSort } : { _id: correctedSort });
      return res.json({ success: true, users });
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const { select } = req.query;
      const user = await User.findById(id).select(select);
      if (!user) {
        return errorHandlers.notFound(res, 'User Not Found');
      }
      return res.json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }
  async getUserPosts(req, res, next) {
    try {
      const { id } = req.params;
      const { select, populate } = req.query;
      const posts = await Post.find({ userId: id })
        .select(select)
        .populate(
          populate === 'true' ? { model: 'User', path: 'userId' } : undefined
        );
      if (!posts.length) {
        return errorHandlers.notFound(res, 'Posts Not Found');
      }
      return res.json({ success: true, posts });
    } catch (error) {
      next(error);
    }
  }
  async getUserTodos(req, res, next) {
    try {
      const { id } = req.params;
      const { select, populate } = req.query;
      const todos = await Todo.find({ userId: id })
        .select(select)
        .populate(
          populate === 'true' ? { model: 'User', path: 'userId' } : undefined
        );
      if (!todos.length) {
        return errorHandlers.notFound(res, 'Todos Not Found');
      }
      return res.json({ success: true, todos });
    } catch (error) {
      next(error);
    }
  }
  async getUserAlbums(req, res, next) {
    try {
      const { id } = req.params;
      const { select, populate } = req.query;
      const albums = await Album.find({ userId: id })
        .select(select)
        .populate(
          populate === 'true' ? { model: 'User', path: 'userId' } : undefined
        );
      if (!albums.length) {
        return errorHandlers.notFound(res, 'Albums Not Found');
      }
      return res.json({ success: true, albums });
    } catch (error) {
      next(error);
    }
  }
  async insertMany(req, res, next) {
    try {
      const users = await User.insertMany([...req.body]);
      return res.json({ success: true, users });
    } catch (error) {
      next(error);
    }
  }
  async updateMany(req, res, next) {
    try {
      const { search, update } = req.body;
      const updated = await User.updateMany(search, update);
      return res.json({ success: true, modifiedCount: updated.modifiedCount });
    } catch (error) {
      next(error);
    }
  }
  async deleteMany(req, res, next) {
    try {
      const deleted = await User.deleteMany({ ...req.body });
      return res.json({ success: true, deletedCount: deleted.deletedCount });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
