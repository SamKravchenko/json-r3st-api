const Todo = require('../models/Todo');
const fieldsHelper = require('../helpers/fieldsHelper');
const sortHelper = require('../helpers/sortHelper');
const errorHandlers = require('../helpers/ErrorHandlers');

class TodoController {
  async getAll(req, res, next) {
    try {
      const {
        sort = '1',
        limit,
        select,
        populate = false,
        ...otherFields
      } = req.query;
      const todoFields = fieldsHelper(otherFields, {
        id: (_, value) => ['_id', value],
        _id: (key, value) => [key, value],
        userId: (key, value) => [key, value],
      });
      const correctedSort = sortHelper(sort);
      const todos = await Todo.find(todoFields)
        .select(select)
        .limit(+limit)
        .sort(select ? { [select]: correctedSort } : { _id: correctedSort })
        .populate(
          populate === 'true' ? { model: 'User', path: 'userId' } : undefined
        );
      return res.json({ success: true, todos });
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const { select, populate } = req.query;
      const todo = await Todo.findById(id)
        .select(select)
        .populate(
          populate === 'true' ? { model: 'User', path: 'userId' } : undefined
        );
      if (!todo) {
        return errorHandlers.notFound(res, 'Todo Not Found');
      }
      return res.json({ success: true, todo });
    } catch (error) {
      next(error);
    }
  }
  async insertMany(req, res, next) {
    try {
      const { userId, todos } = req.body;
      const todosWithUserId = todos.map((todo) => ({ ...todo, userId }));
      const todosResult = await Todo.insertMany(todosWithUserId);
      return res.json({ success: true, todos: todosResult });
    } catch (error) {
      next(error);
    }
  }
  async updateMany(req, res, next) {
    try {
      const { search, update } = req.body;
      const updated = await Todo.updateMany(search, update);
      return res.json({ success: true, modifiedCount: updated.modifiedCount });
    } catch (error) {
      next(error);
    }
  }
  async deleteMany(req, res, next) {
    try {
      const deleted = await Todo.deleteMany({ ...req.body });
      return res.json({ success: true, deletedCount: deleted.deletedCount });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TodoController();
