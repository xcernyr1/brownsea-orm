export var mockRequest = {
    post: function (url, opts, cb) {
        cb(null, null, null);
    },
    defaults: function () {
        return this;
    },
    jar: () => {
        return this;
    }
}