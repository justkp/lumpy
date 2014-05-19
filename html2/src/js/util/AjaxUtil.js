/*
 *********************************************************
 * Ajax Util
 * - Use this for all your Ajax calls
 * - llows you to setup defaults for all your Ajax calls
 *********************************************************
 */
var AjaxUtil = {
	type: "GET",
	dataType: "json",
	timeout: 30000, 

	getData: function(_params) {
		var self = this;
		var response = null;
		
		if (!_params.url){
			console.log("AjaxUtil Error: Missing URL param");
			return;
		}
		
		$.ajax({
			type: _params.type || this.type,
			url: _params.url,
			data: _params.data || null,
			dataType: _params.dataType || this.dataType,
			timeout: this.timeout,
			success: function(data) {
				response = data;
			},
			error: function(data) {
				console.log("AjaxUtil Error: " + data);
				response = data;
				if (_params.error)
					_params.error(response, self); 
			},
			complete: function() {
				_params.callback(response, self);
			}
		});
	}
};
