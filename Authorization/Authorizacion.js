"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactGoogleLogin = require("react-google-login");

var _reactGoogleLogin2 = _interopRequireDefault(_reactGoogleLogin);

var _AutorizacionApi = require("./AutorizacionApi");

var _AutorizacionApi2 = _interopRequireDefault(_AutorizacionApi);

var _Container = require("../Container/Container");

var _Container2 = _interopRequireDefault(_Container);

var _AutorizacionUtil = require("./AutorizacionUtil");

var _RequestProgress = require("../RequestProgress/RequestProgress");

var _RequestProgress2 = _interopRequireDefault(_RequestProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GOOGLE_ID = "40613802827-p776g33c1hgr7i1i52kd58sn14afqrck.apps.googleusercontent.com";

var Authorization = function (_Component) {
    _inherits(Authorization, _Component);

    function Authorization(props, context) {
        var _this2 = this;

        _classCallCheck(this, Authorization);

        var _this = _possibleConstructorReturn(this, (Authorization.__proto__ || Object.getPrototypeOf(Authorization)).call(this, props, context));

        _this.handleLoginFailure = function (response) {
            var onFailure = _this.props.onFailure;

            onFailure(response);
        };

        _this.handleLoginSuccess = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(response) {
                var accessToken, profileObj, _this$props, onSuccess, isDevelopment, onFailure, capabilities, email;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                accessToken = response.accessToken, profileObj = response.profileObj, _this$props = _this.props, onSuccess = _this$props.onSuccess, isDevelopment = _this$props.isDevelopment, onFailure = _this$props.onFailure;


                                (0, _AutorizacionUtil.saveToken)(accessToken);

                                _context.prev = 2;
                                capabilities = void 0, email = profileObj.email;


                                if (isDevelopment) {

                                    email = "alopezavil@independencia.com.mx";
                                }
                                _this.setState({ "loading": true });
                                _context.next = 8;
                                return new _AutorizacionApi2.default().validar(email);

                            case 8:
                                capabilities = _context.sent;

                                _this.setState({ "loading": false });
                                onSuccess(capabilities);

                                _context.next = 16;
                                break;

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context["catch"](2);


                                onFailure(_context.t0);

                            case 16:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this2, [[2, 13]]);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }();

        _this.render = function () {
            var logo = _this.props.logo,
                loading = _this.state.loading;


            return _react2.default.createElement(
                "div",
                { className: "row" },
                _react2.default.createElement(_RequestProgress2.default, {
                    message: "Validando usuario",
                    open: loading }),
                _react2.default.createElement(
                    "div",
                    { className: "col-xs-12 col-md-4 col-md-offset-4" },
                    _react2.default.createElement(
                        _Container2.default,
                        null,
                        _react2.default.createElement(
                            "div",
                            { className: "row" },
                            _react2.default.createElement(
                                "div",
                                { className: "col-xs-12 text-center" },
                                logo && _react2.default.createElement("img", { src: logo })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "row", style: { "marginTop": "50px" } },
                            _react2.default.createElement(
                                "div",
                                { className: "col-xs-12 text-center" },
                                _react2.default.createElement(_reactGoogleLogin2.default, {
                                    clientId: GOOGLE_ID,
                                    buttonText: "Entrar con correo interno",
                                    onSuccess: _this.handleLoginSuccess,
                                    onFailure: _this.handleLoginFailure })
                            )
                        )
                    )
                )
            );
        };

        _this.handleLoginFailure = _this.handleLoginFailure.bind(_this);
        _this.handleLoginSuccess = _this.handleLoginSuccess.bind(_this);

        _this.state = {
            "loading": false
        };

        return _this;
    }

    return Authorization;
}(_react.Component);

Authorization.propTypes = {
    "logo": _propTypes2.default.string,
    "isDevelopment": _propTypes2.default.bool,
    "onSuccess": _propTypes2.default.func.isRequired,
    "onFailure": _propTypes2.default.func.isRequired
};
Authorization.defaultProps = {
    "isDevelopment": true
};
exports.default = Authorization;
;