const chatMessageHandler = require("../chatMessageHandler");
const sendObj = require("../../comm/sendObj");
const chatMessage = require("../chatMessage");
const chatUser = require("../chatUser");
const dfaUtil = require("../../dfa/dfaUtil");
const mgz = require("../mgzlist2");

const chatDfa = new dfaUtil(mgz.WorldList);

//发送消息
function sendMsg(room, server, conn, reqObj) {
    //判断是否新用户进入
    const info = reqObj.Message;
    if (room.getUser(info.UserName) == false) {
        //如果是新用户，则添加到用户列表
        const newUser = new chatUser();
        newUser.Name = info.UserName;
        newUser.LoginTime = new Date();
        newUser.Conn = conn;
        room.addUser(newUser);
    }

    //处理敏感字
    let newMessage = chatDfa.handleWord(info.Message, "*");

    //添加记录消息记录
    let newmsg = new chatMessage();
    newmsg.UserName = info.UserName;
    newmsg.Message = newMessage;
    newmsg.SendTime = new Date();
    room.addMessage(newmsg);

    //广播
    let newSendObj = new sendObj();
    newSendObj.Code = "sendmsg";
    newSendObj.Message = newmsg;
    newSendObj.Status = 0;
    newSendObj.SendTime = new Date();
    chatMessageHandler.sendAllUserInfo(server, newSendObj);
}


//注册回调方法
chatMessageHandler.addHandler("sendmsg", sendMsg);
