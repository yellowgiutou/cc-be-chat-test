function chatRoom() {
	this.MessageList = [];
	this.UserMap = new Map();
	this.MaxCount = 50;
	// 添加消息
	this.addMessage = function (message) {
		//加入列表末尾
		this.MessageList.push(message);

		//超过限制条数，则移除前面的
		if (this.MessageList.length > this.MaxCount) {
			this.MessageList.splice(0, 1);
		}
	}

	// 获取所有消息
	this.getMessageList = function () {
		return this.MessageList;
	}

	//获取用户列表
	this.getUserList = function () {
		const userList = [];
		for (key in this.UserMap) {
			userList.push(this.UserMap[key]);
		}

		return userList;
	}

	//添加用户
	this.addUser = function (user) {
		this.UserMap[user.Name] = user;
	}

	//获取指定用户
	this.getUser = function (name) {
		return this.UserMap[name];
	}

	//移除指定用户(根据用户名称)
	this.removeUser_name = function (name) {
		if (this.UserMap[name]) {
			delete this.UserMap[name];
		}
	}

	//移除指定用户(根据连接对象)
	this.removeUser_conn = function (conn) {
		const removeName = "";
		for (var key of this.UserMap) {
			const tempUser = this.UserMap[key];
			if (tempUser.Conn == conn) {
				removeName = tempUser.Name;
			}
		}

		if (removeName != "") {
			delete this.UserMap[removeName];
		}
	}

}

module.exports = chatRoom;