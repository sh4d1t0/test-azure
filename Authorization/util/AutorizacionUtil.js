"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveToken = exports.isThereATokenValid = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isThereATokenValid = exports.isThereATokenValid = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var emailVerified, response, token, instance;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        emailVerified = void 0, response = void 0, token = sessionStorage.getItem("token");

                        if (!(token === null)) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt("return", false);

                    case 4:
                        instance = _axios2.default.create();
                        _context.next = 7;
                        return instance.request({
                            url: "/oauth2/v3/tokeninfo",
                            method: "get",
                            baseURL: "https://www.googleapis.com/",
                            params: {
                                access_token: token
                            },
                            timeout: 100000
                        });

                    case 7:
                        response = _context.sent;


                        emailVerified = response.data["email_verified"] === "true";

                        return _context.abrupt("return", emailVerified);

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context["catch"](0);
                        return _context.abrupt("return", false);

                    case 15:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 12]]);
    }));

    return function isThereATokenValid() {
        return _ref.apply(this, arguments);
    };
}(),
    saveToken = exports.saveToken = function saveToken(token) {
    sessionStorage.setItem("token", token);
};