"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.today === "true") {
            let now = new Date();
            let start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, 0, 0);
            let end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 59, 59);
            let query = { createdAt: { $gte: start, $lt: end } };
            const todos = yield todo_1.default.where({ uid: req.authInfo, }).find(query);
            res.status(200).json({ todos });
        }
        else {
            const todos = yield todo_1.default.where({ uid: req.authInfo }).find();
            res.status(200).json({ todos });
        }
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const todo = new todo_1.default({
            name: body.name,
            description: body.description,
            status: body.status,
            uid: req.authInfo,
        });
        const newTodo = yield todo.save();
        res.status(201)
            .json({ message: "Todo added", todo: newTodo });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateTodo = yield todo_1.default.findByIdAndUpdate({ _id: id }, body);
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo
        });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield todo_1.default.findByIdAndRemove(req.params.id);
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo
        });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.deleteTodo = deleteTodo;
