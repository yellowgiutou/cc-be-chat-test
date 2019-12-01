// 显示所有用户
const cmdType = require("../../comm/codeType");
const cmdHandler = require("./cmdHandler");
const chatHandler = require("./chatMessageHandler");

// 获取用户列表
function list(room, server, conn, reqObj) {
    //返回历史消息
    const allMessages = room.getMessageList();
    const historySendObj = new sendObj();
    historySendObj.Code = codeType.getHistory;
    historySendObj.Message = allMessages;
    historySendObj.Status = 0;
    historySendObj.SendTime = new Date();

    const sendStr = JSON.stringify(historySendObj);
    conn.sendText(sendStr);
}

//注册回调方法
cmdHandler.addHandler(codeType.cmd_list, list);
