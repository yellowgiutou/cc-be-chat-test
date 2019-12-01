const chatMessageHandler = require("./chatMessageHandler");
const sendObj = require("../comm/sendObj");
const chatMessage = require("../comm/chatMessage");
const dfaUtil = require("../dfa/dfaUtil");
const mgz = require("./mgzlist");
const codeType = require("../comm/codeType");

const chatDfa = new dfaUtil(mgz.WorldList);

//发送消息
function sendMsg(room, server, conn, reqObj) {
    //处理敏感字
    const info = reqObj.Message;
    let newMessage = chatDfa.handleWord(info.Message, "*");

    //添加记录消息记录
    let newmsg = new chatMessage();
    newmsg.UserName = info.UserName;
    newmsg.Message = newMessage;
    newmsg.SendTime = new Date();
    room.addMessage(newmsg);

    //广播
    let newSendObj = new sendObj();
    newSendObj.Code = codeType.sendMsg;
    newSendObj.Message = newmsg;
    newSendObj.Status = 0;
    newSendObj.SendTime = new Date();
    chatMessageHandler.sendAllUserInfo(server, newSendObj);
}


//注册回调方法
chatMessageHandler.addHandler(codeType.sendMsg, sendMsg);
