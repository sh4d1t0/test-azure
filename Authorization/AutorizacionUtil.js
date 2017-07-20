"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveToken = exports.isThereATokenValid = undefined;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isThereATokenValid = exports.isThereATokenValid = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var emailVerified, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        emailVerified = false, token = sessionStorage.getItem("token");

                        if (!(token === null)) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt("return", false);

                    case 4:
                        _context.next = 6;
                        return _axios2.default.get("https://www.googleapis.com/oauth2/v3/tokeninfo", {
                            "params": {
                                "access_token": token
                            }
                        }).then(function (response) {

                            emailVerified = response.data["email_verified"] === "true";
                        });

                    case 6:
                        return _context.abrupt("return", emailVerified);

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context["catch"](0);
                        return _context.abrupt("return", false);

                    case 12:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 9]]);
    }));

    return function isThereATokenValid() {
        return _ref.apply(this, arguments);
    };
}(),
    saveToken = exports.saveToken = function saveToken(token) {

    sessionStorage.setItem("token", token);
};