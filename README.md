# qry
tiny js chaining api
v0.1a
Nico Pr 2015
http://www.nicopr.fr/qry

qry is a (very) basic jQuery-like library
for those who use only 5% of jQuery features

Documentation : 

	- Selectors :
	
		syntax : $(selector)
		select classes : $(".myClass")
		select element : $("#myId")
		select 0-based nth element : $("selector:n") 
		new html element : $("<tag/>") // to be used with appendTo method
		
		
		
	- Selector Methods :
	
		hide() : hide selected elements
		
		show() : show selected elements
		
		width() : get width (not chained)
		
		height() : get height (not chained) 
		
		attr :
			attr(attribute) : getter > return attribute value (first item only) (not chained)
			attr(attribute, value) : setter > set attribute (all items)
			
		is(attribute) : return selector elements that have attribute
		
		not(attribute) : return selector that dont have attribute
		
		data :
			data(field) : getter > return element data field value (not chained)
			data(field, value) : setter > assign data field value
			
		parent() : return parent element (first item only)
		
		appendTo(selector) : append item to selector
		
		append(selector) : append selector to item
		
		remove() : remove selected elements from dom
		
		children() : return all child nodes (first item only)
		
		html : 
			html() : getter > get item html content string (first item only) (not chained)
			html(value) : setter > set html value
			
		text : 
			text() : getter > get item text content (first item only) (not chained)
			text(value) : setter > set text value
			
		val : 
			val() : getter > get textfield text content (first item only) (not chained)
			val(value) : setter > set textfield value
			
		empty() : empty element (all children nodes)
		
		hasClass(className) : return elements that have className class
		
		addClass(className) : add className class to selected elements
		
		removeClass(className) : remove className class from selected elements
		
		css :
			css(cssProperty) : getter > get item cssProperty value (first item only) (not chained)
			css({"cssProp1": value1, "cssProp2": value2}) : setter > set css properties
			
		each(ftn) : apply ftn function to selected items (if ftn returns false : break loop)
		
		trigger(eventName) : dispatch eventName event
		
		on(eventName, callback) : call callback function each time eventName is dispatched by selected items
		
		off(eventName, callback) : stop listening to eventName events from selected items
		
		get(selector) : query selector inside current element
		
		
	- Global Methods
	
		$.ajax(url, type, data, beforeSend, success, error)
			url : remote url
			type : "GET" | "POST"
			data : {field: value, field: value, ...}
			beforeSend : function() > do something when request is ready
			success : function(data) > handle request result
			error : function() > request error
			
		$.extend(object1, object2)
			merge objects properties
			
		$.json(data) : if data is JSON : return parsed JSON, else return data
		
		$.uniq() : generate unique id (11 characters)
		
		$.isin(needle, haystack, start) // old browsers Array.indexOf method fix
			needle = search item
			haystack = array
			start = start search from start index
			returns index if found, -1 if not found