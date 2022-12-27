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
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.today === "true") {
            const d = new Date();
            const day = weekday[d.getDay()];
            const todos = yield todo_1.default.where({ uid: req.authInfo, day: day }).find();
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
            day: body.day,
            uid: req.authInfo
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
