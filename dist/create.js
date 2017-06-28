'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _contentTypes = require('./contentTypes');

var _contentTypes2 = _interopRequireDefault(_contentTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var handleResponse = function handleResponse(call) {
  return call.then(function (response) {
    return response.text();
  }).then(function (text) {
    if (text === '') {
      return {};
    }
    return JSON.parse(text);
  });
};

var Rest = function () {
  function Rest() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Rest);

    this.headers = {
      'Content-Type': _contentTypes2.default.json
    };

    if ('headers' in options) {
      this.headers = this.mergeHeaders(options.headers);
    }

    if ('handleResponse' in options) {
      this.handleResponse = options.handleResponse;
    } else {
      this.handleResponse = handleResponse;
    }
  }

  _createClass(Rest, [{
    key: 'mergeHeaders',
    value: function mergeHeaders(headers) {
      return _extends({}, this.headers, headers);
    }
  }, {
    key: 'get',
    value: function get(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var getUrl = params ? url + '?' + _queryString2.default.stringify(params) : url;
      return this.handleResponse((0, _isomorphicFetch2.default)(getUrl, {
        headers: this.mergeHeaders(headers)
      }));
    }
  }, {
    key: 'post',
    value: function post(url, body) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.handleResponse((0, _isomorphicFetch2.default)(url, {
        method: 'POST',
        headers: this.mergeHeaders(headers),
        body: JSON.stringify(body)
      }));
    }
  }, {
    key: 'patch',
    value: function patch(url, body) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.handleResponse((0, _isomorphicFetch2.default)(url, {
        method: 'PATCH',
        headers: this.mergeHeaders(headers),
        body: JSON.stringify(body)
      }));
    }
  }]);

  return Rest;
}();

exports.default = function (options) {
  return new Rest(options);
};