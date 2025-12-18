/*
 * @FileDesc: Eslint React 配置
 */

/** CONST: 基础配置 */
const baseConfig = require("./base.cjs")

module.exports = {
    ...baseConfig,
    overrides: [
        ...baseConfig.overrides,
        // #region CODE: react 配置
        {
            files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
            extends: ["plugin:react-hooks/recommended"]
        }
        // #endregion
    ]
}
