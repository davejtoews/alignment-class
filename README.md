# Alignment Class

This library can be used to dynamically ensure all child elements of a given CSS selector are assinged a class according to their position relative to their parent. On page-load the elements' positions are measured, elements nearest the left edge of thier parent get the class "alignment-left", elements nearest the right edge of their parent get the class "alingment-right", and if a tolerance value is provided elements further than the tolerance value from either edge get the class "alignment-center". On a window resize (or orientation change on mobile) the positions are measured again and the classes reset to accomodate any shift in layout caused by the change in window size.

Additional triggers can be added via [LayoutQueue](https://github.com/davejtoews/layout-queue).

##  Installation

Install via npm or yarn.

    npm install align-to-sides

OR

	yarn add align-to-sides

Then require this module within your javascript:

    var AlignmentClass = require('align-to-sides');

## Basic Use

The methods of AlignmentClass all use standard CSS selectors, (e.g. 'p', '.class', '#id'). To align the children of a element or set of elements, pass the selector to `init()`:

    AlignmentClass.init(selector);

A tolerance value in pixels can be added as a second parameter to set any child elements a class of `alignment-center` if they are further than the given pixel value from either side. Without a tolerance value, all children will be text-aligned either right or left.

    AlignmentClass.init(selector, tolerance);

A third boolean parameter can be added to reverse the orientation, and align elements to the center rather than the sides. This parameter will default to `false`.

    var reverse = true;
    AlignmentClass.init(selector, tolerance, reverse);

A condition passed as a function can be added as a fourth parameter, allowing for a conditional applicaiton of the alignment.

	var condition = function () { return false }
	AlignmentClass.init(selector, tolerance, reverse, condition);

## Advanced use

To manually unset alignment class of an elements children use `unset()`:

	AlignmentClass.unset(selector);

To manually set the alignment class of an elements children use 'set()';

    AlignmentClass.set(selector);

To add additional triggers for the execution of the queue see the documentation for [LayoutQueue](https://github.com/davejtoews/layout-queue);