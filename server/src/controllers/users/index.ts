import {Response, Request} from "express"
import {IUser} from "../../types/user";
import User from "../../models/user";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const login = async (req: Request, res: Response): Promise<void> => {
    User.findOne({email: req.body.email})
        // if email exists
        .then((user) => {
            // compare the password entered and the hashed password found
            bcrypt.compare(req.body.password, user!.password)
                // if the passwords match
                .then((passwordCheck: string) => {
                    // check if password matches
                    if (!passwordCheck) {
                        return res.status(400).send({
                            message: "Passwords does not match"
                        });
                    }
                    //   create JWT token
                    const token = jwt.sign(
                        {
                            userId: user!._id,
                            userEmail: user!.email,
                        },
                        "RANDOM-TOKEN",
                        {expiresIn: "24h"}
                    );

                    //   return success response
                    res.status(200).send({
                        message: "Login Successful",
                        email: user!.email,
                        token,
                    });
                })
                // catch error if password does not match
                .catch((error: any) => {
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
};


const register = async (req: Request, res: Response): Promise<void> => {
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword: string) => {
            // create a new user instance and collect the data
            const user = new User({
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
        .catch((error: any) => {
            res.status(500).send({
                message: "Password was not hashed successfully",
                error,
            });
        });
};
const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser | null = await User.findById(req.authInfo);
        res.status(200).json({user});
    } catch (error) {
        res.status(400).json({message: error});
    }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: {id},
            body,
        } = req;
        const updateUser: IUser | null = await User.findByIdAndUpdate(
            {_id: id},
            body
        );
        const allUsers: IUser[] = await User.find();
        res.status(200).json({
            message: "User updated",
            user: updateUser,
            users: allUsers,
        })
    } catch (error) {
        res.status(500).send({
            message: "Error updating user",
            error,
        });
    }
};


const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedUser: IUser | null = await User.findByIdAndRemove(
            req.params.id
        );
        const allUsers: IUser[] = await User.find();
        res.status(200).json({
            message: "User deleted",
            user: deletedUser,
            users: allUsers,
        })
    } catch (error) {
        res.status(500).send({
            message: "Error deleting user",
            error,
        });
    }
};

export {login, register, updateUser, deleteUser, getUser}