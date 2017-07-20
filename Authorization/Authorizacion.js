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

var _class, _temp;

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

var _AutorizacionUtil = require("./util/AutorizacionUtil");

var _RequestProgress = require("../RequestProgress/RequestProgress");

var _RequestProgress2 = _interopRequireDefault(_RequestProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GOOGLE_ID = "40613802827-p776g33c1hgr7i1i52kd58sn14afqrck.apps.googleusercontent.com";

var Authorization = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Authorization, _Component);

    function Authorization(props, context) {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, Authorization);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Authorization.__proto__ || Object.getPrototypeOf(Authorization)).call(this, props, context));

        _this.handleLoginFailure = function (response) {
            var onFailure = _this.props.onFailure;

            onFailure(response);
        };

        _this.handleLoginSuccess = function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(response) {
                var accessToken, profileObj, _this$props, onSuccess, isDevelopment, onFailure, capabilities, email;

                return _regenerator2.default.wrap(function _callee$(_context) {
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
}(_react.Component), _class.propTypes = {
    "logo": _propTypes2.default.string,
    "isDevelopment": _propTypes2.default.bool,
    "onSuccess": _propTypes2.default.func.isRequired,
    "onFailure": _propTypes2.default.func.isRequired
}, _class.defaultProps = {
    "isDevelopment": true
}, _temp);
exports.default = Authorization;
;