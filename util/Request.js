"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function Request() {
    var _this = this;

    _classCallCheck(this, Request);

    this.fetch = function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(configFetch) {
            var that, url, data, baseUrl, response;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            that = _this, url = configFetch.url, data = configFetch.data, baseUrl = configFetch.baseUrl;


                            if (typeof url !== "undefined") {

                                _this.url = url;
                            }
                            if (typeof data !== "undefined") {

                                _this.data = data;
                            }
                            if (typeof baseUrl !== "undefined") {

                                _this.baseUrl = baseUrl;
                            }

                            _context.prev = 4;
                            _context.next = 7;
                            return that.instance.request({
                                "url": that.url,
                                "method": that.method,
                                "baseURL": that.baseUrl,
                                "headers": that.headers,
                                "params": that.params,
                                "data": that.data,
                                "timeout": 100000
                            });

                        case 7:
                            response = _context.sent;

                            if (!(response === null || response.data.payload === null)) {
                                _context.next = 10;
                                break;
                            }

                            throw new Error("Respuesta o payload nulo");

                        case 10:
                            return _context.abrupt("return", response.data.payload);

                        case 13:
                            _context.prev = 13;
                            _context.t0 = _context["catch"](4);
                            throw new Error(_context.t0);

                        case 16:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[4, 13]]);
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