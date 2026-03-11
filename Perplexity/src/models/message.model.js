import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            required: true
        },
        content:{
            type: String,
            required: true
        },
        roles: {
            type: String,
            enum: ['user','ai'],
            required: true
        },
    },
    {timestamps : true}
)

const messageModel = mongoose.model('Message',messageModel);

export default messageModel;