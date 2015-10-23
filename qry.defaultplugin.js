/**
* qry default plugin
* v0.1a
* Nico Pr 2015
* http://www.nicopr.fr/qry
*/

(function() {
    console.log("init qry default plugin");
	
	var plugin = function() {};
	
	plugin.prototype = {
		doSomething: function() {
			// this function will be available as follows : $.plugin.doSomething();
		}
	}
	
	$.plugin = plugin.prototype;
	
}());


$["plugin"] = $.plugin; // for minify
$.plugin["doSomething"] = $.plugin.doSomething; // expose doSomething method