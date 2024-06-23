const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET); 
                const user = await User.findById(decoded?.id);
                if (!user) {
                    throw new Error("User not found"); // Ajoutez une vérification de l'utilisateur
                }
                req.user = user;
                next();
            }
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                throw new Error("Invalid token"); // Gestion spécifique des erreurs de JWT
            } else if (error.name === 'TokenExpiredError') {
                throw new Error("Token expired, please login again"); // Gestion de l'expiration du token
            } else {
                throw new Error("Authentication error"); // Gestion générale des autres erreurs
            }
        }
    } else {
        throw new Error("No token attached to header"); // Message si aucun token n'est attaché à l'en-tête
    }
});


const isAdmin = asyncHandler(async (req, res, next) => {
    const { email }= req.user;
        const adminUser = await User.findOne({ email });
        if (adminUser.role !== "admin") {
        throw new Error("You are not an admin");
        } else {
            next();
        }
       
});
module.exports = { authMiddleware, isAdmin};