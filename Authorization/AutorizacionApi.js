"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Request2 = require("../util/Request");

var _Request3 = _interopRequireDefault(_Request2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutorizacionApi = function (_Request) {
    _inherits(AutorizacionApi, _Request);

    function AutorizacionApi() {
        var _this2 = this;

        _classCallCheck(this, AutorizacionApi);

        var _this = _possibleConstructorReturn(this, (AutorizacionApi.__proto__ || Object.getPrototypeOf(AutorizacionApi)).call(this));

        _this.validar = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(email) {
                var response, username;
                return regeneratorRuntime.wrap(function _callee$(_context) {
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