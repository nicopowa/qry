/**
* qry
* a tiny chained api
* v0.1a
* Nico Pr 2018
* https://nicopr.fr/qry
*/

var $;
var odata = {};
var crap;
(function() {
	"use strict";
	console.log("init qry");
	/*crap = (navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("Trident/") > -1);
	if(crap) {
		console.log("crappy browser detected -_-");
		document.querySelector = document.getElementById;
		document.querySelectorAll = document.getElementsByClassName;
	}*/
	
	/*
	* @method $: qry selector
	* @param selector: "<element/>" / html element / nodelist / array of elements / object / #id / .class / qry object / "body"
	* @return qry object
	*/
    $ = function(selector) {
        return new qry(selector, document);
    };
	
    var qry = function(selector, parent) {
		var nodes, i, l;
		if(typeof selector == "string") {
			if(selector.charAt(0) == "#") nodes = [parent.querySelector(selector)]; // .substring(1) for IE
			else if(selector.charAt(0) == ".") {
				var preg = /([a-z_\-.#]+):?(\d+)?/i;
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
			else nodes = parent.querySelectorAll(selector); // element name
		}
		else if(selector instanceof qry) nodes = selector;
		else if(selector instanceof NodeList) nodes = selector;
		else if(selector instanceof Array) nodes = selector;
		else if(typeof selector == "object") nodes = [selector]; // uh ?
		else {
			console.log("selector fail");
			console.log(selector);
		}
        for(i = 0, l = nodes.length; i < l; i++) this[i] = nodes[i]; // if(nodes[i].nodeName !== "#text") // ???????
        this.length = nodes.length;
        return this;
    };
	
    $.fn = qry.prototype = {
		/*
		* TODO
		*/
		chill: function() {
			return 0; // amount of fucks to give
		},
		/*
		* @method hide: hide selected elements
		* @return qry object
		*/
		hide: function() {
            for(var i = 0, l = this.length; i < l; i++) this[i].style.visibility = "hidden";
            return this;
        },
		/*
		* @method show: show selected elements
		* @return qry object
		*/
		show: function() {
            for(var i = 0, l = this.length; i < l; i++) this[i].style.visibility = "";
            return this;
        },
		/*
		* @method width: get first element width
		* @return number
		*/
		width: function() {
			return this[0].offsetWidth === 0 ? /\d*/.exec(this[0].style.width)[1] : this[0].offsetWidth;
		},
		/*
		* @method height: get first element height
		* @return number
		*/
		height: function() {
			return this[0].offsetHeight === 0 ? /\d*/.exec(this[0].style.height)[1] : this[0].offsetHeight;
		},
		/*
		* @method position: get first element position
		* @return object{left, top}
		*/
		position: function() {
			var offsetX = 0;
			var offsetY = 0;
			var el = this[0];
			while(el) {
				offsetX += (el.offsetLeft - el.scrollLeft + el.clientLeft);
				offsetY += (el.offsetTop - el.scrollTop + el.clientTop);
				el = el.offsetParent;
			}
			return {left: offsetX, top: offsetY};
		},
		/*
		* @method attr: set or get attribute
		* @param attr: html attribute
		* @param value: attribute value
		* @comment if value is not defined, get first element attribute
		* @return qry object or string
		*/
		attr: function(attr, value) {
			if(typeof value === "undefined") return this[0].getAttribute(attr);
			for(var i = 0, l = this.length; i < l; i++) this[i].setAttribute(attr, value);
			return this;
		},
		/*
		* @method rmattr: remove attribute
		* @param attr: html attribute
		* @return qry object
		*/
		rmattr: function(attr) {
			for(var i = 0, l = this.length; i < l; i++) this[i].removeAttribute(attr);
			return this;
		},
		/*
		* @method is: filter qry object from attribute
		* @param attr: html attribute
		* @return qry object
		*/
		is: function(attr) {
			for(var i = this.length - 1; i >= 0; i--) {
				if(!this[i].hasAttribute(attr)) {
					delete this[i];
					this.length--;
				}
			}
			return this;
		},
		/*
		* @method not: filter qry object from NOT attribute
		* @param attr: html attribute
		* @return qry object
		*/
		not: function(attr) { // + test class ?
			for(var i = this.length - 1; i >= 0; i--) {
				if(this[i].hasAttribute(attr)) {
					delete this[i];
					this.length--;
				}
			}
			return this;
		},
		/*
		* @method shift: remove first element
		* @return qry object
		*/
		shift: function() {
			for(var i = 0, l = this.length; i < l; i++) this[i] = this[i+1];
			return this.pop();
		},
		/*
		* @method pop: remove last element
		* @return qry object
		*/
		pop: function() {
			delete this[--this.length];
			return this;
		},
		/*
		* @method first: keep only first element
		* @return qry object
		*/
		first: function() {
			return $(this[0]);
		},
		/*
		* @method last: keep only last element
		* @return qry object
		*/
		last: function() {
			return $(this[this.length - 1]);
		},
		/*
		* @method prev: get previous sibling
		* @return qry object
		*/
		prev: function() {
			return $(this[0].previousSibling);
		},
		/*
		* @method next: get next sibling
		* @return qry object
		*/
		next: function() {
			return $(this[0].nextSibling);
		},
		/*
		* @method slice: slice qry object
		* @return qry object
		*/
		slice: function(begin, end) { // MODIFY
			var res = [];
			for(var i = begin; i <= end; i++) res.push(this[i]);
			return $(res);
		},
		/*
		* @method splice: splice a qry object
		* @return qry object
		*/
		splice: function(start, length) {
			return this.slice(start, start + length); // lazy
		},
		/*
		* @method data: set or get data
		* @param field: data object field
		* @param value: data field value
		* @comment if value is not defined, get first element data
		* @return qry object or string
		*/
		data: function(field, value) {
			if(typeof value === "undefined") {
				if(!this[0].hasAttribute("data-qry")) return null;
				return odata[this[0].getAttribute("data-qry")][field];
			}
			for(var i = 0, l = this.length; i < l; i++) {
				if(this[i].hasAttribute("data-qry")) odata[this[i].getAttribute("data-qry")][field] = value;
				else {
					this[i].setAttribute("data-qry", $.uniq());
					odata[this[i].getAttribute("data-qry")] = {}; // lol IE ES6 {[field]: value};
					odata[this[i].getAttribute("data-qry")][field] = value;
				}
			}
			return this;
		},
		/*
		* @method parent: get first element parent
		* @return qry object
		*/
		parent: function() {
			if(this[0].parentNode) return $(this[0].parentNode);
			return $([]);
		},
		/*
		* @method appendTo: append qry object elements to any element
		* @param parent: parent element
		* @return qry object
		*/
		appendTo: function(parent) {
			parent = $(parent)
			for(var i = 0, l = this.length; i < l; i++) parent[0].appendChild(this[i]);
			return this;
		},
		/*
		* @method append: append emement to first element
		* @param child: child element
		* @return qry object
		*/
		append: function(child) {
			$(child).appendTo(this);
			return this;
		},
		/*
		* @method remove: remove all child elements from DOM
		* @return qry object
		*/
        remove: function() {
            for(var i = 0, l = this.length; i < l; i++) this[i].parentNode.removeChild(this[i]);
            return this;
        },
		/*
		* @method children: get a qry object from children elements
		* @return qry object
		*/
		children: function() {
			return $(this[0].childNodes);
		},
		/*
		* @method html: set elements innerHTML
		* @param content: html string
		* @return qry object
		*/
		html: function(content) {
			if(typeof content === "undefined") return this.length > 0 ? this[0].innerHTML : "";
			for(var i = 0, l = this.length; i < l; i++) this[i].innerHTML = content;
			return this;
		},
		/*
		* @method text: set elements innerText
		* @param txt: string
		* @return qry object
		*/
		text: function(txt) {
			if(typeof txt === "undefined") return this.length > 0 ? this[0].innerText : "";
			for(var i = 0, l = this.length; i < l; i++) this[i].innerText = txt;
			return this;
		},
		/*
		* @method val: set elements value
		* @param value: the value
		* @return qry object
		*/
		val: function(value) {
			if(typeof value === "undefined") return this[0].value;
			for(var i = 0, l = this.length; i < l; i++) this[i].value = value;
			return this;
		},
		/*
		* @method empty: remove all child elements from elements
		* @return qry object
		*/
		empty: function() { // .html(""); ?? // recurse from deepest child level ?
			for(var i = 0, l = this.length; i < l; i++) while(this[i].firstChild) this[i].removeChild(this[i].firstChild);
			return this;
		},
		/*
		* @method hasClass: filter qry object from class
		* @param className: class name
		* @return qry object
		*/
		hasClass: function(className) {
			/*for(var i = this.length - 1, e = this[this.length - 1]; i >= 0; e = this[--i]) {
				if((" " + e.className + " ").indexOf(" " + className + " ") == -1) {
					delete this[i];
					this.length--;
				}
			}
			return this;*/
			for(var i = 0, d = 0, e = this[0], l = this.length; i < l; e = this[++i]) {
				if((" " + e.className + " ").indexOf(" " + className + " ") == -1) {
					delete this[i];
					this.length--;
					d++;
				}
				else this[i - d] = this[i];
			}
			return this;
		},
		/*
		* @method notClass: filter qry object from not class
		* @param className: class name
		* @return qry object
		*/
		notClass: function(className) {
			for(var i = 0, d = 0, e = this[0], l = this.length; i < l; e = this[++i]) {
				if((" " + e.className + " ").indexOf(" " + className + " ") != -1) {
					delete this[i];
					this.length--;
					d++;
				}
				else this[i - d] = this[i];
			}
			return this;
		},
		/*
		* @method addClass: add class to elements
		* @param className: class name
		* @return qry object
		*/
		addClass: function(className) {
			var e, c;
			for(var i = 0, l = this.length; i < l; i++) {
				e = this[i];
				c = " " + e.className + " ";
				if(c.indexOf(" " + className + " ") == -1) e.className = (c + className).trim(); // regex ?
			}
			return this;
		},
		/*
		* @method removeClass: remove class from elements
		* @param className: class name
		* @return qry object
		*/
		removeClass: function(className) {
			var e, c;
			for(var i = 0, l = this.length; i < l; i++) {
				e = this[i];
				c = " " + e.className + " ";
				if(c.indexOf(" " + className + " ") > -1) e.className = c.replace(" " + className + " ", " ").trim(); // regex ?
			}
			return this;
		},
		/*
		* @method css: apply css props to elements
		* @param props: object{propname, propvalue, ...}
		* @return qry object
		*/
		css: function(props) {
			if(typeof props === "string") return getComputedStyle(this[0])[props];
			for(var prop in props) for(var i = 0, l = this.length; i < l; i++) this[i].style[prop] = props[prop];
			return this;
		},
		/*
		* @method each: apply function to all elements
		* @param ftn: method to apply function(index, element, full qry object)
		* @return qry object
		* @comment: not fast enough, rewrite and benchmark
		*/
		each: function(ftn) { // ++i or i++ ?
			for(var i = 0, l = this.length, v = this[0]; i < l && ftn.apply(v, [i, v, this]) !== false; v = this[++i]) {};
			return this;
		},
		/*
		* @method trigger: dispatch event from elements
		* @param eventName: event name
		* @param data: event data
		* @return qry object
		*/
		trigger: function(eventName, data) {
			var event = new CustomEvent(eventName, {bubbles: false, cancelable: false, detail: data});
			for(var i = 0, l = this.length; i < l; i++) this[i].dispatchEvent(event);
		},
		/*
		* @method on: add a listener on elements
		* @param event: event name
		* @param callback: callback method
		* @return qry object
		*/
		on: function(event, callback) {
			for(var i = 0, l = this.length; i < l; i++) {
				if(this[i].addEventListener) this[i].addEventListener(event, callback, false);
				else {
					this[i].attachEvent("on" + event, function() {
						callback.call(this[i]);
					});
				}
			}
			return this;
		},
		/*
		* @method off: remove a listener from elements
		* @param event: event name
		* @param callback: callback method
		* @return qry object
		*/
		off: function(event, callback) {
			for(var i = 0, l = this.length; i < l; i++) {
				if(this[i].removeEventListener) this[i].removeEventListener(event, callback, false);
				else {
					this[i].detachEvent("on" + event, function() {
						callback.call(this[i]);
					});
				}
			}
			return this;
		},
		/*
		* @method clone: copy first element and append to same parent
		* @return qry object
		* @comment: qry-data attribute bug ?
		*/
		clone: function() {
			return $(this[0].cloneNode(true)).appendTo(this.parent());
		},
		/*
		* @method get: qry subselect method (experimental)
		* @param selector: subselector
		* @return qry object
		*/
		get: function(selector) {
			if(!isNaN(selector)) {
				/*if(selector > 0 && selector < this.length) {
					for(var i = 0, l = selector; i < l; i++) {
						this.shift();
					}
				}
				if(this.length > 1) {
					for(i = 1, l = this.length; i < l; i++) {
						this.pop();
					}
				}*/
				return $(this[selector]);
			}
			else if(selector == "..") return this.parent();
			else if(selector.charAt(0) == "<" && selector.charAt(selector.length - 1) == ">") {
				var parsed = /<(\w+)\/>/.exec(selector);
				if(parsed) return $(document.createElement(parsed[1])).appendTo(this);
				else throw("invalid markup");
			}
			else return new qry(selector, this[0]);
		}
    };
	
	/*
	* @method die: empty function
	*/
	$.die = function() {
		
	}
	
	/*
	* @method ajax: send request
	* @param request: request options
	* @return void
	*/
	$.ajax = function(request) {
		
		/**
		*	request structure
		*	url: script url
		*	method: POST / GET
		*	data: data to be sent
		*	async: true / false
		*	contentType: send content-type header (false > don't send)
		* 	processData: false > send raw data 
		*	ready: function() called when request is ready
		*	progress : function(percent) called on upload progress
		*	success: function(data) called on success
		*	error: function(status) called if anything fails
		*	username: http auth username
		*	password: http auth password
		*	params: array of whatever added to success() arguments
		*/
		
		request = $.extend({"processData": false, "async": true, "ready": $.die, "progress": $.die, "error": $.die, "params": []}, request);
		
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
			request.progress((e.loaded / e.total * 100).toFixed(1));
		};
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 1 && (xhr.status === 200 || xhr.status === 0)) request["ready"].call();
			else if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) request["success"].apply(this, [$.json(xhr.responseText)].concat(request["params"]));
			else if(xhr.status !== 200 && xhr.status !== 0) request["error"].apply(this, [xhr.statusText]);
		};
		xhr.open(request.method, request.url, request.async, request.user, request.password);
		if(request.method == "POST" && (typeof request.contentType == "undefined" || request.contentType != false)) {
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		}
		if(typeof request.processData == "undefined" || request.processData != false) {
			var out = new Array();
			for(var key in request.data) out.push(key + "=" + encodeURIComponent(request.data[key]));
			xhr.send(out.join("&"));
		}
		else xhr.send(request.data);
	};
	
	/*
	* @method extend: merge objects
	* @comment existing props are replaced during the loop, last object = final props
	* @return object
	*/
	$.extend = function() {
		var extended = {};
		var merge = function(obj) {
			for(var prop in obj) if(Object.prototype.hasOwnProperty.call(obj, prop)) extended[prop] = obj[prop];
		};
		merge(arguments[0]);
		for(var i = 1, l = arguments.length; i < l; i++) merge(arguments[i]);
		return extended;
	};
	
	/*
	* @method json: try json parse string
	* @param data: string
	* @return object or string if fail
	*/
	$.json = function(data) {
		/*if(!typeof data == "object") return data;
		else return JSON.parse(data);*/
		try {
			var o = JSON.parse(data);
			if(o && typeof o === "object" && o !== null) {
				return o;
			}
		}
		catch (e) {
			return data;
		}
	};
	
	/*
	* @method xml: string to xml
	* @param data: string
	* @return xml
	*/
	$.xml = function(xml) {
		if(typeof window.DOMParser != "undefined") {
			return (new window.DOMParser()).parseFromString(xml, "text/xml");
		}
		else if(typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
			var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = "false";
			xmlDoc.loadXML(xml);
			return xmlDoc;
		}
		else {
			throw new Error("No XML parser found");
		}
	}
	
	/*
	* @method uniq: pseudo unique identifier
	* @return string
	*/
	$.uniq = function() {
		return (new Date().getTime() + Math.floor((Math.random() * 10000) + 1)).toString(36);
	};
	
	/*
	* @method isin: array indexof polyfill (removed soon)
	* @param data: string
	* @return object or string if fail
	*/
	$.isin = function(needle, haystack, start) {
         for (var i = (start || 0), j = haystack.length; i < j; i++) if(haystack[i] === needle) return i;
         return -1;
    };
	
	/*
	* @method isnull: check var null or not
	* @param wut: is it ?
	* @return boolean
	*/
	$.isnull = function(wut) {
		return (wut === null && typeof wut === "object");
	};
	
}());

// happy Google Closure Compiler is happy

$.fn["hide"] = $.fn.hide;
$.fn["show"] = $.fn.show;
$.fn["width"] = $.fn.width;
$.fn["height"] = $.fn.height;
$.fn["attr"] = $.fn.attr;
$.fn["rmattr"] = $.fn.rmattr;
$.fn["is"] = $.fn.is;
$.fn["not"] = $.fn.not;
$.fn["shift"] = $.fn.shift;
$.fn["pop"] = $.fn.pop;
$.fn["first"] = $.fn.first;
$.fn["last"] = $.fn.last;
$.fn["next"] = $.fn.next;
$.fn["prev"] = $.fn.prev;
$.fn["slice"] = $.fn.slice;
$.fn["splice"] = $.fn.splice;
$.fn["data"] = $.fn.data;
$.fn["parent"] = $.fn.parent;
$.fn["appendTo"] = $.fn.appendTo;
$.fn["append"] = $.fn.append;
$.fn["remove"] = $.fn.remove;
$.fn["children"] = $.fn.children;
$.fn["html"] = $.fn.html;
$.fn["text"] = $.fn.text;
$.fn["val"] = $.fn.val;
$.fn["empty"] = $.fn.empty;
$.fn["hasClass"] = $.fn.hasClass;
$.fn["notClass"] = $.fn.notClass;
$.fn["addClass"] = $.fn.addClass;
$.fn["removeClass"] = $.fn.removeClass;
$.fn["css"] = $.fn.css;
$.fn["each"] = $.fn.each;
$.fn["trigger"] = $.fn.trigger;
$.fn["on"] = $.fn.on;
$.fn["off"] = $.fn.off;
$.fn["clone"] = $.fn.clone;
$.fn["get"] = $.fn.get;

$["fn"] = $.fn;
$["ajax"] = $.ajax;
$["extend"] = $.extend;
$["json"] = $.json;
$["xml"] = $.xml;
$["uniq"] = $.uniq;
$["isin"] = $.isin;
$["die"] = $.die;

window["$"] = $;
window["qry"] = $;

// happy now