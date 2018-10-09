'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('intersection-observer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Imager = function (_React$Component) {
    (0, _inherits3.default)(Imager, _React$Component);

    function Imager() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Imager);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Imager.__proto__ || (0, _getPrototypeOf2.default)(Imager)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            loaded: false

            //标识是否正在加载
        }, _this.isLoading = false, _this.load = function () {
            if (!_this.props.src) {
                return;
            }

            if (_this.isLoading) {
                return;
            }
            var img = _reactDom2.default.findDOMNode(_this.imgRef);
            var observer = new IntersectionObserver(function (entries) {
                if (entries[0].intersectionRatio > 0) {
                    var newImg = new Image();
                    _this.isLoading = true;
                    new _promise2.default(function (resolve) {
                        newImg.src = _this.props.src;
                        newImg.onload = resolve;
                    }).then(function () {
                        _this.setState({
                            loaded: true
                        });
                        if (_this.props.onload) {
                            _this.props.onload();
                        }
                    }).catch(function () {
                        if (_this.props.onFailed) {
                            _this.props.onFailed();
                        }
                    }).finally(function () {
                        _this.isLoading = false;
                        newImg = null;
                        observer.disconnect();
                    });
                }
            });
            observer.observe(img);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Imager, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.load();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                src = _props.src,
                thumbSrc = _props.thumbSrc,
                children = _props.children,
                others = (0, _objectWithoutProperties3.default)(_props, ['src', 'thumbSrc', 'children']);

            return _react2.default.createElement('img', (0, _extends3.default)({
                ref: function ref(target) {
                    return _this2.imgRef = target;
                },
                src: this.state.loaded ? src : thumbSrc ? thumbSrc : ''
            }, others));
        }
    }]);
    return Imager;
}(_react2.default.Component);

Imager.propTypes = {
    src: _propTypes2.default.string.isRequired,
    thumbSrc: _propTypes2.default.string,
    onLoad: _propTypes2.default.func,
    onFailed: _propTypes2.default.func
};
Imager.defaultProps = {
    src: '',
    thumbSrc: '',
    onLoad: function onLoad() {}
};
exports.default = Imager;