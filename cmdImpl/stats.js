//显示用户登录时长
const cmdType = require("../comm/codeType");
const cmdHandler = require("./cmdHandler");
const chatHandler = require("../chatImpl/chatMessageHandler");

// 获取用户列表
function showUserLog(cmdStr) {
    //切割命令
    let arr = cmdStr.split(" ");
    let name = arr[1];

    //返回历史消息
    let user = chatHandler.getRoom().getUser(name);
    console.log("LoginTime:%s", user.LoginTime);
    console.log("nowTime:%s", new Date());
    let nt = (new Date() - user.LoginTime);
    let second = Math.round(nt / 1000);
    console.log("用户%s登录时间为：%s", name, formation(second));

    //tobo byron 需要用登录时间和当前时间算出总的在线时间
}

// 格式化时间 -> 00d 02h 48m 23s
function formation(second) {
    let minSecond = 60;
    let hourSecod = minSecond * 60;
    let daySecond = hourSecod * 24;

    let day = 0;
    let hour = 0;
    let min = 0;

    //计算天数
    // if (second > daySecond) {
    day = Math.round(second / daySecond);
    second = second - (day * daySecond);
    // }

    //计算小时
    // if (second > hourSecod) {
    hour = Math.round(second / hourSecod);
    second = second - (hour * hourSecod);
    // }

    //计算分钟
    // if (second > minSecond) {
    min = Math.round(second / minSecond);
    second = second - (min * minSecond);
    // }

    //追加秒数
    let timeStr = dataLeftCompleting(2, "0", day) + "d " + dataLeftCompleting(2, "0", hour)
        + "m " + dataLeftCompleting(2, "0", min) + "m " + dataLeftCompleting(2, "0", second) + "s";
    return timeStr;
}

/**
 * 可扩充的解决方案
 * @param bits 格式化位数
 * @param identifier 补全字符
 * @param value 值
 */
function dataLeftCompleting(bits, identifier, value) {
    value = Array(bits + 1).join(identifier) + value;
    return value.slice(-bits);
}

//注册回调方法
cmdHandler.addHandler(cmdType.cmd_stats, showUserLog);