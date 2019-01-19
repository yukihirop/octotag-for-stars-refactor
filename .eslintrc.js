module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": ["eslint:recommended", "plugin:jest/recommended"],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "globals": {
        "jQuery": true,
        "chrome": true
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "semi": [
            "error",
            "never"
        ],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
    },
    "plugins": ["jest"]
};