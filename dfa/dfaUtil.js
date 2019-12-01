const node = require("./node");
const nodeFlag = require("./nodeFlag");
var util = require('util');

function dfaUtil(worldList) {
    //初始化
    this.root = new node("R", nodeFlag.Normal);

    //插入子节点
    this.insertNode = function (curNode, str, index) {
        //判断字符是否已经存在于当前节点的子节点中
        let childNode = curNode.getChild(str[index]);

        //如果存在，且index已经是chArr最后一个字符，则说明子节点应该是一个短节点；
        //如果该子节点的Flag=Normal，则将其设置为ShortTerminal
        if (typeof (childNode) != "undefined" && index == (str.length - 1) && childNode.Flag == nodeFlag.Normal) {
            childNode.Flag = nodeFlag.ShortTerminal;
        }

        //如果不存在此节点，则创建节点，并添加到当前节点的子节点列表中
        //  1、判断是否为最后一个字符，如果是则设置为长终节点；
        //  2、同时需要判断当前节点是否为长终节点，如果是则需要将其置为短终节点（因为具有子节点的一定不能是长终节点，而只能是短终节点）
        if (typeof (childNode) == "undefined") {
            childNode = new node(str[index], nodeFlag.Normal);

            //注释1
            if (index == (str.length - 1)) {
                childNode.Flag = nodeFlag.LongTerminal;
            }

            //注释2
            if (curNode.Flag == nodeFlag.LongTerminal) {
                curNode.Flag = nodeFlag.ShortTerminal;
            }

            //添加子节点
            curNode.addChild(childNode);
        }

        //自增并向后继续插入
        index++;
        if (index < str.length) {
            //使用的是尾递归，以节约内存和效率
            this.insertNode(childNode, str, index);
        }
    }

    //搜索特殊字符
    this.searchWord = function (inputStr) {
        //最终的索引范围列表<索引下限、索引上限>
        let finalIndexList = new Array();

        //每一轮是屏蔽词的<索引、Flag>列表
        let roundIndexList = new Array();

        let node = this.root;
        for (let index = 0; index < inputStr.length; index++) {
            const ch = inputStr[index];
            console.log("外部打印：ch:%s  index:%s", ch, index);
            // console.log("本次处理ch:%s  node:%s", ch, util.inspect(node, false, null));
            node = node.getChild(ch);
            // console.log("本次处理ch:%s  node:%s", ch, node);
            if (typeof (node) == "undefined") {
                //如果没有找到匹配的节点，说明此轮判断结束
                //需要判断是否有符合条件的短搜索路径
                if (roundIndexList.length > 0) {
                    //查找最后一个NodeFlag==1的数据项
                    //1、如果找到了，则需要当作有效路径来处理
                    //2、如果没有找到，则丢弃，并向后倒退roundIndexList.Count个位置，以避免当前位置的字符被误判的情况
                    //例如有两个关键字叠加“习近平的”，“近平”
                    //相当于每次只判断一个字符
                    let lastItem;
                    for (let rIndex = 0; rIndex < roundIndexList.length; rIndex++) {
                        const rItem = roundIndexList[rIndex];
                        if (rItem.Flag == nodeFlag.ShortTerminal) {
                            lastItem = rItem;
                        }
                    }

                    if (typeof (lastItem) == "undefined") {
                        index = index - roundIndexList.length;
                    } else {
                        // 将本轮的索引列表添加到最终的索引列表中
                        finalIndexItem = {};
                        finalIndexItem.Index1 = roundIndexList[0].Index;
                        finalIndexItem.Index2 = lastItem.Index;
                        finalIndexList.push(finalIndexItem);
                    }
                }

                //清空本轮的索引列表
                roundIndexList = new Array();

                //重新从根节点开始计算
                node = this.root;
            }
            //如果是长终节点，说明已经找到最长路径了，于是本轮结束
            else if (node.Flag == nodeFlag.LongTerminal) {
                console.log("进入到长终点了：ch:%s", ch);
                //将对应的index添加到本轮的索引列表中
                randIndexItem = {};
                randIndexItem.Index = index;
                randIndexItem.Flag = node.Flag;
                roundIndexList.push(randIndexItem);
                console.log("本次处理ch:%s index:%s roundIndexList:%s", ch, index, util.inspect(roundIndexList, false, null));

                // 将本轮的索引列表添加到最终的索引列表中
                finalIndexItem = {};
                finalIndexItem.Index1 = roundIndexList[0].Index;
                finalIndexItem.Index2 = roundIndexList[roundIndexList.length - 1].Index;
                finalIndexList.push(finalIndexItem);

                //清空本轮的索引列表
                roundIndexList = new Array();

                //重新从根节点开始计算
                node = this.root;
            }
            //如果是非终节点，则添加到本轮的列表中，然后继续往后搜索
            //如果是短终节点，则添加到本轮的列表中，然后继续往后搜索，以便于查找是否还有更长的搜索路径
            else {
                //将对应的index添加到本轮的索引列表中
                randIndexItem = {};
                randIndexItem.Index = index;
                randIndexItem.Flag = node.Flag;
                roundIndexList.push(randIndexItem);
            }

            //最后一个字处理完成后，需要再进行一次判断，以避免当前位置的字符被误判的情况
            //例如有两个关键字叠加“习近平的”，“近平”
            //相当于每次只判断一个字符
            if (index == (inputStr.length - 1)) {
                //判断是否存在没有完全匹配的数据
                if (roundIndexList.length > 0) {
                    //查找最后一个NodeFlag==1的数据项，如果找到了则需要当作有效路径来处理
                    let lastItem;
                    for (let index = 0; index < roundIndexList.length; index++) {
                        const ritem = roundIndexList[index];
                        if (ritem.Flag == nodeFlag.ShortTerminal) {
                            lastItem = ritem;
                        }
                    }

                    if (typeof (lastItem) == "undefined") {
                        index = index - (roundIndexList.length - 1);
                    } else {

                        // 将本轮的索引列表添加到最终的索引列表中
                        finalIndexItem = {};
                        finalIndexItem.Index1 = roundIndexList[0].Index;
                        finalIndexItem.Index2 = lastItem.Index;
                        finalIndexList.push(finalIndexItem);
                        break;
                    }
                }

                //清空本轮的索引列表
                roundIndexList = new Array();

                //重新从根节点开始计算
                node = this.root;
            }
        }

        return finalIndexList;
    }

    //处理单词，用指定字符替换特殊字符
    this.handleWord = function (inputStr, replaceCh) {
        console.log("inputStr:%s, replaceCh:%s", inputStr, replaceCh);
        //最终的索引范围列表<索引下限、索引上限>
        let finalIndexList = this.searchWord(inputStr);
        console.log(util.inspect(finalIndexList, false, null));

        //判断是否需要处理
        if (finalIndexList.length == 0) {
            return inputStr;
        }

        let newStr = "";
        for (let index = 0; index < inputStr.length; index++) {
            const ech = inputStr[index];

            //判断当前的索引是否位于可被替换的区间内
            let mathItem;
            for (let fIndex = 0; fIndex < finalIndexList.length; fIndex++) {
                const fItem = finalIndexList[fIndex];
                if (fItem.Index1 <= index && index <= fItem.Index2) {
                    mathItem = fItem;
                    break;
                }
            }

            if (typeof (mathItem) == "undefined") {
                newStr += ech;
            } else {
                newStr += replaceCh;
            }
        }

        return newStr;
    }

    //初始化
    for (let index = 0; index < worldList.length; index++) {
        const line = worldList[index];
        if (line.length > 0) {
            this.insertNode(this.root, line, 0);
        }
    }

    // console.log(util.inspect(this.root, false, null));
}

module.exports = dfaUtil;