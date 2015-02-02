# rest.js
An extremely simple Javascript library for interacting with RESTful web 
services that has no dependencies. It does automatic marshalling and 
unmarshalling of Javascript objects and JSON documents, and supports 
file uploads as well. 

## Usage

```javascript
var rest = new Rest("/api");

//make PUT request (to URL "/api/resource")
rest.put("resource", {"something": "hello"})

//make GET request
rest.get("resource").done(function(resource) {
	//responded with 20x, you now have access to the resource
}).err(function(code, message) {
	//responded with error code
});

//upload file with POST
var input = document.querySelector("input[type=file]"),
file = input.files[0];
//set the the overrideType property on the file to change the Content-type header
file.overrideType = "application/json";
api.post("resource", file).done(function() {
	//file contents have been posted
}).err(function(code, message) {
	//responded with error code
});
```
