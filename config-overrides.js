const { addBabelPlugins, override } = require('customize-cra')
module.exports = override(...addBabelPlugins('module:@preact/signals-react-transform'))
