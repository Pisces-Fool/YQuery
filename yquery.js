/* 这是我自己手写的YQuery，仿造jquery。
主要目的是熟悉js里的封装，对象，继承。等知识，
也是鞭策自己去深入学习的动力吧*/

/*Author:Cjerry
Date:2017-08-01*/

function Yquery(arg){
	this.event = [];   //对象集合，我们是将元素包装成了YQuery对象，但我们操作的是Element对象，这里将其转为element对象
	switch(typeof arg){
		case "string":   //"#box"  ".box"    "span"
		var first = arg.charAt(0);
		switch(first){
			case "#":  this.event.push(document.getElementById(arg.substring(1)));
			break;
			case ".":  this.event = getClassName(document,arg.substring(1));//将结果集赋值到event里
			break;
			default:
			 this.event = (document.getElementsByTagName(arg));
			break;
		}
		break;
		case "object":
		break;
		case "function":     //主要是仿造$(function(){})这样一个页面重载的onload方法
							//在原生js里，onload只能调用一次，所以我们采取事件形式，可以多次调用
			eventListen(window,'load',arg);

		break;
	}
}

//Yquery 的原型对象，里面存的是键值对的形式
//$(".box").click(function(){}),函数以参数的形式代入。
Yquery.prototype = {
	click:function(fn){
		for (var i = 0; i < this.event.length; i++) {
			eventListen(this.event[i],'click',fn)
		}
	}
}

function Y(arg){
	return new Yquery(arg)
}
//事件封装
function eventListen(obj,type,fn){
	//IE浏览器的事件监听
	if (obj.attachEvent) {
		obj.attachEvent("on"+type,fn)
	} else {
		obj.addEventListener(type,fn,false)
	}
}
//因为getElementClassName没有，自己定义一个函数获取类名
function getClassName(obj,str){  //obj表示所要查找的范围，str表示所要查找的类名
	var elements = obj.getElementsByTagName("*");
	var results = [];
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].className == str) {
			results.push(elements[i])
		}
	}
	return results;   //将找到的结果集返回
}

