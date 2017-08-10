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

var _class, _temp, _initialiseProps;

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
        (0, _classCallCheck3.default)(this, Authorization);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Authorization.__proto__ || Object.getPrototypeOf(Authorization)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.handleLoginFailure = _this.handleLoginFailure.bind(_this);
        _this.handleLoginSuccess = _this.handleLoginSuccess.bind(_this);

        _this.state = {
            loading: false
        };
        var _this$props = _this.props,
            email = _this$props.email,
            isSandbox = _this$props.isSandbox;


        if (isSandbox && email === null || typeof email === "undefined") {
            console.error("Email de prueba no válido");
        }
        return _this;
    }

    return Authorization;
}(_react.Component), _class.propTypes = {
    logo: _propTypes2.default.string,
    isSandbox: _propTypes2.default.bool,
    email: _propTypes2.default.string,
    onSuccess: _propTypes2.default.func.isRequired,
    onFailure: _propTypes2.default.func.isRequired
}, _class.defaultProps = {
    isSandbox: true,
    email: "juan.crisostomo@sngular.team"
}, _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.handleLoginFailure = function (response) {
        var onFailure = _this2.props.onFailure;

        onFailure(response);
    };

    this.handleLoginSuccess = function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(response) {
            var accessToken, profileObj, _props, onSuccess, isSandbox, onFailure, email, capabilities, correo;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            accessToken = response.accessToken, profileObj = response.profileObj, _props = _this2.props, onSuccess = _props.onSuccess, isSandbox = _props.isSandbox, onFailure = _props.onFailure, email = _props.email;
                            _context.prev = 1;
                            capabilities = void 0, correo = profileObj.email;


                            if (isSandbox) {
                                correo = email;
                            }
                            _this2.setState({ loading: true });

                            _context.next = 7;
                            return new _AutorizacionApi2.default().validar(correo);

                        case 7:
                            capabilities = _context.sent;


                            (0, _AutorizacionUtil.saveToken)(accessToken);
                            onSuccess(capabilities);
                            _context.next = 15;
                            break;

                        case 12:
                            _context.prev = 12;
                            _context.t0 = _context["catch"](1);

                            onFailure(_context.t0);

                        case 15:
                            _context.prev = 15;

                            _this2.setState({ loading: false });
                            return _context.finish(15);

                        case 18:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this2, [[1, 12, 15, 18]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();

    this.render = function () {
        var logo = _this2.props.logo,
            loading = _this2.state.loading;


        return _react2.default.createElement(
            "div",
            { className: "row" },
            _react2.default.createElement(_RequestProgress2.default, {
                message: "Validando usuario",
                open: loading
            }),
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
                        { className: "row", style: { marginTop: "50px" } },
                        _react2.default.createElement(
                            "div",
                            { className: "col-xs-12 text-center" },
                            _react2.default.createElement(_reactGoogleLogin2.default, {
                                clientId: GOOGLE_ID,
                                buttonText: "Entrar con correo interno",
                                onSuccess: _this2.handleLoginSuccess,
                                onFailure: _this2.handleLoginFailure
                            })
                        )
                    )
                )
            )
        );
    };
}, _temp);
exports.default = Authorization;