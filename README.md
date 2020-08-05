# jsonToSqlWhere

Este pacote permite transformar um **JSON** em uma estrutura SQL WHERE!

## Instalação

`npm i @desco/json-to-sql-where --save`

Note que será necessário ter o **NPM** instalado para o comando funcionar.

## Importação

### Node

`const jsonToSqlWhere = require('@desco/json-to-sql-where')`

### Browse

`import jsonToSqlWhere from '@desco/json-to-sql-where`

## Como usar

### **AND** somente

Vamos começar pelo uso mais simples possível, uma situação onde desejamos apenas verificar se colunas são iguais a valores:

**Código:** 
```
jsonToSqlWhere({ nome: 'Rafael Dias', nascimento: '03/07/1986', })
```

**Resultado:** 
```
`nome = "Rafael Dias" AND nascimento = "03/07/1986"`
```

Neste caso simples, basta criarmos um **JSON** contendo pares de coluna/valor que o pacote irá automaticamente comverter tudo com o operador **AND**.

### Mais Operadores Condicionais (**AND**, **OR** e **XOR**)

Mas não só de **AND** é feito uma uma **SQL**, não é mesmo?

Também podemos utilizar os operadores condicionais **OR** e **XOR** simplesmente agrupando no nosso **JSON**, veja:

**Código:** 

```
const result2 = jsonToSqlWhere({
  AND: { nome: 'Rafael Dias', nascimento: '03/07/1986', },
  OR: { pais: 'Brasil', genero: 'M', },
  XOR: { signo: 'Câncer', idade: 34, },
})
```

**Resultado:** 
```
(nome = "Rafael Dias" AND nascimento = "03/07/1986")  AND  (pais = "Brasil" OR genero = "M")  AND  (signo = "Câncer" XOR idade = 34) 
```

Note que desta forma, cada um dos operadores foi agrupado entre parênteses.

### Operador condicional detro de operador condicional

Já vimos como utilizar outros operadores condicionais, porém ainda não conseguimos misturar eles...

Ainda! Nada nos impede de criar um agrupamento de operadores condicionais dentro de outro agrupamento, veja:

**Código:**
```
jsonToSqlWhere({
  OR: {
    idade: 34,
    nome: 'Rafael Dias',
    AND: {
      signo: 'Câncer',
      nascimento: '03/07/1986',
    },
  },
})
```

**Resultado:**
```
(idade = 34 OR nome = "Rafael Dias" OR  (signo = "Câncer" AND nascimento = "03/07/1986") )
```

Dessa forma definimos operador condicional **OR** e dentro dele um subconjunto com operador condicional **AND**!

### Tipos

Até aqui vimos como montar nossas condições com os **operadores condicionais**, porém apenas eles não são capazes de nos dar toda a dinâmica necessária.

Para isso precisaos ser capazes de utilizar os **operadores comuns** também, tais como *=*, *!=",  e etc. Para isso, podemos transformar nossos valores em objetos mais detalhados, veja:

**Código:**
```
jsonToSqlWhere({
  nome: { type: '=', value: 'Rafael Dias', },
  signo: { type: '!=', value: 'Gêmeos', },
  idade: { type: '>=', value: '18', },
})
```

**Resultado:**
```
nome = "Rafael Dias" AND signo != "Gêmeos" AND idade >= 18
```

Básicamente você pode por em **type** absolutamente qualquer coisa queira no lugar do símbolo de igual, além disso você também pode trocar por alguns valores pré-estabelecidos para fazer uso de recursos do **MySQL**.

Por exemplo, se você deseja verificar se um valor esta entre dois outros valores, podemos utilizar o **BETWEEN**:

**Código:**
```
jsonToSqlWhere({
  idade: { type: 'BETWEEN', value: [ 9, 34, ], },
})
```

**Resultado:**
```
idade BETWEEN 9 AND 34
```

Note que neste caso, o valor informado precisa ser um **Array** contendo o menor e maior valor respectivamente.

Também pode desejar verificar se um valor consta em uma lista de valores, para isso usamos o **IN**, veja:

**Código:**
```
jsonToSqlWhere({
  plataforma: {
    type: 'IN',
    value: [ 'Origin', 'Steam', 'XBox', 'PS', 'Mobile', ],
  },
})
```

**Resultado:**
```
plataforma IN ("Origin","Steam","XBox","PS","Mobile")
```

Note que neste caso o valor deve ser um **Array** contendo todos os valores possíveis.