import {Request, Response, Router} from "express"
import {getTodos, addTodo, updateTodo, deleteTodo} from "./controllers/todos"
import {register, deleteUser, login, updateUser} from "./controllers/users";

const router: Router = Router();
const auth = require("./auth");

router.get("/todos", auth, getTodos);

router.post("/add-todo", auth, addTodo);

router.put("/edit-todo/:id", auth, updateTodo);

router.delete("/delete-todo/:id", auth, deleteTodo);

router.post("/login", login);

router.post("/register", register);

router.put("/edit-user/:id", auth, updateUser);

router.delete("/delete-user/:id", auth, deleteUser);


export default router;