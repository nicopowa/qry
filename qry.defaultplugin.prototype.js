/**
* qry default plugin prototype
* v0.1a
* Nico Pr 2018
* http://www.nicopr.fr/qry
*/

(function() {
    console.log("init qry default plugin");
	
	$.fn.doSomething = function() {
		// this function will be added to qry object prototype available as follows : $(mySelector).doSomething();
	}
	
}());

$.fn["doSomething"] = $.fn.doSomething; // for minify