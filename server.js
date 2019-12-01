// 服务端入口包
const ws = require("nodejs-websocket");
const chatMessageHandler = require("./chatImpl/chatMessageHandler");

function start() {
    let wsServer = ws.createServer(function (conn) {
        conn.on("connect", function (code) {
            console.log('开启连接', code)
        });

        conn.on("text", function (str) {
            try {
                chatMessageHandler.recoverMessage(wsServer, conn, str);
            } catch (error) {
                console.log(error);
            }
        });

        conn.on("close", function (code, reason) {
            try {
                console.log("连接关闭，code:%s   原因：%s", code, reason);
                chatMessageHandler.conClose(conn);
            } catch (error) {

                console.log(error);
            }
        });

        conn.on("error", function (code, reason) {
            console.log("连接异常关闭，code:%s   原因：%s", code, reason)
        });

    }).listen(10000);

    console.log("服务端启动成功~ 端口号：", 100000);
}

module.exports.start = start;