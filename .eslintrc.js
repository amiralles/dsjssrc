module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
			"no-console":0,
			"no-constant-condition":0,
			"callback-return":2,
			"global-require" :2,
			"camelcase":2,
			"semi":2,
    }
};
