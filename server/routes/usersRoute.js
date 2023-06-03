const User = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//User registration
router.post("/register", async (req, res) => {
    try {
        //Checking if there is any user with the same email than the one that is trying to register
        const user = User.findOne({ email: req.body.email });
        if (user) {
            return res.send({ message: "User already exists", success: false });
        }

        //Encrypting password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        //Giving the encrypted password to the password from the req.body
        req.body.password = hashedPassword;
        //Creating the new user
        const NewUser = new User(req.body);
        //Saving the document in the database
        await NewUser.save();

        //Sending response to frontend
        res.send({ message: "User created successfully", success: true });
    } catch (error) {
        res.send({ message: error.message, success: false });
    }
});

router.post("/login", async (req, res) => {
    try {
        //Checking if there is such user in the database
        const user = await User.findOne(req.body.email);
        if (!user) {
            return res.send({
                message: "The user does not exist",
                success: false,
            });
        }

        //Checking the passarowds

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.send({ message: "Invalid password", success: false });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN);
        res.send({
            message: "User logged succesfully",
            success: false,
            Data: token,
        });
    } catch (error) {
        res.send({ message: error.message, success: false });
    }
});

module.exports = router;
