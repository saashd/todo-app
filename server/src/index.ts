import {Router} from "express"
import {getTodos, addTodo, updateTodo, deleteTodo} from "./controllers/todos"
import {register, deleteUser, login, updateUser, getUser, updatePassword} from "./controllers/users";

const router: Router = Router();
const auth = require("./auth");

router.get("/todos", auth, getTodos);

router.post("/add-todo", auth, addTodo);

router.put("/edit-todo/:id", auth, updateTodo);

router.delete("/delete-todo/:id", auth, deleteTodo);

router.post("/login", login);

router.post("/register", register);

router.get("/user", auth, getUser);

router.put("/edit-user/:id", auth, updateUser);

router.put("/edit-password/:id", auth, updatePassword);

router.delete("/delete-user/:id", auth, deleteUser);

router.post('/logout', (req, res) => {
    res.cookie('token', '').send();
});


export default router;
