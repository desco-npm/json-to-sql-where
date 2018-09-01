const objectMap = require('object-map')
const quotesIfText = require('@desco/quotes-if-text')

const jsonToSqlWhere = (json = {}, operator = 'AND') => {
    const string = objectMap(json, (val, key) => {
        if (typeof val !== 'object') {
            return `${key} = ${quotesIfText(val)}`
        }
        else {
            return jsonToSqlWhere(val, key)
        }
    })

    return `(${Object.values(string).join(` ${operator} `)})`
}

module.exports = jsonToSqlWhere