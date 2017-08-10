"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveToken = exports.isThereATokenValid = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _AutorizacionApi = require("../AutorizacionApi");

var _AutorizacionApi2 = _interopRequireDefault(_AutorizacionApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isThereATokenValid = exports.isThereATokenValid = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(email) {
        var response, token, userValid, instance;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        response = void 0, token = sessionStorage.getItem("token"), userValid = void 0;

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

                        userValid = response.data["email_verified"] === "true";
                        _context.next = 11;
                        return new _AutorizacionApi2.default().validar(email ? email : response.data.email);

                    case 11:
                        response = _context.sent;
                        return _context.abrupt("return", (0, _extends3.default)({
                            userValid: userValid
                        }, response));

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context["catch"](0);
                        return _context.abrupt("return", {
                            userValid: false,
                            perfiles: []
                        });

                    case 18:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 15]]);
    }));

    return function isThereATokenValid(_x) {
        return _ref.apply(this, arguments);
    };
}(),
    saveToken = exports.saveToken = function saveToken(token) {
    sessionStorage.setItem("token", token);
};