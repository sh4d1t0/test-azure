"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Request = function Request() {
    var _this = this;

    (0, _classCallCheck3.default)(this, Request);

    this.fetch = function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(configFetch) {
            var that, url, data, baseUrl, headers, response;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            that = _this, url = configFetch.url, data = configFetch.data, baseUrl = configFetch.baseUrl, headers = configFetch.headers;


                            if (typeof url !== "undefined") {
                                _this.url = url;
                            }
                            if (typeof data !== "undefined") {
                                _this.data = data;
                            }
                            if (typeof baseUrl !== "undefined") {
                                _this.baseUrl = baseUrl;
                            }
                            if (typeof headers !== "undefined") {
                                _this.headers = headers;
                            }

                            _context.prev = 5;
                            _context.next = 8;
                            return that.instance.request({
                                url: that.url,
                                method: that.method,
                                baseURL: that.baseUrl,
                                headers: that.headers,
                                params: that.params,
                                data: that.data,
                                timeout: 100000
                            });

                        case 8:
                            response = _context.sent;

                            if (!(response === null || response.data.payload === null)) {
                                _context.next = 11;
                                break;
                            }

                            throw new Error("Respuesta o payload nulo");

                        case 11:
                            return _context.abrupt("return", response.data.payload);

                        case 14:
                            _context.prev = 14;
                            _context.t0 = _context["catch"](5);
                            throw new Error(_context.t0);

                        case 17:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[5, 14]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();

    this.url = "";
    this.baseUrl = "http://10.1.44.223:8183/";
    this.method = "post";
    this.params = {};
    this.data = {};
    this.headers = { "Content-Type": "application/json" };
    this.instance = _axios2.default.create();
};

exports.default = Request;