"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayPalButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PayPalButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PayPalButton, _React$Component);

  function PayPalButton(props) {
    var _this;

    _classCallCheck(this, PayPalButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PayPalButton).call(this, props));
    _this.state = {
      isSdkReady: false
    };
    return _this;
  }

  _createClass(PayPalButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof window !== "undefined" && window !== undefined && window.paypal === undefined) {
        this.addPaypalSdk();
      } else if (typeof window !== "undefined" && window !== undefined && window.paypal !== undefined && this.props.onButtonReady) {
        this.props.onButtonReady();
      }
    }
  }, {
    key: "createOrder",
    value: function createOrder(data, actions) {
      var _this$props = this.props,
          currency = _this$props.currency,
          options = _this$props.options,
          amount = _this$props.amount,
          shippingPreference = _this$props.shippingPreference;
      return actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: currency ? currency : options && options.currency ? options.currency : "USD",
            value: amount.toString()
          }
        }],
        application_context: {
          shipping_preference: shippingPreference
        }
      });
    }
  }, {
    key: "onApprove",
    value: function onApprove(data, actions) {
      var _this2 = this;

      return actions.order.capture().then(function (details) {
        if (_this2.props.onSuccess) {
          return _this2.props.onSuccess(details, data);
        }
      })["catch"](function (err) {
        if (_this2.props.catchError) {
          return _this2.props.catchError(err);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          amount = _this$props2.amount,
          onSuccess = _this$props2.onSuccess,
          createOrder = _this$props2.createOrder,
          createSubscription = _this$props2.createSubscription,
          onApprove = _this$props2.onApprove,
          style = _this$props2.style;
      var isSdkReady = this.state.isSdkReady;

      if (!isSdkReady && (typeof window === "undefined" || window.paypal === undefined)) {
        return null;
      }

      var Button = window.paypal.Buttons.driver("react", {
        React: _react["default"],
        ReactDOM: _reactDom["default"]
      });
      var createOrderFn = amount && !createOrder ? function (data, actions) {
        return _this3.createOrder(data, actions);
      } : function (data, actions) {
        return createOrder(data, actions);
      };
      return _react["default"].createElement(Button, _extends({}, this.props, {
        createOrder: createSubscription ? undefined : createOrderFn,
        createSubscription: createSubscription,
        onApprove: onSuccess ? function (data, actions) {
          return _this3.onApprove(data, actions);
        } : function (data, actions) {
          return onApprove(data, actions);
        },
        style: style
      }));
    }
  }, {
    key: "addPaypalSdk",
    value: function addPaypalSdk() {
      var _this4 = this;

      var _this$props3 = this.props,
          options = _this$props3.options,
          onButtonReady = _this$props3.onButtonReady;
      var queryParams = []; // replacing camelCase with dashes

      Object.keys(options).forEach(function (k) {
        var name = k.split(/(?=[A-Z])/).join("-").toLowerCase();
        queryParams.push("".concat(name, "=").concat(options[k]));
      });
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://www.paypal.com/sdk/js?".concat(queryParams.join("&"));
      script.async = true;

      script.onload = function () {
        _this4.setState({
          isSdkReady: true
        });

        if (onButtonReady) {
          onButtonReady();
        }
      };

      script.onerror = function () {
        throw new Error("Paypal SDK could not be loaded.");
      };

      document.body.appendChild(script);
    }
  }]);

  return PayPalButton;
}(_react["default"].Component);

exports.PayPalButton = PayPalButton;

_defineProperty(PayPalButton, "propTypes", {
  amount: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  currency: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  shippingPreference: _propTypes["default"].string,
  onSuccess: _propTypes["default"].func,
  catchError: _propTypes["default"].func,
  onError: _propTypes["default"].func,
  createOrder: _propTypes["default"].func,
  createSubscription: _propTypes["default"].func,
  onApprove: _propTypes["default"].func,
  style: _propTypes["default"].object,
  options: _propTypes["default"].shape({
    clientId: _propTypes["default"].string,
    merchantId: _propTypes["default"].string,
    currency: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    intent: _propTypes["default"].string,
    commit: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
    vault: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
    component: _propTypes["default"].string,
    disableFunding: _propTypes["default"].string,
    disableCard: _propTypes["default"].string,
    integrationDate: _propTypes["default"].string,
    locale: _propTypes["default"].string,
    buyerCountry: _propTypes["default"].string,
    debug: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string])
  }),
  onButtonReady: _propTypes["default"].func
});

_defineProperty(PayPalButton, "defaultProps", {
  style: {},
  options: {
    clientId: "sb",
    currency: "USD"
  },
  shippingPreference: "GET_FROM_FILE"
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiUGF5UGFsQnV0dG9uIiwicHJvcHMiLCJzdGF0ZSIsImlzU2RrUmVhZHkiLCJ3aW5kb3ciLCJ1bmRlZmluZWQiLCJwYXlwYWwiLCJhZGRQYXlwYWxTZGsiLCJvbkJ1dHRvblJlYWR5IiwiZGF0YSIsImFjdGlvbnMiLCJjdXJyZW5jeSIsIm9wdGlvbnMiLCJhbW91bnQiLCJzaGlwcGluZ1ByZWZlcmVuY2UiLCJvcmRlciIsImNyZWF0ZSIsInB1cmNoYXNlX3VuaXRzIiwiY3VycmVuY3lfY29kZSIsInZhbHVlIiwidG9TdHJpbmciLCJhcHBsaWNhdGlvbl9jb250ZXh0Iiwic2hpcHBpbmdfcHJlZmVyZW5jZSIsImNhcHR1cmUiLCJ0aGVuIiwiZGV0YWlscyIsIm9uU3VjY2VzcyIsImVyciIsImNhdGNoRXJyb3IiLCJjcmVhdGVPcmRlciIsImNyZWF0ZVN1YnNjcmlwdGlvbiIsIm9uQXBwcm92ZSIsInN0eWxlIiwiQnV0dG9uIiwiQnV0dG9ucyIsImRyaXZlciIsIlJlYWN0IiwiUmVhY3RET00iLCJjcmVhdGVPcmRlckZuIiwicXVlcnlQYXJhbXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImsiLCJuYW1lIiwic3BsaXQiLCJqb2luIiwidG9Mb3dlckNhc2UiLCJwdXNoIiwic2NyaXB0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsInNyYyIsImFzeW5jIiwib25sb2FkIiwic2V0U3RhdGUiLCJvbmVycm9yIiwiRXJyb3IiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJzdHJpbmciLCJmdW5jIiwib25FcnJvciIsIm9iamVjdCIsInNoYXBlIiwiY2xpZW50SWQiLCJtZXJjaGFudElkIiwiaW50ZW50IiwiY29tbWl0IiwiYm9vbCIsInZhdWx0IiwiY29tcG9uZW50IiwiZGlzYWJsZUZ1bmRpbmciLCJkaXNhYmxl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RWhCLHNCQUFVRyxNQWxCRjtBQW1CckJjLElBQUFBLGVBQWUsRUFBRWpCLHNCQUFVRyxNQW5CTjtBQW9CckJlLElBQUFBLE1BQU0sRUFBRWxCLHNCQUFVRyxNQXBCRztBQXFCckJnQixJQUFBQSxZQUFZLEVBQUVuQixzQkFBVUcsTUFyQkg7QUFzQnJCaUIsSUFBQUEsS0FBSyxFQUFFcEIsc0JBQVVDLFNBQVYsQ0FBb0IsQ0FDdkJELHNCQUFVWSxJQURhLEVBRXZCWixzQkFBVUcsTUFGYSxDQUFwQjtBQXRCYyxHQUFoQixDQWpCTTtBQTRDZnpELEVBQUFBLGFBQWEsRUFBRXNELHNCQUFVSTtBQTVDVixDOztnQkFEakJsRSxZLGtCQWdEb0I7QUFDbEJnQyxFQUFBQSxLQUFLLEVBQUUsRUFEVztBQUVsQnBCLEVBQUFBLE9BQU8sRUFBRTtBQUNMMEQsSUFBQUEsUUFBUSxFQUFFLElBREw7QUFFTDNELElBQUFBLFFBQVEsRUFBRTtBQUZMLEdBRlM7QUFNbEJHLEVBQUFBLGtCQUFrQixFQUFFO0FBTkYsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICBpbnRlcmZhY2UgV2luZG93IHsgcGF5cGFsOiBhbnkgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBheVBhbEJ1dHRvblByb3BzIHtcbiAgICBhbW91bnQ/OiBudW1iZXJ8c3RyaW5nLFxuICAgIGN1cnJlbmN5PzogbnVtYmVyfHN0cmluZyxcbiAgICBzaGlwcGluZ1ByZWZlcmVuY2U/OiBcIk5PX1NISVBQSU5HXCIgfCBcIkdFVF9GUk9NX0ZJTEVcIiB8IFwiU0VUX1BST1ZJREVEX0FERFJFU1NcIixcbiAgICBvblN1Y2Nlc3M/OiBGdW5jdGlvbixcbiAgICBjYXRjaEVycm9yPzogRnVuY3Rpb24sXG4gICAgb25FcnJvcj86IEZ1bmN0aW9uLFxuICAgIGNyZWF0ZU9yZGVyPzogRnVuY3Rpb24sXG4gICAgY3JlYXRlU3Vic2NyaXB0aW9uPzogRnVuY3Rpb24sXG4gICAgb25BcHByb3ZlPzogRnVuY3Rpb24sXG4gICAgc3R5bGU/OiBvYmplY3QsXG4gICAgb3B0aW9ucz86IFBheXBhbE9wdGlvbnMsXG4gICAgb25CdXR0b25SZWFkeT86IEZ1bmN0aW9uLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBheVBhbEJ1dHRvblN0YXRlIHtcbiAgICBpc1Nka1JlYWR5OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5cGFsT3B0aW9ucyB7XG4gICAgY2xpZW50SWQ/OiBzdHJpbmcsXG4gICAgbWVyY2hhbnRJZD86IHN0cmluZyxcbiAgICBjdXJyZW5jeT86IG51bWJlcnxzdHJpbmcsXG4gICAgaW50ZW50Pzogc3RyaW5nLFxuICAgIGNvbW1pdD86IGJvb2xlYW58c3RyaW5nLFxuICAgIHZhdWx0PzogYm9vbGVhbnxzdHJpbmcsXG4gICAgY29tcG9uZW50Pzogc3RyaW5nLFxuICAgIGRpc2FibGVGdW5kaW5nPzogc3RyaW5nLFxuICAgIGRpc2FibGVDYXJkPzogc3RyaW5nLFxuICAgIGludGVncmF0aW9uRGF0ZT86IHN0cmluZyxcbiAgICBsb2NhbGU/OiBzdHJpbmcsXG4gICAgYnV5ZXJDb3VudHJ5Pzogc3RyaW5nLFxuICAgIGRlYnVnPzogYm9vbGVhbnxzdHJpbmdcbn1cblxuY2xhc3MgUGF5UGFsQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFBheVBhbEJ1dHRvblByb3BzLCBQYXlQYWxCdXR0b25TdGF0ZT4ge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGFtb3VudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgXSksXG4gICAgICAgIGN1cnJlbmN5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBdKSxcbiAgICAgICAgc2hpcHBpbmdQcmVmZXJlbmNlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBvblN1Y2Nlc3M6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBjYXRjaEVycm9yOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25FcnJvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGNyZWF0ZU9yZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgY3JlYXRlU3Vic2NyaXB0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25BcHByb3ZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9wdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICBjbGllbnRJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIG1lcmNoYW50SWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBjdXJyZW5jeTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgICAgICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBpbnRlbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBjb21taXQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmdcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgdmF1bHQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgICAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmdcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgY29tcG9uZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgZGlzYWJsZUZ1bmRpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBkaXNhYmxlQ2FyZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGludGVncmF0aW9uRGF0ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGJ1eWVyQ291bnRyeTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGRlYnVnOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgICAgICBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nXG4gICAgICAgICAgICBdKVxuICAgICAgICB9KSxcbiAgICAgICAgb25CdXR0b25SZWFkeTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjbGllbnRJZDogXCJzYlwiLFxuICAgICAgICAgICAgY3VycmVuY3k6IFwiVVNEXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2hpcHBpbmdQcmVmZXJlbmNlOiBcIkdFVF9GUk9NX0ZJTEVcIixcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogUGF5UGFsQnV0dG9uUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBpc1Nka1JlYWR5OiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgd2luZG93ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHdpbmRvdy5wYXlwYWwgPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuYWRkUGF5cGFsU2RrKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB3aW5kb3cgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgd2luZG93LnBheXBhbCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQnV0dG9uUmVhZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQnV0dG9uUmVhZHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZU9yZGVyKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSB7XG5cbiAgICAgICAgY29uc3QgeyBjdXJyZW5jeSwgb3B0aW9ucywgYW1vdW50LCBzaGlwcGluZ1ByZWZlcmVuY2UgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgcmV0dXJuIGFjdGlvbnMub3JkZXIuY3JlYXRlKHtcbiAgICAgICAgICBwdXJjaGFzZV91bml0czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhbW91bnQ6IHtcbiAgICAgICAgICAgICAgICBjdXJyZW5jeV9jb2RlOiBjdXJyZW5jeVxuICAgICAgICAgICAgICAgICAgPyBjdXJyZW5jeVxuICAgICAgICAgICAgICAgICAgOiBvcHRpb25zICYmIG9wdGlvbnMuY3VycmVuY3lcbiAgICAgICAgICAgICAgICAgID8gb3B0aW9ucy5jdXJyZW5jeVxuICAgICAgICAgICAgICAgICAgOiBcIlVTRFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBhbW91bnQudG9TdHJpbmcoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBhcHBsaWNhdGlvbl9jb250ZXh0OiB7XG4gICAgICAgICAgICBzaGlwcGluZ19wcmVmZXJlbmNlOiBzaGlwcGluZ1ByZWZlcmVuY2VcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uQXBwcm92ZShkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkge1xuICAgICAgICByZXR1cm4gYWN0aW9ucy5vcmRlclxuICAgICAgICAgICAgLmNhcHR1cmUoKVxuICAgICAgICAgICAgLnRoZW4oKGRldGFpbHMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25TdWNjZXNzKGRldGFpbHMsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmNhdGNoRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2F0Y2hFcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgYW1vdW50LFxuICAgICAgICAgICAgb25TdWNjZXNzLFxuICAgICAgICAgICAgY3JlYXRlT3JkZXIsXG4gICAgICAgICAgICBjcmVhdGVTdWJzY3JpcHRpb24sXG4gICAgICAgICAgICBvbkFwcHJvdmUsXG4gICAgICAgICAgICBzdHlsZSxcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHsgaXNTZGtSZWFkeSB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhaXNTZGtSZWFkeSAmJlxuICAgICAgICAgICAgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgd2luZG93LnBheXBhbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgQnV0dG9uID0gd2luZG93LnBheXBhbC5CdXR0b25zLmRyaXZlcihcInJlYWN0XCIsIHtcbiAgICAgICAgICAgIFJlYWN0LFxuICAgICAgICAgICAgUmVhY3RET00sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZU9yZGVyRm4gPVxuICAgICAgICAgICAgYW1vdW50ICYmICFjcmVhdGVPcmRlclxuICAgICAgICAgICAgICAgID8gKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiB0aGlzLmNyZWF0ZU9yZGVyKGRhdGEsIGFjdGlvbnMpXG4gICAgICAgICAgICAgICAgOiAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IGNyZWF0ZU9yZGVyKGRhdGEsIGFjdGlvbnMpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgY3JlYXRlT3JkZXI9e2NyZWF0ZVN1YnNjcmlwdGlvbiA/IHVuZGVmaW5lZCA6IGNyZWF0ZU9yZGVyRm59XG4gICAgICAgICAgICAgICAgY3JlYXRlU3Vic2NyaXB0aW9uPXtjcmVhdGVTdWJzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgb25BcHByb3ZlPXtcbiAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkgPT4gdGhpcy5vbkFwcHJvdmUoZGF0YSwgYWN0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiBvbkFwcHJvdmUoZGF0YSwgYWN0aW9ucylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFBheXBhbFNkaygpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zLCBvbkJ1dHRvblJlYWR5IH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCBxdWVyeVBhcmFtczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICAvLyByZXBsYWNpbmcgY2FtZWxDYXNlIHdpdGggZGFzaGVzXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goayA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gay5zcGxpdCgvKD89W0EtWl0pLykuam9pbihcIi1cIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goYCR7bmFtZX09JHtvcHRpb25zW2tdfWApO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICBzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG4gICAgICAgIHNjcmlwdC5zcmMgPSBgaHR0cHM6Ly93d3cucGF5cGFsLmNvbS9zZGsvanM/JHtxdWVyeVBhcmFtcy5qb2luKFwiJlwiKX1gO1xuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzU2RrUmVhZHk6IHRydWUgfSk7XG5cbiAgICAgICAgICAgIGlmIChvbkJ1dHRvblJlYWR5KSB7XG4gICAgICAgICAgICAgICAgb25CdXR0b25SZWFkeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBheXBhbCBTREsgY291bGQgbm90IGJlIGxvYWRlZC5cIik7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IFBheVBhbEJ1dHRvbiB9O1xuIl19