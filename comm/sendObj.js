function sendObj(){
	this.Code="";//消息类型
    this.Message="";//消息内容
    this.Status="";//状态(0代表成功，可以读取消息内容)
	this.SendTime="";//发送时间
}

module.exports =sendObj;