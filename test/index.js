require('jsdom-global')();
var assert = require('chai').assert;
var AlignmentClass = require('../dist/main.js');

describe('AlignmentClass', function() {
	document.body.innerHTML = '<ul><li>one</li><li>two</li><li>three</li></ul>';
	
	var parent = document.querySelector('ul');
	var children = document.querySelectorAll('li');

	function setBoundingClientRect(element, left, right) {
		element.getBoundingClientRect = function() {
			return {
				left: left,
				right: right
			}
		}
	}

	it('should set alignment class', function() {
		setBoundingClientRect(parent, 0, 100);
		setBoundingClientRect(children[0], 10, 20);
		setBoundingClientRect(children[1], 45, 55);
		setBoundingClientRect(children[2], 80, 90);

		AlignmentClass.set('ul');

		assert.equal(document.body.innerHTML, '<ul><li class="alignment-left">one</li><li class="alignment-left">two</li><li class="alignment-right">three</li></ul>');		
	});
	it('should unset alignment', function() {
		AlignmentClass.unset('ul');
		assert.equal(document.body.innerHTML, '<ul><li class="">one</li><li class="">two</li><li class="">three</li></ul>');		
	});
	it('should set alignment class with respect to tolerance', function() {

		AlignmentClass.set('ul', 20);
		assert.equal(document.body.innerHTML, '<ul><li class="alignment-left">one</li><li class="alignment-center">two</li><li class="alignment-right">three</li></ul>');		
	});
	it('should set alignment class on resize', function() {
		setBoundingClientRect(parent, 100, 200);
		setBoundingClientRect(children[0], 140, 150);
		setBoundingClientRect(children[1], 180, 190);
		setBoundingClientRect(children[2], 110, 120);

		AlignmentClass.init('ul', 30);
		window.dispatchEvent(new Event('resize'));

		assert.equal(document.body.innerHTML, '<ul><li class="alignment-center">one</li><li class="alignment-right">two</li><li class="alignment-left">three</li></ul>');		
	});
	it('should set alignment class in reverse', function() {
		setBoundingClientRect(parent, 0, 100);
		setBoundingClientRect(children[0], 10, 20);
		setBoundingClientRect(children[1], 45, 55);
		setBoundingClientRect(children[2], 80, 90);

		AlignmentClass.set('ul', null, true);

		assert.equal(document.body.innerHTML, '<ul><li class="alignment-right">one</li><li class="alignment-right">two</li><li class="alignment-left">three</li></ul>');		
	});
	it('should take conditions', function() {
		var condition = function() {
			return false;
		}
		AlignmentClass.unset('ul');
		AlignmentClass.set('ul', null, null, condition);
		assert.equal(document.body.innerHTML, '<ul><li class="">one</li><li class="">two</li><li class="">three</li></ul>');
	});

});