const inquirer = require('inquirer');
const server = require("./server");
const cmdHandler=require("./cmdImpl/cmdHandler");

//启动服务器
server.start();

//启动命令行处理器
// cmdHandler.run();