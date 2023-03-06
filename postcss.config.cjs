// postcss.config.js
// 用vite创建项目，配置post.config.js
// 具体配置查看 postcss-pxtorem 仓库查看文档
module.exports = {
    "plugins": {
        "postcss-pxtorem": {
            rootValue: 37.5, //配置rem单位字体尺寸
            propList: ['*'],
            selectorBlackList:['.norem'] //过滤棒.norem-开头的class不进行rem转换
        }
    }
}