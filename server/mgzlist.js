var fs = require('fs');
var readline = require('readline');

//定义敏感字集合
const WorldList = new Array();

function loadMzg() {
    //从文件中读取敏感字
    var fRead = fs.createReadStream("./mgz.txt");
    var objReadline = readline.createInterface({
        input: fRead
    });
    objReadline.on('line', function (line) {
        WorldList.push(line);
    });
    objReadline.on('close', function () {
        console.log(WorldList);
        console.log("共有%s个敏感字", WorldList.length);
    });
}

module.exports.WorldList = WorldList;
module.exports.loadMzg=loadMzg;