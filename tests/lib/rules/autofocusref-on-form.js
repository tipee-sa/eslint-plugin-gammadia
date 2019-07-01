/**
 * @fileoverview Forces to use a useAutoFocusRef on every form 
 * @author Lucio Merotta
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/autofocusref-on-form"),

    RuleTester = require("eslint").RuleTester;

    RuleTester.setDefaultConfig({
        parserOptions: {
          sourceType: "module",
          ecmaVersion: 6,
          ecmaFeatures: {
            jsx: true,
          },
        }
      });

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("autofocusref-on-form", rule, {

    valid: [
        "import { autoFocusRef } from 'core/hooks'; () => { const ref = useAutoFocusRef(); return (<Form><input type=\"text\" innerRef={ref} /><button>submit</button></Form>); }",
        "import { autoFocusRef } from 'core/hooks'; () => { return (<Form><input type=\"text\" innerRef={useAutoFocusRef()} /><button>submit</button></Form>); }",
        "import { autoFocusRef } from 'core/hooks'; () => { return (<form><input type=\"text\" innerRef={useAutoFocusRef()} /><button>submit</button></form>); }",
        "import { autoFocusRef } from 'core/hooks'; () => { const ref = useAutoFocusRef(); return (<form><input type=\"text\" innerRef={ref} /><button>submit</button></form>); }",
        "import { autoFocusRef } from 'core/hooks'; () => { const ref = useAutoFocusRef(); return (<Form><input type=\"text\" ref={ref} /><button>submit</button></Form>); }",
        "import { autoFocusRef } from 'core/hooks'; () => { return (<Form><input type=\"text\" ref={useAutoFocusRef()} /><button>submit</button></Form>); }",
        "import { autoFocusRef } from 'core/hooks'; () => { return (<form><input type=\"text\" ref={useAutoFocusRef()} /><button>submit</button></form>); }",
        "import { autoFocusRef } from 'core/hooks'; () => { const ref = useAutoFocusRef(); return (<form><input type=\"text\" ref={ref} /><button>submit</button></form>); }",
        "import { autoFocusRef } from 'core/hooks'; () => { const ref = useAutoFocusRef(); return (<form><Dummy>{() => (<input type=\"text\" ref={ref} />)}</Dummy><button>submit</button></form>); }"

    ],

    invalid: [
        {
            code: "import { useAutoFocusRef } from 'core/hooks'; () => (<Form><input type=\"text\" /><button>submit</button></Form>);",
            errors: [{
                message: "Missing useAutoFocusRef() on one element in this form",
                type: "JSXElement"
            }]
        },
        {
            code: "import { useAutoFocusRef } from 'core/hooks'; () => (<form><input type=\"text\" /><button>submit</button></form>);",
            errors: [{
                message: "Missing useAutoFocusRef() on one element in this form",
                type: "JSXElement"
            }]
        },
        {
            code: "import { autoFocusRef } from 'core/hooks'; () => { const ref = useAutoFocusRef(); return (<form><Dummy>{() => (<input type=\"text\" />)}</Dummy><button>submit</button></form>); }",
            errors: [{
                message: "Missing useAutoFocusRef() on one element in this form",
                type: "JSXElement"
            }]
        }
    ]
});
