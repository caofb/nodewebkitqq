/*********************************************************
*  Copyright (c) 2013-2014 Donkil. All rights reserved.  *
*                                                        *
*           Publish under GPL License.                   *
*********************************************************/
var gui = require('nw.gui');
var login = false;
var stateListHover = false;
var win = gui.Window.get();
win.on('maximize',function(){
    win.restore();
});
document.getElementById('regacc').onclick = function(){
	window.open('http://ptlogin2.qq.com/qq_signup', '_blank');
};

document.getElementById('fgtpwd').onclick = function(){
	window.open('http://ptlogin2.qq.com/forget_pwd', '_blank');
};

chrome.extension.addListener(function(request, sender) {
	if(request == 'finish'){
		 $('#loginBox').hide();
		 $('#qqBox').show();
		 var win = gui.Window.get();
		 win.resizeTo(316,540);
		 win.moveTo(window.screen.width-320,100);
		 buildMainUI();
	}
});

var logining = location.search.substr(1);
if(logining == '101'){
	login = true;
	document.getElementById('loginButtonInner').innerHTML = '取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消';
	document.getElementById('beforeLogin').style.display = 'none';
	document.getElementById('afterLogin').style.display = 'block';
}

if(localStorage.rememberPwd){
	document.getElementById('rememberPwd').checked = 'checked';
}

if(localStorage.autoLogin){
	document.getElementById('autoLogin').checked = 'checked';
}

if(localStorage.account){
	document.getElementById('account').value = localStorage.account;
}

if(localStorage.password){
	document.getElementById('password').value = encodeURIComponent(localStorage.password);
}

if(localStorage.state){
	document.getElementById('state').setAttribute('state', localStorage.state);
}

document.getElementById('loginButtonInner').onclick = doLogin;

document.getElementById('state').onclick = function(){
	document.getElementById('stateListLogin').style.display = 'block';
};

document.getElementById('state').onmouseover = function(){
	stateListHover = true;
};

document.getElementById('state').onmouseout = function(){
	stateListHover = false;
};

document.getElementById('account').onkeydown = function(){
	if(event.keyCode==13){
		doLogin();
		return false;
	}
};

document.getElementById('password').onkeydown = function(){
	if(event.keyCode==13){
		doLogin();
		return false;
	}
};

document.getElementById('rememberPwd').onclick = function(){
	if(this.checked){
		localStorage.rememberPwd = 'true';
	}
	else{
		localStorage.rememberPwd = '';
		localStorage.account = '';
		localStorage.password = '';
		localStorage.state = '';
		localStorage.autoLogin = '';
		document.getElementById('autoLogin').checked = '';
	}
};

document.getElementById('autoLogin').onclick = function(){
	if(this.checked){
		localStorage.autoLogin = 'true';
		document.getElementById('rememberPwd').checked = 'checked';
	}
	else{
		localStorage.autoLogin = '';
	}
};

window.onclick = function(){
	if(!stateListHover){
		document.getElementById('stateListLogin').style.display = 'none';
	}
};

win.on('loaded',function(){
	var statelist = document.getElementsByClassName('stateList');
	for(var i = 0; i < statelist.length; i++){
		statelist[i].onclick = function(){
			document.getElementById('state').setAttribute('state', this.getAttribute('state'));
			document.getElementById('stateListLogin').style.display = 'none';
			return false;
		}
	}
});

function doLogin(){
	if(login){
		return;
	}
	var account = document.getElementById('account').value;
	var password;
	try{
		password = decodeURIComponent(document.getElementById('password').value);
	}
	catch(e){
		password = document.getElementById('password').value;
	}
	var state = document.getElementById('state').getAttribute('state');
	if(account && password){
		if(document.getElementById('rememberPwd').checked){
			localStorage.account = account;
			localStorage.password = password;
			localStorage.state = state;
		}
		login = true;
		document.getElementById('loginButtonInner').innerHTML = '取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消';
		document.getElementById('beforeLogin').style.display = 'none';
		document.getElementById('afterLogin').style.display = 'block';

		chrome.extension.sendMessage('login;'+encodeURIComponent(account)+';'+encodeURIComponent(password)+';'+encodeURIComponent(state));
	}
}