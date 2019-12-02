const test = require("ava");

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
    t.is(messgeList.length, 1);
});

//添加用户，获取
test("addUser", t => {
    let newChatUser = new chatUser();
    newChatUser.Name = "byron_ava_addUser";
    newChatUser.LoginTime = new Date();

    let room = new chatRoom();
    room.addUser(newChatUser);

    var userList = room.getUserList();
    
    //判断数量
    t.is(userList.length, 1);

    //判断名字
    let getUser = room.getUser(newChatUser.Name);
    t.is(getUser.Name, newChatUser.Name);
});

//移除用户-根据名称
//添加用户，获取
test("delUser", t => {
    let newChatUser = new chatUser();
    newChatUser.Name = "byron_ava_delUser";
    newChatUser.LoginTime = new Date();

    let room = new chatRoom();
    room.addUser(newChatUser);

    //移除用户
    room.removeUser_name(newChatUser.Name);

    //判断数量
    var userList = room.getUserList();
    t.is(userList.length, 1);
});