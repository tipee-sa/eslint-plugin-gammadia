/**
 * @fileoverview Ensures formik&#39;s validationSchemas are actually functions
 * @author Lucio Merotta
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/validationschema-function"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("validationschema-function", rule, {

    valid: [
        "withFormik({ test: true, validationSchema: () => yup.object() })",
        "withFormik({ test: true, validationSchema: function() { return yup.object }, dummy: 'test' })",
        "const test = () => yup.object().shape; withFormik({ validationSchema: test })"
    ],

    invalid: [
        {
            code: "withFormik({ validationSchema: yup.object().shape() })",
            errors: [{
                message: "Formik\'s validationSchema must be a function",
                type: "CallExpression"
            }],
            output: "withFormik({ validationSchema: /* istanbul ignore next */() => yup.object().shape() })"
        },
        {
            code: "const test = yup.object().shape; withFormik({ validationSchema: test })",
            errors: [{
                message: "Formik\'s validationSchema must be a function",
                type: "MemberExpression"
            }],
            output: "const test = /* istanbul ignore next */() => yup.object().shape; withFormik({ validationSchema: test })"
        }
    ]
});
