//显示最近5s使用过的命令
//显示用户登录时长
const cmdType = require("../comm/codeType");
const cmdHandler = require("./cmdHandler");
const objHelp = require("../comm/objHelp");

// 获取用户列表
function showUserLog(cmdStr) {
    let cmdList = cmdHandler.getSaveCmd();
    if (objHelp.isNull(cmdList) || cmdList.length == 0) {
        console.log("暂时无命令");
    } else {
        for (let index = 0; index < cmdList.length; index++) {
            const cmdCode = cmdList[index];
            console.log(cmdCode);
        }
    }
}

//注册回调方法
cmdHandler.addHandler(cmdType.cmd_popular, showUserLog);

