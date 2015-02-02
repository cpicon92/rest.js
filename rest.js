var RestCallback = function() {
	this.callback = function(){};
	this.error = function(){};
};
RestCallback.prototype.done = function(callback) {
	this.callback = callback;
	return this;
};
RestCallback.prototype.err = function(error) {
	this.error = error;
	return this;
};
var Rest = function(apiUrl) {
	this.apiUrl = apiUrl;
};
Rest.prototype._ajax = function(method, resource, data, cb) {
	var req;
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
	} else {
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	req.onreadystatechange = function() {
		if (req.readyState === 4) {
			var res = req.responseText;
			if (req.status >= 200 && req.status < 300) {
				if (req.getResponseHeader("Content-type") === "application/json") {
					res = JSON.parse(res);
				}
				if (cb) cb.callback(res);
			} else {
				if (cb) cb.error(req.status, res);
			}
		}
	}
	req.open(method, this.apiUrl + resource, true);
	if (method === "POST" || method === "PUT") {
		if (data instanceof File) {
			var type = data.type;
			if (data.overrideType) {
				type = data.overrideType;
			}
			req.setRequestHeader("Content-type", type);
		} else if (typeof data !== "string" && typeof data !== "number") {
			req.setRequestHeader("Content-type", "application/json");
			data = JSON.stringify(data);
		} else {
			req.setRequestHeader("Content-type", "text/plain");
		}
	}
	req.send(data);
};
Rest.prototype.get = function(resource) {
	var cb = new RestCallback();
	this._ajax("GET", resource, null, cb);
	return cb;
};
Rest.prototype.post = function(resource, data) {
	var cb = new RestCallback();
	this._ajax("POST", resource, data, cb);
	return cb;
};
Rest.prototype.delete = function(resource) {
	var cb = new RestCallback();
	this._ajax("DELETE", resource, null, cb);
	return cb;
};
Rest.prototype.put = function(resource, data) {
	var cb = new RestCallback();
	this._ajax("PUT", resource, data, cb);
	return cb;
};
