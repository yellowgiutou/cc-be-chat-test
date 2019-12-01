//聊天消息处理类
const chatRoom = require("./chatRoom");
const chatMessage = require("./chatMessage");
const chatUser = require("./chatUser");
const sendObj = require("../comm/sendObj");
const dfaUtil = require("../dfa/dfaUtil");
const mgz = require("./mgzlist2");

//定义房间
const room = new chatRoom();
console.log("test->", mgz.WorldList);
const chatDfa = new dfaUtil(mgz.WorldList);

//类型处理字典
const typeHanlder = new Map();
typeHanlder["getHistory"] = getHistory;
typeHanlder["sendmsg"] = sendMsg;
typeHanlder["input_chat"] = inputChat;

// 广播通知
const sendAllUserInfo = (server, sendObj) => {
    server.connections.forEach(function (conn) {
        conn.sendText(JSON.stringify(sendObj))
    })
}

//发送消息
function sendMsg(server, conn, reqObj) {
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
    let newMessage = chatDfa.handleWord(info.Message,"*");
    // let newMessage = info.Message;
    console.log("处理前文字：%s 处理后文字%s", info.Message, newMessage);

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
    sendAllUserInfo(server, newSendObj);
}

//玩家进入聊天室消息
function inputChat(server, conn, reqObj) {
    const newmsg = new chatMessage();
    newmsg.UserName = "系统消息";
    newmsg.Message = "用户" + reqObj.Message.UserName + "进入聊天室";
    newmsg.SendTime = new Date();

    const newInputSendObj = new sendObj();
    newInputSendObj.Code = "input_chat";
    newInputSendObj.Message = newmsg;
    newInputSendObj.Status = 0;
    newInputSendObj.SendTime = new Date();
    sendAllUserInfo(server, newInputSendObj);
}

// 获取历史消息
function getHistory(server, conn, reqObj) {
    //返回历史消息
    const allMessages = room.getMessageList();
    const historySendObj = new sendObj();
    historySendObj.Code = "getHistory";
    historySendObj.Message = allMessages;
    historySendObj.Status = 0;
    historySendObj.SendTime = new Date();

    const sendStr = JSON.stringify(historySendObj);
    conn.sendText(sendStr);
}

//相应消息
module.exports.recoverMessage = function (server, conn, msgStr) {
    // console.log(msgStr);
    const sendObj = JSON.parse(msgStr);

    const fun = typeHanlder[sendObj.Code];
    if (fun) {
        fun(server, conn, sendObj);
    }
}

//连接关闭
module.exports.conClose = function (conn) {
    room.removeUser_conn(conn);
}


