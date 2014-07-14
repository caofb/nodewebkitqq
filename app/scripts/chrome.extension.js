(function(){
    chrome={

    };
    EventEmitter=function(){

    };
    var proto = EventEmitter.prototype;
	var self = this;
	proto.sendMessage=function(request, sender, callback){
		var events=this._getEvents();
		callback=callback?callback:(typeof(sender==="function")?sender:null );
       for(var i=0;i<events.length;i++){
       	 try{
            events[i](request, sender, callback);
       	 }
       	 catch(err){
       	 	console.log(err);
       	 }
       	  
       }
	};
	proto.addListener = function(listener) {
		var events=this._getEvents();
		events.push(listener);
	};
	proto.removeListener = function(listener) {
		var events=this._getEvents();
		var index = events.indexOf(listener);  
        if (index > -1) {
          events.splice(index, 1);
        }
	};
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = []);
	};
	chrome.extension=new EventEmitter();
})();
global.chrome=chrome;
