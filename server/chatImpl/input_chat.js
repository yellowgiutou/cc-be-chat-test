const chatMessageHandler = require("../chatMessageHandler");
const sendObj = require("../../comm/sendObj");
const chatMessage = require("../chatMessage");

//玩家进入聊天室消息
function inputChat(room, server, conn, reqObj) {
    const newmsg = new chatMessage();
    newmsg.UserName = "系统消息";
    newmsg.Message = "用户" + reqObj.Message.UserName + "进入聊天室";
    newmsg.SendTime = new Date();

    const newInputSendObj = new sendObj();
    newInputSendObj.Code = "input_chat";
    newInputSendObj.Message = newmsg;
    newInputSendObj.Status = 0;
    newInputSendObj.SendTime = new Date();
    chatMessageHandler.sendAllUserInfo(server, newInputSendObj);
}


//注册回调方法
chatMessageHandler.addHandler("input_chat", inputChat);
