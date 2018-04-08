export default {
	baseURL: process.env.BASE_URL,
	headers: {'Content-Type':'application/json','sessionkey': ''},
	onUploadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},
	onDownloadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},
	maxContentLength: 2000,
	validateStatus: function (status) {
	    return status >= 200 && status < 300; // default
	}
}
