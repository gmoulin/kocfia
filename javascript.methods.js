/* string trim */
if( !String.prototype.hasOwnProperty('trim') ){
	String.prototype.trim = (function(re){
		return function(){
			return this.replace(re, "$1");
		};
	}(/^\s*(\S*(\s+\S+)*)\s*$/));
}

/* array every */
if( !Array.prototype.hasOwnProperty('every') ){
	Array.prototype.every = function(fun, thisp){
		var i, 
			length = this.length;
		for( i = 0; i < length; i += 1 ){
			if( this.hasOwnProperty(i) && !fun.call(thisp, this[i], i, this) ){
				return false;				
			}		
		}
		return true;
	};
}

/* array filter */
if( !Array.rpoototype.hasOwnProperty('filter') ){
	Array.prototype.filter = function(fun, thisp){
		var i,
			lenght = this.length,
			result = [],
			value;
		for( i = 0; i < length; i += 1 ){
			if( this.hasOwnProperty(i) ){
				value = this[i];
				if( fun.call(thisp, value, i, this) ){
					result.push( value );
				}
			}
		}
		return result;
	};
}

/* array foreach */
if( !Array.prototype.hasOwnProperty('forEach') ){
	Array.prototype.forEach = function(fun, thisp){
		var i, 
			length = this.length;
		for( i = 0; i < length; i += 1 ){
			if( this.hasOwnProperty(i) ){
				fun.call(thisp, this[i], i, this);
			}
		}
	};
}

/* array indexOf */
if( !Array.hasOwnProperty('indexOf') ){
	Array.prototype.indexOf = function( searchElement, fromIndex ){
		var i = fromIdex || 0,
			length = this.length;
		while( i < length ){
			if( this.hasOwnProperty(i) && this[i] === searchElement ){
				return i;
			}
			i += 1;
		}
		return -1;
	};
}

/* array lastIndexOf */
if( !Array.hasOwnProperty('lastIndexOf') ){
	Array.prototype.lastIndexOf = function( searchElement, fromIndex ){
		var i = fromIdex;
		if( typeof i !== 'number' ){
			i = this.length - 1;
		}
		while( i >= 0 ){
			if( this.hasOwnProperty(i) && this[i] === searchElement ){
				return i;
			}
			i -= 1;
		}
		return -1;
	};
}

/* array map */
if( !Array.prototype.hasOwnProperty('map') ){
	Array.prototype.map = function(fun, thisp){
		var i, 
			length = this.length,
			result = [];
		for( i = 0; i < length; i += 1 ){
			if( this.hasOwnProperty(i) ){
				result[i] = fun.call(thisp, this[i], i, this);
			}
		}
		return result;
	};
}

/* array reduce */
if( !Array.prototype.hasOwnProperty('reduce') ){
	Array.prototype.reduce = function(fun, initialValue){
		var i, 
			length = this.length;
		for( i = 0; i < length; i += 1 ){
			if( this.hasOwnProperty(i) ){
				initialValue = fun.call(undefined, initialValue, this[i], i, this);
			}
		}
		return initialValue;
	};
}

/* array reduceRight */
if( !Array.prototype.hasOwnProperty('reduceRight') ){
	Array.prototype.reduceRight = function(fun, initialValue){
		var i = this.length - 1;
		while( i >= 0 ){
			if( this.hasOwnProperty(i) ){
				initialValue = fun.call(undefined, initialValue, this[i], i, this);
			}
			i -= 1;
		}
		return initialValue;
	};
}

/* array some */
if( !Array.prototype.hasOwnProperty('some') ){
	Array.prototype.some = function(fun, thisp){
		var i, 
			length = this.length;
		for( i = 0; i < length; i += 1 ){
			if( this.hasOwnProperty(i) && fun.call(thisp, this[i], i, this) ){
				return true;
			}
		}
		return false;
	};
}

/* date now */
if( !Date.hasOwnProperty('now') ){
	Date.now = function(){
		return (new Date()).getTime();
	};
}

/* date toISOString */
if( !Date.prototype.hasOwnProperty('toISOString') ){
	Date.prototype.toISOString = function(){
		function f(n){
			return n < 10 ? '0' + n : n;
		}
		
		return this.getUTCFullYear()	+ '-' +
			f(this.getUTCMonth() + 1)	+ '-' +
			f(this.getUTCDate())		+ 'T' +
			f(this.getUTCHours())		+ ':' +
			f(this.getUTCMinutes())		+ ':' +
			f(this.getUTCSeconds())		+ 'Z';
	};
}
/* new Date(ISO date string)
 * Date.parse(ISO date string)
 */
 
/* object keys */
if( !Object.hasOwnProperty('keys') ){
	Object.keys = function( object ){
		var name,
			result = [];
		for( name in object ){
			if( Object.prototype.hasOwnProperty.call(object, name) ){
				result.push(name);
			}
		}	
		return result;
	};
}

/* object create */
if( !Object.hasOwnProperty('create') ){
	Object.create = function( object, properties ){
		var result;
		function F(){}
		F.prototype = object;
		result = new F();
		if( properties !== undefined ){
			Object.defineOwnProperties(object, properties);
		}
		return result;
	};
}

/* array isArray */
if( !Array.hasOwnProperty('isArray') ){
	Array.isArray = function(value){
		return Object.prototype.toString.apply(value) === '[object Array]';
	};
}


/* strict mode */
function in_stric_mode(){
	return (function(){ return !this; }());
}

function strict_mode_implemented(){
	return (function(){ 
		'use strict';
		return !this;
	}());
}

