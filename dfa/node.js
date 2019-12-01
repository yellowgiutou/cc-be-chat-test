//节点对象
function node(ch, flag) {
    this.Ch = ch;//字符
    this.Flag = flag;//节点状态
    this.Children = new Map();//子节点集合

    //获取子节点
    this.getChild = function (ch) {
        return this.Children[ch];
    }

    //添加子节点
    this.addChild = function (cnode) {
        this.Children[cnode.Ch] = cnode;
    }
}

module.exports = node;