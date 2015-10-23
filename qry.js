/**
* qry
* a tiny chained api
* v0.1a
* Nico Pr 2015
* http://www.nicopr.fr/qry
*/

var $;
var crap;
var rnotwhite = (/\S+/g);
(function() {
	"use strict";
	console.log("init qry");
	
	/*crap = (navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("Trident/") > -1);
	if(crap) {
		console.log("crappy browser detected -_-");
		document.querySelector = document.getElementById;
		document.querySelectorAll = document.getElementsByClassName;
	}*/
	
    $ = function(selector) {
        return new tQ(selector, document);
    };
	
    var tQ = function(selector, parent) {
		var nodes, i, l;
		if(typeof selector == "string") {
			if(selector.charAt(0) == "#") nodes = [parent.querySelector(selector)]; // .substring(1) for IE
			else if(selector.charAt(0) == ".") {
				var preg = /([a-z.#]+):?(\d+)?/i;
				var processed = preg.exec(selector);
				nodes = parent.querySelectorAll(processed[1]); // .substring(1) for IE
				if(nodes.length && typeof processed[2] !== "undefined") nodes = [nodes[processed[2]]];
			}
			else if(selector == "body") nodes = [document.body];
			else if(selector.charAt(0) == "<" && selector.charAt(selector.length - 1) == ">") {
				var parsed = /<(\w+)\/>/.exec(selector);
				if(parsed) nodes = [document.createElement(parsed[1])];
				else throw("invalid markup");
			}
			else { // tag name
				nodes = parent.querySelectorAll(selector);
			}
		}
		else if(selector instanceof tQ) nodes = selector;
		else if(selector instanceof NodeList) nodes = selector;
		else if(typeof selector == "object") nodes = [selector];
		else throw("selector fail");
        for(i = 0, l = nodes.length; i < l; i++) this[i] = nodes[i];
        this.length = nodes.length;
        return this;
    };
	
    $.fn = tQ.prototype = {
		chill: function() {
			return 0; // the amount of fucks i give
		},
		hide: function() {
            for(var i = 0, l = this.length; i < l; i++) {
                this[i].style.display = 'none';
            }
            return this;
        },
		show: function() {
            for(var i = 0, l = this.length; i < l; i++) {
                this[i].style.display = '';
            }
            return this;
        },
		width: function() {
			return this[0].offsetWidth === 0 ? /\d*/.exec(this[0].style.width) : this[0].offsetWidth;
		},
		height: function() {
			return this[0].offsetHeight === 0 ? /\d*/.exec(this[0].style.height) : this[0].offsetHeight;
		},
		attr: function(attr, value) {
			if(typeof value === "undefined") return this[0].getAttribute(attr);
			for(var i = 0, l = this.length; i < l; i++) this[i].setAttribute(attr, value);
			return this;
		},
		is: function(attr) {
			for(var i = this.length - 1; i >= 0; i--) {
				if(typeof this[i].getAttribute(attr) === "undefined") {
					delete this[i];
					this.length--;
				}
			}
			return this;
		},
		not: function(attr) {
			for(var i = this.length - 1; i >= 0; i--) {
				if(typeof this[i].getAttribute(attr) !== "undefined") {
					delete this[i];
					this.length--;
				}
			}
			return this;
		},
		data: function(field, value) {
			field = "data-" + field;
			if(typeof value === "undefined") return this[0].getAttribute(field);
			for(var i = 0, l = this.length; i < l; i++) this[i].setAttribute(field, value);
			return this;
		},
		parent: function() {
			return this[0].parentNode;
		},
		appendTo: function(parent) {
			for(var i = 0, l = this.length; i < l; i++) $(parent).append(this[i]);
			return this;
		},
		append: function(child) {
			for(var i = 0, l = this.length; i < l; i++) this[i].appendChild(child);
			return this;
		},
        remove: function() {
            for(var i = 0, l = this.length; i < l; i++) this[i].parentNode.removeChild(this[i]);
            return this;
        },
		children: function() {
			return $(this[0].childNodes);
		},
		html: function(content) {
			if(typeof content === "undefined") return this[0].innerHTML;
			for(var i = 0, l = this.length; i < l; i++) this[i].innerHTML = content;
			return this;
		},
		text: function(txt) {
			if(typeof txt === "undefined") return this[0].innerText;
			for(var i = 0, l = this.length; i < l; i++) this[i].innerText = txt;
			return this;
		},
		val: function(value) {
			if(typeof value === "undefined") return this[0].value;
			for(var i = 0, l = this.length; i < l; i++) this[i].value = value;
			return this;
		},
		empty: function() {
			for(var i = 0, l = this.length; i < l; i++) while(this[i].firstChild) this[i].removeChild(this[i].firstChild); // innerHTML = ""; // ??
			return this;
		},
		hasClass: function(className) {
			for(var i = this.length - 1, e = this[this.length - 1]; i >= 0; e = this[--i]) {
				if((" " + e.className + " ").indexOf(" " + className + " ") == -1) {
					delete this[i];
					this.length--;
				}
			}
			return this;
		},
		addClass: function(className) {
			var e, c;
			for(var i = 0, l = this.length; i < l; i++) {
				e = this[i];
				c = " " + e.className + " ";
				if(c.indexOf(" " + className + " ") == -1) e.className = (c + className).trim();
			}
			return this;
		},
		removeClass: function(className) {
			var e, c;
			for(var i = 0, l = this.length; i < l; i++) {
				e = this[i];
				c = " " + e.className + " ";
				if(c.indexOf(" " + className + " ") > -1) e.className = c.replace(" " + className + " ", " ").trim();
			}
			return this;
		},
		css: function(props) {
			if(typeof props === "string") return getComputedStyle(this[0])[props];
			for(var prop in props) for(var i = 0, l = this.length; i < l; i++) this[i].style[prop] = props[prop];
			return this;
		},
		each: function(ftn) { // ++i or i++ ?
			for(var i = 0, o = this.length, v = this[0]; i < o && ftn(v, i) !== false; v = this[++i]) {};
			return this;
		},
		trigger: function(eventName, data) {
			var event = new CustomEvent(eventName, {bubbles: false, cancelable: false, detail: data});
			for(var i = 0, l = this.length; i < l; i++) this[i].dispatchEvent(event);
		},
		on: function(event, callback) {
			for(var i = 0, l = this.length; i < l; i++) {
				if(this[i].addEventListener) this[i].addEventListener(event, callback, false);
				else {
					this[i].attachEvent('on' + event, function() {
						callback.call(this[i]);
					});
				}
			}
			return this;
		},
		off: function(event, callback) {
			for(var i = 0, l = this.length; i < l; i++) {
				if(this[i].removeEventListener) this[i].removeEventListener(event, callback, false);
				else {
					this[i].detachEvent('on' + event, function() {
						callback.call(this[i]);
					});
				}
			}
			return this;
		},
		get: function(selector) {
			if(selector % 1 == 0) {
				for(var i = this.length - 1; i >= 0; i--) {
					if(i != selector) {
						delete this[i];
						this.length--;
					}
				}
				return this;
			}
			else return new tQ(selector, this[0]);
		}
    };
	
	$.ajax = function(request) {
		/**
		*
		*	request structure
		*	url: script url
		*	method: POST / GET
		*	data: data to be sent
		*	contentType: send content-type header (false > don't send)
		* 	processData: false > send raw data 
		*	ready: function called when request is ready to launch
		*	progress : function called on upload progress
		*	success: function(data) called on success
		*	error: function called if anything fails
		*
		*/
		var xhr = null;
		if(window.XMLHttpRequest || window.ActiveXObject) {
			if(window.ActiveXObject) {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch(e) {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
			}
			else xhr = new XMLHttpRequest();
		}
		else {
			throw "no xhr !";
		}
		if(request.progress) xhr.upload.onprogress = function(e) {
			var percent = (e.loaded / e.total * 100).toFixed(1);
			request.progress(percent);
		};
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 1 && (xhr.status === 200 || xhr.status === 0)) request["ready"].call();
			else if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) request["success"].apply(this, [$.json(xhr.responseText)]);
			else if(xhr.status !== 200 && xhr.status !== 0) request["error"].call();
		};
		xhr.open(request.method, request.url, true);
		if(request.method == "POST" && (typeof request.contentType == "undefined" || request.contentType != false)) {
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		}
		if(typeof request.processData == "undefined" || request.processData != false) {
			var out = new Array();
			for(key in request.data) out.push(key + "=" + encodeURIComponent(request.data[key]));
			xhr.send(out.join("&"));
		}
		else xhr.send(request.data);
	};
	
	$.extend = function(objects) {
		var extended = {};
		var merge = function(obj) {
			for(var prop in obj) if(Object.prototype.hasOwnProperty.call(obj, prop)) extended[prop] = obj[prop];
		};
		merge(arguments[0]);
		for(var i = 1, l = arguments.length; i < l; i++) merge(arguments[i]);
		return extended;
	};
	
	$.json = function(data) {
		/*if(!typeof data == 'object') return data;
		else return JSON.parse(data);*/
		try {
			var o = JSON.parse(data);
			if (o && typeof o === "object" && o !== null) {
				return o;
			}
		}
		catch (e) {
			return data;
		}
	};
	
	$.uniq = function() {
		return (new Date().getTime() + Math.floor((Math.random() * 10000) + 1)).toString(16);
	};
	
	$.isin = function(needle, haystack, start) {
         for (var i = (start || 0), j = haystack.length; i < j; i++) if(haystack[i] === needle) return i;
         return -1;
    };
	
}());

// happy Google Closure Compiler is happy

$.fn['hide'] = $.fn.hide;
$.fn['show'] = $.fn.show;
$.fn['width'] = $.fn.width;
$.fn['height'] = $.fn.height;
$.fn['attr'] = $.fn.attr;
$.fn['is'] = $.fn.is;
$.fn['not'] = $.fn.not;
$.fn['data'] = $.fn.data;
$.fn['parent'] = $.fn.parent;
$.fn['appendTo'] = $.fn.appendTo;
$.fn['append'] = $.fn.append;
$.fn['remove'] = $.fn.remove;
$.fn['children'] = $.fn.children;
$.fn['html'] = $.fn.html;
$.fn['text'] = $.fn.text;
$.fn['val'] = $.fn.val;
$.fn['empty'] = $.fn.empty;
$.fn['hasClass'] = $.fn.hasClass;
$.fn['addClass'] = $.fn.addClass;
$.fn['removeClass'] = $.fn.removeClass;
$.fn['css'] = $.fn.css;
$.fn['each'] = $.fn.each;
$.fn['trigger'] = $.fn.trigger;
$.fn['on'] = $.fn.on;
$.fn['off'] = $.fn.off;
$.fn['get'] = $.fn.get;

$['fn'] = $.fn;
$['ajax'] = $.ajax;
$['extend'] = $.extend;
$['json'] = $.json;
$['uniq'] = $.uniq;
$['isin'] = $.isin;

window['$'] = $;

// happy now