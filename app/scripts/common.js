function getLocalStorageObj( key){
	var str=localStorage[key];
	if(str)
      return JSON.parse(str);
     else
     	return {};
}
function saveLocalStorageObj(key,obj){
localStorage.key=JSON.stringify(obj);
}