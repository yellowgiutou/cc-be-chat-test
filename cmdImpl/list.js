// 显示所有用户
const cmdType = require("../comm/codeType");
const cmdHandler = require("./cmdHandler");
const chatHandler = require("../chatImpl/chatMessageHandler");

// 获取用户列表
function list(cmdStr) {
    //返回历史消息
    let userList = chatHandler.getRoom().getUserList();
    if (userList.length > 0) {
        for (let index = 0; index < userList.length; index++) {
            const user = userList[index];
            console.log("用户名：%s",user.Name);
        }
    } else {
        console.log("暂无用户~");
    }
}

//注册回调方法
cmdHandler.addHandler(cmdType.cmd_list, list);
