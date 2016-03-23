window.onload = function() {

	var aqiData = {};

	function addAqiData() {
		var name = document.getElementById("aqi-city-input").value;
		var num = document.getElementById("aqi-value-input").value;
		if (/\d/.test(num) && /^[a-zA-Z\u4e00-\u9fa5]+$/.test(name)) {
			aqiData[name] = num;
			renderAqiList();
		} else {
			alert("城市名称只能为中文或者英文字符，空气指数只能为数字，您的填写有误，请检查后重新填写");
		}
	}

	function renderAqiList() {

		var table = document.getElementById("aqi-table");
		removeAllChild(table);
		for (key in aqiData) {

			var tr = document.createElement('tr');
			var td1 = document.createElement('td');
			var td2 = document.createElement('td');
			var td3 = document.createElement('td');


			var btn = document.createElement('button');
			btn.innerHTML = "删除";
			btn.setAttribute("class", "btn");

			td1.innerHTML = key;
			td2.innerHTML = aqiData[key];

			tr.appendChild(td1);
			tr.appendChild(td2);
			td3.appendChild(btn);
			tr.appendChild(td3);
			table.appendChild(tr);
		}
	}

	function removeAllChild(elementNode) {
		while (elementNode.hasChildNodes()) {
			elementNode.removeChild(elementNode.firstChild);
		}
	}
	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {
		addAqiData();
	}

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 */
	function delBtnHandle(btn) {
		var name = btn.parentNode.parentNode.firstChild.innerHTML;
		delete aqiData[name];
		renderAqiList();
	}


	function init() {
		// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
		document.getElementById("add-btn").onclick = function() {
				addBtnHandle();
			}
			// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
		setInterval(function() {
			var arr = document.getElementsByClassName('btn');
			if (arr.length != 0) {
				for (var i = 0; i < arr.length; i++) {
					arr[i].onclick = function() {
						delBtnHandle(this);
					}
				}
			}
		}, 50)


	}
	init();
}