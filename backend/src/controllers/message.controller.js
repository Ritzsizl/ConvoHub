import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller", error.message);
        res.status(500).json({ message: "Internal Server error" });     
    }
};

export const getMessages = async (req, res)=> { 
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id;

        const messages = await Message.find({
            //this will show us the messages where the sender is the user and the receiver is the other guy and vice-versa
            $or: [
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId: myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error){
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
};

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        //check if the user is uploading an image
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }


        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessage controller ", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}; 