const isArray = require('is-array')
const objectMap = require('object-map')
const quotesIfText = require('@desco/quotes-if-text')

const jsonToSqlWhere = (_json = {}, _operator = 'AND') => {
    const conditions = []

    objectMap(_json, (v, k) => {
        if ([ 'AND', 'OR', 'XOR', ].indexOf(k) === -1) {
            if (typeof v === 'string') {
                v = { type: '=', value: v, }
            }

            if (typeof v.value === 'string') {
                v.value = quotesIfText(v.value)
            }
            else if (isArray(v.value)) {
                v.value = v.value.map(v => `( ${quotesIfText(v)} )`).join(', ')
            }

            conditions.push(`${k} ${v.type} ${v.value}`)
        }
        else {
            conditions.push(` (${jsonToSqlWhere(v, k)}) `)
        }
    })

    console.log(conditions.join(` ${_operator} `))
    return conditions.join(` ${_operator} `)
}

module.exports = jsonToSqlWhere