/*
 *********************************************************
 * Core Class
 * - Includes event system
 *********************************************************
 */

var CoreClass = Class.extend({
	/*
	 * Set the project name to give a unique name identifier for all 
	 * the global event listeners
	 */
	appName: "PROJECT",

	/*
	 * Add event listeners for talking between classes
	 */
	addEventListener: function(_eventname, _callback) {
		$(document).on(this.appName + _eventname, _callback);
	},

	/*
	 * Remove event listener
	 */
	removeEventListener: function(_eventname) {
		$(document).off(_eventname);
	},

	/*
	 * Dispatch an event - mainly used for talking between classes
	 */
	dispatchEvent: function(_eventname, _response) {
		$(document).trigger(this.appName + _eventname, _response);
	},

	/*
	 * Create an event chain based on a commonly called dispatch event
	 */
	eventChain: function(_array, _event) {
		var self = this;
		var num = 0;
		this.addEventListener(_event, function(_e, _data) {
			num += 1;
			if (num >= _array.length) return;
			_array[num](_e, _data);
		});
		_array[num]();
	}
});