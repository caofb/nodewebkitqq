/*********************************************************
*  Copyright (c) 2013-2014 Donkil. All rights reserved.  *
*                                                        *
*           Publish under GPL License.                   *
*********************************************************/
var gui = require('nw.gui');

chrome.extension.addListener(function(request, sender) {
	if(typeof(request) == 'string' &&request.substr(0,6) == 'getVCI'){
     var win= gui.Window.get();
		 var verifyInfo = request.substr(6).split('&');
		 showVerifyDialog() ;
     win.cookies.onChanged.addListener(function(changeInfo) 
      {
        if(!changeInfo.removed ){
          HTML5QQ.all_cookies.push(cookieToString(changeInfo.cookie));
        }
      });
     var src="http://captcha.qq.com/getimage?aid=1003903&r="+Math.random()+"&uin="+verifyInfo[0]+"&vc_type="+verifyInfo[1];
     document.getElementById('verifyCodeImg').src =src;
	}
});
function cookieToString(cookie){
  var str= cookie.name+"="+cookie.value+";PATH="+cookie.path+";DOMAIN=" +cookie.domain;
  return str;
}



function showVerifyDialog() {
    if($("#verifyDialog").length < 1) {
        var uiTPL   = $("#verifyDialogTemplate").html();
        var uiTemplate = Handlebars.compile( uiTPL );
        $('body').append(uiTemplate());
        document.getElementById('ok').onclick = function(){
            chrome.extension.sendMessage('verify;'+document.getElementById('verifyCode').value);
            $('#verifyDialog').modal('hide');
        };

        document.getElementById('verifyCode').onkeydown = function(){
          if(event.keyCode==13){
            chrome.extension.sendMessage('verify;'+document.getElementById('verifyCode').value);
            $('#verifyDialog').modal('hide');
          }
        };
        document.getElementById('verifyCode').select();
     }
       $('#verifyDialog').modal({backdrop: 'static',show: true});
}