const test = require("ava");
const dfaUtil = require("./dfaUtil");
const mgz = require("../chatImpl/mgzlist");

//敏感字测试
test("dfa_test", t => {
    let chatDfa = new dfaUtil(mgz.WorldList);

    //不在列表中
    let newMessage1 = chatDfa.handleWord("aaaa", "*");
    t.is(newMessage1, "aaaa");

    //在列表中
    let newMessage2 = chatDfa.handleWord("a55", "*");
    t.is(newMessage2, "***");
});

