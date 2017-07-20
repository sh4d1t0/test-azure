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

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _Request2 = require("../util/Request");

var _Request3 = _interopRequireDefault(_Request2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutorizacionApi = function (_Request) {
    (0, _inherits3.default)(AutorizacionApi, _Request);

    function AutorizacionApi() {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, AutorizacionApi);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AutorizacionApi.__proto__ || Object.getPrototypeOf(AutorizacionApi)).call(this));

        _this.validar = function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(email) {
                var response, username;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return _this.fetch({
                                    "url": "cxf/seguridad/autorizacion/consultarUsuarioEmail",
                                    "baseUrl": "http://10.1.44.86:8182/",
                                    "data": {
                                        email: email
                                    }
                                });

                            case 3:
                                response = _context.sent;
                                username = response.claveUsuario;

                                if (!(response === null)) {
                                    _context.next = 7;
                                    break;
                                }

                                throw new Error("El correo no es válido");

                            case 7:
                                _context.next = 9;
                                return _this.fetch({
                                    "url": "cxf/empleados/rest/buscarActivos",
                                    "data": {
                                        "usuario": username
                                    }
                                });

                            case 9:
                                response = _context.sent;

                                if (!(response.length === 0)) {
                                    _context.next = 12;
                                    break;
                                }

                                throw new Error("El usuario no está activo");

                            case 12:
                                _context.next = 14;
                                return _this.fetch({
                                    "url": "cxf/seguridad/autorizacion/consultarUsuarios",
                                    "data": {
                                        "claveUsuario": username,
                                        "facultades": [{}],
                                        "perfiles": [{}]
                                    }
                                });

                            case 14:
                                response = _context.sent;

                                if (!(response.length === 0)) {
                                    _context.next = 17;
                                    break;
                                }

                                throw new Error("No hay facultades y perfiles para este usuario");

                            case 17:
                                return _context.abrupt("return", {
                                    "perfiles": response[0].perfiles,
                                    "facultades": response[0].facultades
                                });

                            case 20:
                                _context.prev = 20;
                                _context.t0 = _context["catch"](0);
                                throw new Error(_context.t0);

                            case 23:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this2, [[0, 20]]);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }();

        return _this;
    }

    return AutorizacionApi;
}(_Request3.default);

exports.default = AutorizacionApi;