import {Request, Response, NextFunction} from 'express';

const jwt = require("jsonwebtoken");

module.exports = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = request.header('Authorization')?.replace('Bearer ', '');
        const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
        const user = await decodedToken;
        console.log(user)
        // pass the user down to the endpoints here
        request.user = user;
        // pass down functionality to the endpoint
        next();

    } catch (error) {
        response.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};
