const chatMessageHandler = require("../chatMessageHandler");
const sendObj = require("../../comm/sendObj");

// 获取历史消息
function getHistory(room, server, conn, reqObj) {
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

//注册回调方法
chatMessageHandler.addHandler("getHistory", getHistory);
