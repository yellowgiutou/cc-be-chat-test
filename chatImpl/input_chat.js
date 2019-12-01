const chatMessageHandler = require("./chatMessageHandler");
const sendObj = require("../comm/sendObj");
const chatMessage = require("../comm/chatMessage");
const codeType = require("../comm/codeType");
const chatUser = require("../model/chatUser");
const objHelp = require("../comm/objHelp");

//玩家进入聊天室消息
function inputChat(room, server, conn, reqObj) {
    //判断是否新用户进入
    const info = reqObj.Message;
    let oldUser = room.getUser(info.UserName);
    if (objHelp.isNull(oldUser)) {
        //如果是新用户，则添加到用户列表
        const newUser = new chatUser();
        newUser.Name = info.UserName;
        newUser.LoginTime = new Date();
        newUser.Conn = conn;
        room.addUser(newUser);
    }

    //推送进入聊天室消息
    const newmsg = new chatMessage();
    newmsg.UserName = "系统消息";
    newmsg.Message = "用户" + reqObj.Message.UserName + "进入聊天室";
    newmsg.SendTime = new Date();

    const newInputSendObj = new sendObj();
    newInputSendObj.Code = codeType.input_Chat;
    newInputSendObj.Message = newmsg;
    newInputSendObj.Status = 0;
    newInputSendObj.SendTime = new Date();
    chatMessageHandler.sendAllUserInfo(server, newInputSendObj);
}


//注册回调方法
chatMessageHandler.addHandler(codeType.input_Chat, inputChat);
