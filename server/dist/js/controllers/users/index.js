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
exports.updatePassword = exports.getUser = exports.deleteUser = exports.updateUser = exports.register = exports.login = void 0;
const user_1 = __importDefault(require("../../models/user"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.findOne({ email: req.body.email })
        // if email exists
        .then((user) => {
        // compare the password entered and the hashed password found
        bcrypt.compare(req.body.password, user.password)
            // if the passwords match
            .then((passwordCheck) => {
            // check if password matches
            if (!passwordCheck) {
                return res.status(400).send({
                    message: "Passwords does not match"
                });
            }
            //   create JWT token
            const token = jwt.sign({
                userId: user.id,
                userEmail: user.email,
            }, "RANDOM-TOKEN", { expiresIn: "24h" });
            //   return success response
            res.status(200).send({
                message: "Login Successful",
                email: user.email,
                token,
            });
        })
            // catch error if password does not match
            .catch((error) => {
            res.status(400).send({
                message: "Passwords does not match",
                error,
            });
        });
    })
        // catch error if email does not exist
        .catch((e) => {
        res.status(404).send({
            message: "Email not found",
            e,
        });
    });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
        // create a new user instance and collect the data
        const user = new user_1.default({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashedPassword,
        });
        // save the new user
        user
            .save()
            // return success if the new user is added to the database successfully
            .then((result) => {
            res.status(201).send({
                message: "User Created Successfully",
                result,
            });
        })
            // catch error if the new user wasn't added successfully to the database
            .catch((error) => {
            res.status(500).send({
                message: "Error creating user",
                error,
            });
        });
    })
        // catch error if the password hash isn't successful
        .catch((error) => {
        res.status(500).send({
            message: "Password was not hashed successfully",
            error,
        });
    });
});
exports.register = register;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.authInfo);
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateUser = yield user_1.default.findByIdAndUpdate({ _id: id }, body);
        res.status(200).json({
            message: "User updated",
            user: updateUser,
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Error updating user",
            error,
        });
    }
});
exports.updateUser = updateUser;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
        const updateUser = yield user_1.default.findByIdAndUpdate({ _id: req.body.id }, { password: hashedPassword });
        res.status(200).json({
            message: "Password updated",
            user: updateUser,
        });
    }))
        // catch error if the password hash isn't successful
        .catch((error) => {
        res.status(500).send({
            message: "Password was not hashed successfully",
            error,
        });
    });
});
exports.updatePassword = updatePassword;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_1.default.findByIdAndRemove(req.params.id);
        res.status(200).json({
            message: "User deleted",
            user: deletedUser,
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Error deleting user",
            error,
        });
    }
});
exports.deleteUser = deleteUser;
