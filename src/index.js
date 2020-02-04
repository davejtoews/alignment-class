"use strict";

var LayoutQueue = require('layout-queue');

var AlignmentClass = (function () {

	function align(selector, tolerance, reverse = false, condition = function(){return true} ) {
        document.querySelectorAll(selector).forEach(function(parent) {
            var parentRect = parent.getBoundingClientRect();
            var children = Array.from(parent.children);
            
            if ( condition() ) {
	            children.forEach(function(child){
	            	setAlingmentClass(child, parentRect, tolerance, reverse);
	            });            	
            } else {
            	release(selector);
            }

        });    		
	}

	function setAlingmentClass(child, parentRect, tolerance, reverse) {
    	var childRect = child.getBoundingClientRect();
    	var diffLeft = childRect.left - parentRect.left;
    	var diffRight = parentRect.right - childRect.right;

    	if (!reverse) {
			if (tolerance && diffLeft >= tolerance && diffRight >= tolerance) {
                child.classList.remove('alignment-left');
                child.classList.remove('alignment-right');
                child.classList.add('alignment-center');
			} else if ( diffRight >= diffLeft ) {
                child.classList.remove('alignment-center');
                child.classList.remove('alignment-right');
                child.classList.add('alignment-left');
			} else {
                child.classList.remove('alignment-center');
                child.classList.remove('alignment-left');
                child.classList.add('alignment-right');
			}            		
    	} else { 
			if (tolerance && diffLeft >= tolerance && diffRight >= tolerance) {
                child.classList.remove('alignment-left');
                child.classList.remove('alignment-right');
                child.classList.add('alignment-center');
			} else if ( diffRight >= diffLeft ) {
                child.classList.remove('alignment-center');
                child.classList.remove('alignment-left');
                child.classList.add('alignment-right');
			} else {
                child.classList.remove('alignment-center');
                child.classList.remove('alignment-right');
                child.classList.add('alignment-left');
			}                     		
    	}
	}

	function release(selector) {
        document.querySelectorAll(selector).forEach(function(parent) {
            var children = Array.from(parent.children);
            children.forEach(function(child){
                child.classList.remove('alignment-center');
                child.classList.remove('alignment-right');
                child.classList.remove('alignment-left');
            });
        });    		
	}

	function enqueue(selector, tolerance, reverse, condition) {
		LayoutQueue.add(align, [selector, tolerance, reverse, condition]);
	}

	return {
		init: function (selector, tolerance, reverse, condition) {
			enqueue(selector, tolerance, reverse, condition);
		},
		set: function (selector, tolerance, reverse, condition) {
			align(selector, tolerance, reverse, condition);
		},
		unset: function (selector) {
			release(selector);
		}
	}

})();

module.exports = AlignmentClass;
