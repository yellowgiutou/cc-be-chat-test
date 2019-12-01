import test from 'ava';

const chatUser = require("./chatUser");
const chatRoom = require("./chatRoom");
const chatMessage = require("../comm/chatMessage");

//添加消息+获取消息
test("addMessage", t => {
    let newChatMsg = new chatMessage();
    newChatMsg.UserName = "byron_ava_addMessage";
    newChatMsg.Message = "byron_ava_addMessage_message";
    newChatMsg.SendTime = new Date();

    let room = new chatRoom();
    room.addMessage(newChatMsg);

    let messgeList = room.getMessageList();
    t.is(messgeList.length==1);
});

//添加用户

//获取用户

//获取用户列表

//移除用户-根据名称

//移除用户-根据conn

