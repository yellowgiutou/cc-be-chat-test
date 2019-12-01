//聊天消息处理类
const chatRoom = require("../model/chatRoom");
const chatMessage = require("../comm/chatMessage");
const chatUser = require("../model/chatUser");
const sendObj = require("../comm/sendObj");
const dfaUtil = require("../dfa/dfaUtil");

//定义房间
const room = new chatRoom();

//类型处理字典
const typeHanlder = new Map();

//相应消息
module.exports.recoverMessage = function (server, conn, msgStr) {
    // console.log(msgStr);
    const sendObj = JSON.parse(msgStr);

    const fun = typeHanlder[sendObj.Code];
    if (fun) {
        fun(room, server, conn, sendObj);
    }
}

//连接关闭
module.exports.conClose = function (conn) {
    room.removeUser_conn(conn);
}

//注册聊天处理事件
module.exports.addHandler = function (codeKey, callBack) {
    typeHanlder[codeKey] = callBack;
}

//广播
module.exports.sendAllUserInfo = function (server, sendObj) {
    server.connections.forEach(function (conn) {
        conn.sendText(JSON.stringify(sendObj))
    })
};


//加载需要自动注册的模块
const gethistory = require("./gethistory");
const input_chat = require("./input_chat");
const sendMsg = require("./sendMsg");

