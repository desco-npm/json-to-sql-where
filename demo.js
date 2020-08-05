const jsonToSqlWhere = require('./index')

// const result1 = jsonToSqlWhere({ nome: 'Rafael Dias', nascimento: '03/07/1986', })
// console.log(result1)

// const result2 = jsonToSqlWhere({
//   AND: { nome: 'Rafael Dias', nascimento: '03/07/1986', },
//   OR: { pais: 'Brasil', genero: 'M', },
//   XOR: { signo: 'Câncer', idade: 34, },
// })
// console.log(result2)

// const result3 = jsonToSqlWhere({
//   OR: {
//     idade: 34,
//     nome: 'Rafael Dias',
//     AND: {
//       signo: 'Câncer',
//       nascimento: '03/07/1986',
//     },
//   },
// })

// console.log(result3)

const result4 = jsonToSqlWhere({
  nome: { type: '=', value: 'Rafael Dias', },
  signo: { type: '!=', value: 'Gêmeos', },
  idade: { type: '>=', value: '18', },
})

console.log(result4)

// const result5 = jsonToSqlWhere({
//   idade: { type: 'BETWEEN', value: [ 9, 34, ], },
// })

// console.log(result5)

// const result6 = jsonToSqlWhere({
//   plataforma: { type: 'IN', value: [ 'Origin', 'Steam', 'XBox', 'PS', 'Mobile', ], },
// })

// console.log(result6)