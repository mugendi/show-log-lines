# How about simplifying your logs?

When coding in Javascript, many developers have the habit of using `console.log` to track their code and test variables.

However, as the project increases in complexity and size, these logs can get lost in your code and tracing them becomes another task altogether!

This module patches the `console.log` method so that it also logs all important information about where every log is to be found.

# Usage

Install using `yarn add show-log-lines`
Then require the module at the very top of your project: `javascript require('show-log-lines');`

# Example

```javascript
// require module at the very top
require('show-log-lines')({ short: false });

// log something
console.log('Hello ' + test_function());

function test_function() {
	// log something else inside function
	console.log('Inside Test Function');
	return 'World';
}
```

## Result

The code above will output something like this

![Image](https://repository-images.githubusercontent.com/498966507/cec68530-f673-4727-b4f5-30c9ed41171c)

# Options

-   `short` : which is a boolean value. The default is **true** which prints only the line number.
-   `ignorePaths` : a glob path or list of globs from which paths this module will not decorate the logs. Example: `['**/node_modules/moleculer/**']` will ignore all logs emanating from the moleculer module. [Picomatch](https://www.npmjs.com/package/picomatch) is used to match globs so check out their readme.

-   `utilInspect` : an object containing values to be passed to `util.inspect()` method. The default is :

    `{ depth: 4, showHidden: false, colors: true, compact: true }`
