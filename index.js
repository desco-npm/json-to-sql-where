const objectMap = require('object-map')
const quotesIfText = require('@desco/quotes-if-text')

const jsonToSqlWhere = (json = {}, operator = 'AND') => {
    if (Object.keys(json).length === 0) return '(1 = 1)'

    const string = objectMap(json, (val, key) => {
        if (typeof val !== 'object' || val.length >= 0) {
            if (typeof val !== 'object') val = [ '=', val, ]

            if (val[0] === 'IN') {
                val[1] = `(${val[1]})`
            } else {
                val[1] = quotesIfText(val[1])
            }

            return `${key} ${val[0]} ${val[1]}`
        }
        else {
            return jsonToSqlWhere(val, key)
        }
    })

    return `(${Object.values(string).join(` ${operator} `)})`
}

module.exports = jsonToSqlWhere