const User = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

//User registration
router.post("/register", async (req, res) => {
    try {
        //Checking if there is any user with the same email than the one that is trying to register
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.send({ message: "User already exists", success: false });
        }

        //Encrypting password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        //Giving the encrypted password to the password from the req.body
        req.body.password = hashedPassword;
        //Creating the new user
        const NewUser = await new User(req.body);
        //Saving the document in the database
        await NewUser.save();

        //Sending response to frontend
        return res.send({
            message: "User created successfully",
            success: true,
        });
    } catch (error) {
        res.send({ message: error.message, success: false });
    }
});

router.post("/login", async (req, res) => {
    try {
        //Checking if there is such user in the database
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                message: "The user does not exist",
                success: false,
            });
        }

        //Checking the passwords
        //Here, the bycrypt.compare() is comparing the uncrypted password in the req.body with the encrypted password saved in the database, it seems it is not neccessary to uncrypt it in order to check if the password is correct
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.send({ message: "Invalid password", success: false });
        }

        //First parameter is the one we will assign as token, second parameter is the secret token: jwt.sign(token, secret_token)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
            expiresIn: "1d",
        });
        res.send({
            message: "User logged succesfully",
            success: true,
            Data: token,
        });
    } catch (error) {
        res.send({ message: error.message, success: false });
    }
});

router.get("/get-current-user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        res.send({
            success: true,
            message: "User fetched successfully",
            Data: user,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
    try {
        const allUsers = await User.find({ _id: { $ne: req.body.userId } });
        res.send({
            success: true,
            message: "Users fetched successfully",
            data: allUsers,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

module.exports = router;
