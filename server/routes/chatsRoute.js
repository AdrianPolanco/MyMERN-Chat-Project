const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Chat = require("../models/chatModel");

//CREATE A NEW CHAT

router.post("/create-new-chat", authMiddleware, async (req, res) => {
    try {
        const newChat = new Chat(req.body);
        const savedChat = await newChat.save();
        res.send({
            success: true,
            message: "Chat created successfully",
            data: savedChat,
        });
    } catch (error) {
        res.send({
            success: false,
            message: "Error creating chat",
            error: error.message,
        });
    }
});

//GET ALL CHATS FROM CURRENT USER
router.get("/get-all-chats", authMiddleware, async (req, res) => {
    try {
        const chats = await Chat.find({
            members: {
                $in: [req.body.userId],
            },
        });

        res.send({
            success: true,
            message: "Chats fetched successfully",
            data: chats,
        });
    } catch (error) {
        res.send({
            success: false,
            message: "Error fetching chats",
            error: error.message,
        });
    }
});

module.exports = router;
