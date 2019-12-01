//命令行命令处理器
const inquirer = require('inquirer');


//类型处理字典
const cmdHanlder = new Map();

//注册聊天处理事件
module.exports.addHandler = function (cmdCode, callBack) {
    cmdHanlder[cmdCode] = callBack;
}
