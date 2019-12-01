//命令行命令处理器
const inquirer = require('inquirer');
const objHelp = require("../comm/objHelp");

//类型处理字典
const cmdHanlder = new Map();
//最近使用过的命令缓存信息
const cmdSaveMap = new Map();
//命令保存多少秒
const cmdSaveSecond = 5;

//注册聊天处理事件
module.exports.addHandler = function (cmdCode, callBack) {
    cmdHanlder[cmdCode] = callBack;
}

//响应命令
module.exports.recoverCmd = function (cmdStr) {
    //切割命令
    let arr = cmdStr.split(" ");
    // console.log("arr[0]:%s", arr[0]);
    // console.log("arr[1]:%s", arr[1]);

    let cmdCode = arr[0];
    const fun = cmdHanlder[cmdCode];
    if (fun) {
        fun(cmdStr);

        //设定历史记录
        let oldCmdSaveObj = cmdSaveMap[cmdCode];
        if (objHelp.isNull(oldCmdSaveObj)) {
            oldCmdSaveObj = {};
            oldCmdSaveObj.cmd = cmdCode;
            oldCmdSaveObj.time = new Date();
            cmdSaveMap[cmdCode] = oldCmdSaveObj;
        } else {
            oldCmdSaveObj.time = new Date();
        }
    } else {
        console.log("请输入正确的命令(/list,/stats,/popular)");
    }
}

//获取保存的命令
module.exports.getSaveCmd = function () {
    let cmdList = [];
    let tNow = new Date().getTime();
    for (key in cmdSaveMap) {
        let saveObj = cmdSaveMap[key]
        let interval = (tNow - saveObj.time);
        let second = interval / 1000;
        if (second < cmdSaveSecond) {
            cmdList.push(key);
        }
    }

    return cmdList;
}

//运行

const run = async () => {
    while (true) {
        const { cmdStr } = await askCmd();
        // console.log("你的输入是：%s", cmdStr);
        this.recoverCmd(cmdStr);
    }
};

const askCmd = () => {
    const questions = [
        {
            name: "cmdStr",
            type: "input",
            message: "请输入对应的命令(/list,/stats,/popular):"
        }
    ];
    return inquirer.prompt(questions);
};


//初始化需要导入的模块
require("./list");
require("./popular");
require("./stats");

//运行
run();
