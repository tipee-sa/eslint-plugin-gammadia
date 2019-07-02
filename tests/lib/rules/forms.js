/**
 * @fileoverview Rule for forms 
 * @author Lucio Merotta
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/forms"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("forms", rule, {

    valid: [
        "<Form><ModalHeader /><TranslateElement component={Button} id='tipee.cancel' color='default' outline /><TranslateElement component={Button} type='submit' /></Form>",
        "<Form><TranslateElement component={ModalHeader} /><TranslateElement component={Button} id='tipee.cancel' color='default' outline /><TranslateElement component={Button} type='submit' /></Form>"
    ],

    invalid: [
        {
            code: "<Form></Form>",
            errors: [
                {
                    message: 'Missing ModalHeader',
                    type: "JSXElement"
                },
                {
                    message: 'No button found on form',
                    type: "JSXElement"
                }
            ]
        },
        {
            code: "<Form><ModalHeader /></Form>",
            errors: [
                {
                    message: 'No button found on form',
                    type: "JSXElement"
                }
            ]
        },
        {
            code: "<Form><ModalHeader /><TranslateElement component={Button} id='test' /></Form>",
            errors: [
                {
                    message: "Submit button missing in form",
                    type: "JSXElement"
                },
                {
                    message: "First button must be a close button (outline, value equals 'tipee.cancel', color equals 'default'",
                    type: "JSXElement"
                }
            ]
        },
        {
            code: "<Form><ModalHeader /><TranslateElement component={Button} id='test' /><TranslateElement component={Button} type='submit' /></Form>",
            errors: [
                {
                    message: "First button must be a close button (outline, value equals 'tipee.cancel', color equals 'default'",
                    type: "JSXElement"
                }
            ]
        },
        {
            code: "<Form><ModalHeader /><TranslateElement component={Button} id='tipee.cancel' color='default' outline /></Form>",
            errors: [
                {
                    message: "Submit button missing in form",
                    type: "JSXElement"
                }
            ]
        }
    ]
});
