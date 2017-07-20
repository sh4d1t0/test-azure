"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _Card = require("material-ui/Card");

var _Card2 = _interopRequireDefault(_Card);

var _Subheader = require("material-ui/Subheader");

var _Subheader2 = _interopRequireDefault(_Subheader);

var _List = require("material-ui/List");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListCard = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(ListCard, _Component);

    function ListCard(props, context) {
        (0, _classCallCheck3.default)(this, ListCard);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ListCard.__proto__ || Object.getPrototypeOf(ListCard)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.handleOnChangeSelected = _this.handleOnChangeSelected.bind(_this);

        var defaultSelected = _this.props.defaultSelected;

        _this.state = { "itemSelected": defaultSelected };

        return _this;
    }

    return ListCard;
}(_react.Component), _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.handleOnChangeSelected = function (index) {
        var onTouchTap = _this2.props.onTouchTap;


        _this2.setState({ "itemSelected": index });
        onTouchTap(index);
    };

    this.render = function () {
        var _props = _this2.props,
            collection = _props.collection,
            title = _props.title,
            selectable = _props.selectable,
            _props$styleContainer = _props.styleContainer,
            styleContainer = _props$styleContainer === undefined ? {
            "overflowY": "auto",
            "height": "400px"
        } : _props$styleContainer,
            itemSelected = _this2.state.itemSelected;


        if (!(collection instanceof Array)) {

            collection = [];
        }

        var getItems = function getItems() {

            return collection.map(function (item, index) {

                var props = {
                    "key": "list-item-" + index,
                    "primaryText": item
                };

                if (selectable) {

                    props.onTouchTap = function () {

                        _this2.handleOnChangeSelected(index);
                    };

                    if (itemSelected === index) {

                        props.style = { "textTransform": "capitalize" };
                        props.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
                    }
                }

                return _react2.default.createElement(_List.ListItem, props);
            });
        };

        return _react2.default.createElement(
            _Card2.default,
            { style: { "margin": "12px" } },
            _react2.default.createElement(
                _List.List,
                { style: styleContainer },
                _react2.default.createElement(
                    _Subheader2.default,
                    null,
                    title
                ),
                getItems()
            )
        );
    };
}, _temp);


ListCard.propTypes = {
    "collection": _propTypes2.default.array.isRequired,
    "onTouchTap": _propTypes2.default.func.isRequired,
    "styleContainer": _propTypes2.default.object,
    "selectable": _propTypes2.default.bool,
    "defaultSelected": _propTypes2.default.number,
    "title": _propTypes2.default.string.isRequired
};

ListCard.defaultProps = {
    "selectable": false,
    "defaultSelected": -1
};

exports.default = ListCard;