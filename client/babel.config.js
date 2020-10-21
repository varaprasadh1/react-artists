
// For users who use babel7, that can be configured in babel.config.js
module.exports = {
    plugins: [
        ['import', {
            libraryName: 'dashkit-ui',
            libraryDirectory: 'es',
            style: function (stylePath) {
                return `${stylePath}/style.scss`;
            }
        }, 'dashkit-ui']
    ]
};