# eslint-plugin-eslint-gammadia

Gammadia&#39;s ESLint rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-gammadia`:

```
$ npm install eslint-plugin-eslint-gammadia --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-eslint-gammadia` globally.

## Usage

Add `gammadia` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "gammadia"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "gammadia/no-react-router-navlink": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





