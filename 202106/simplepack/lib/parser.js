// 转换ast、
const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')

module.exports = {
    getAST: (path) => {
        const source = fs.readFileSync(path, 'utf-8')

        return babylon.parse(source, {
            sourceType: 'module'
        })
    },
    // 依赖获取
    getDependencies: (ast)=> {
        const dependencies = []
        traverse(ast, {
            ImportDeclaration: ({node}) => {
                dependencies.push(node.source.value)
            }
        })
        return dependencies
    },
    // ast转换为源码
    transform: (ast) => {
        const {code} = transformFromAst(ast, null, {
            presets: ['env']
        })
        return code
    }

}
