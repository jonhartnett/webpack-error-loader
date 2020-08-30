## Webpack Error Loader
The webpack error loader allows a file to be turned into a transpilation error.
This is useful, for example, for preventing unintentional inclusion of backend files 
in the frontend bundle.

### Installation
```shell script
npm install -D webpack-error-loader
```

### Options
Options are passed to the loader via the [options](https://webpack.js.org/configuration/module/#useentry) property.
The following options are supported.
* `message` The error message to emit. Can be one of the following types:
    * `string` A constant string to use as the message.
    * `function` A function to generate the message. 
        Called with `this` bound to the [Loader Context](https://webpack.js.org/api/loaders/#the-loader-context)
        and the arguments from the loader. Returns a `string` to use as the error message, or `null` to skip throwing 
        an error.
* `type` (default `'error'`) Controls the type of exception to emit. One of the following:
    * `'error'` Stops compilation with an error
    * `'warning'` Emits a warning and continues compilation as a passthrough
    * `'weak-error'` Emits an error and continues compilation as a passthrough

### Usage
Webpack Documentation: [Rules](https://webpack.js.org/configuration/module/#modulerules).
##### Simple Usage
```js
module.exports = {
    //...
    module: {
        rules: [
            //...
            {
                include: `${__dirname}/src/backend/`,
                loader: {
                    loader: 'webpack-error-loader',
                    options: {
                        message: 'Sandbox: cannot import backend file from frontend'
                    }
                }
            }
        ]
    }
    //...
};
```
    
##### Advanced Usage
Displays resource and issuer in the error message.
```js
module.exports = {
    //...
    module: {
        rules: [
            //...
            {
                include: `${__dirname}/src/backend/`,
                loader: info => ({
                    loader: 'webpack-error-loader',
                    options: {
                        message: `Sandbox: cannot import '${info.resource}' from '${info.issuer}'`
                    }
                })
            }
        ]
    }
    //...
};
```


### License
[MIT](./LICENSE)
