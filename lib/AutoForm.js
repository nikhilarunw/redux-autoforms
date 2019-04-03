'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoFormInternal = require('./AutoFormInternal');

var _AutoFormInternal2 = _interopRequireDefault(_AutoFormInternal);

var _MetadataProvider = require('./metadata/MetadataProvider');

var _MetadataProvider2 = _interopRequireDefault(_MetadataProvider);

var _MetadataValidator = require('./metadata/validator/MetadataValidator');

var _MetadataValidator2 = _interopRequireDefault(_MetadataValidator);

var _ModelParser = require('./metadata/model/ModelParser');

var _ModelParser2 = _interopRequireDefault(_ModelParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoForm = function (_Component) {
    _inherits(AutoForm, _Component);

    function AutoForm() {
        _classCallCheck(this, AutoForm);

        return _possibleConstructorReturn(this, (AutoForm.__proto__ || Object.getPrototypeOf(AutoForm)).apply(this, arguments));
    }

    _createClass(AutoForm, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                uiType = _props.uiType,
                schema = _props.schema,
                entityName = _props.entityName,
                layoutName = _props.layoutName,
                componentFactory = _props.componentFactory,
                errorRenderer = _props.errorRenderer,
                buttonBar = _props.buttonBar,
                fieldLayout = _props.fieldLayout;
            var _props2 = this.props,
                form = _props2.form,
                onSubmit = _props2.onSubmit,
                onSubmitSuccess = _props2.onSubmitSuccess,
                onSubmitFail = _props2.onSubmitFail,
                alwaysAsyncValidate = _props2.alwaysAsyncValidate,
                destroyOnUnmount = _props2.destroyOnUnmount,
                formKey = _props2.formKey,
                initialValues = _props2.initialValues,
                overwriteOnInitialValuesChange = _props2.overwriteOnInitialValuesChange,
                readonly = _props2.readonly,
                returnRejectedSubmitPromise = _props2.returnRejectedSubmitPromise,
                touchOnBlur = _props2.touchOnBlur,
                touchOnChange = _props2.touchOnChange;


            try {
                schema = _MetadataProvider2.default.canonizeSchema(schema); // This will allow for flexible schema definition (arrays vs. objects)

                var _MetadataProvider$get = _MetadataProvider2.default.getEntityAndLayout(schema, entityName, layoutName),
                    entity = _MetadataProvider$get.entity,
                    layout = _MetadataProvider$get.layout;

                var fieldMetadata = _MetadataProvider2.default.getFields(schema, entity, layout, function (f) {
                    f.componentFactory = componentFactory;
                    f.fieldLayout = fieldLayout;
                });

                var fields = _MetadataProvider2.default.getReduxFormFields(fieldMetadata);

                var validate = function validate(values) {
                    var modelParsed = _ModelParser2.default.process(values, fieldMetadata);
                    return _MetadataValidator2.default.validate(fieldMetadata, modelParsed, modelParsed) || {};
                };

                var autoFormProps = {
                    uiType: uiType,
                    fields: fields,
                    fieldMetadata: fieldMetadata,
                    entity: entity,
                    layout: layout,
                    validate: validate,
                    componentFactory: componentFactory,
                    buttonBar: buttonBar,
                    fieldLayout: fieldLayout
                };

                var reduxFormProps = {
                    form: form,
                    onSubmit: onSubmit,
                    onSubmitSuccess: onSubmitSuccess,
                    onSubmitFail: onSubmitFail,
                    alwaysAsyncValidate: alwaysAsyncValidate,
                    destroyOnUnmount: destroyOnUnmount,
                    formKey: formKey,
                    initialValues: initialValues,
                    overwriteOnInitialValuesChange: overwriteOnInitialValuesChange,
                    readonly: readonly,
                    returnRejectedSubmitPromise: returnRejectedSubmitPromise,
                    touchOnBlur: touchOnBlur,
                    touchOnChange: touchOnChange
                };

                // we need to delete all undefined reduxFormProps specifically because overwriteOnInitialValuesChange cannot
                // be undefined, otherwise it triggers this errors:
                //  Failed prop type: Required prop `overwriteOnInitialValuesChange` was not specified in `ReduxForm(AutoFormInternal)`.
                for (var property in reduxFormProps) {
                    if (reduxFormProps.hasOwnProperty(property)) {
                        if (reduxFormProps[property] === undefined) {
                            delete reduxFormProps[property];
                        }
                    }
                }

                return _react2.default.createElement(_AutoFormInternal2.default, _extends({}, autoFormProps, reduxFormProps));
            } catch (ex) {
                return errorRenderer ? errorRenderer(ex) : _react2.default.createElement(
                    'div',
                    null,
                    ' ',
                    ex.message,
                    ' '
                );
            }
        }
    }]);

    return AutoForm;
}(_react.Component);

AutoForm.propTypes = {
    uiType: _propTypes2.default.string,
    componentFactory: _propTypes2.default.object,
    schema: _propTypes2.default.object.isRequired,
    entityName: _propTypes2.default.string,
    layoutName: _propTypes2.default.string,
    errorRenderer: _propTypes2.default.func,
    buttonBar: _propTypes2.default.func.isRequired,
    fieldLayout: _propTypes2.default.string,

    // Redux-Form props
    form: _propTypes2.default.string.isRequired,
    onSubmit: _propTypes2.default.func.isRequired,
    onSubmitSuccess: _propTypes2.default.func,
    onSubmitFail: _propTypes2.default.func,
    alwaysAsyncValidate: _propTypes2.default.bool,
    destroyOnUnmount: _propTypes2.default.bool,
    formKey: _propTypes2.default.string,
    initialValues: _propTypes2.default.object,
    overwriteOnInitialValuesChange: _propTypes2.default.bool,
    readonly: _propTypes2.default.bool,
    returnRejectedSubmitPromise: _propTypes2.default.bool,
    touchOnBlur: _propTypes2.default.bool,
    touchOnChange: _propTypes2.default.bool
};
exports.default = AutoForm;
module.exports = exports['default'];