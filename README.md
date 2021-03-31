<div align="right">
  <a href="README.US.md">
    <img alt="Read in American English" src="https://img.shields.io/static/v1?label=&message=Read+in+American+English&color=red&style=for-the-badge" />
  </a>
</div>

<table>
  <tr>
    <td><img src="https://i.ibb.co/qCk0rmM/json-to-sql-where.png"></td>
    <td>  
      <h1>@desco/json-to-sql-where</h1>
      Converte dados em um JSON para uma condição "WHERE" SQL.
      <br /><br />
      <div align="center">
        <img alt="Licença MIT" src="https://img.shields.io/static/v1?label=Licen%C3%A7a&message=MIT&color=green&style=for-the-badge">
        <img alt="Versão 2.1.3" src="https://img.shields.io/static/v1?label=Vers%C3%A3o&message=2.1.3&color=blue&style=for-the-badge">
      </div>
      <h4 align="center"> 
        🚀 Pronto para uso! 🚀
      </h4>
    </td>
  </tr>
</table>

> <a href="https://github.com/desco-npm" target="_blank">Veja outros projetos NPM aqui.</a>

> <a href="https://github.com/descoifica" target="_blank">Veja outros projetos aqui.</a>

---

## 📋 Tabela de conteúdos

- [⚙️ Instalação](#Instalação)
- [📦 Importação](#Importação)
- [📚 Como Usar](#Como-Usar)

---

<a name="Instalação"></a>

## ⚙️ Instalação

```bash
npm install --save @desco/json-to-sql-where
```

> Note que será necessário ter o **NPM** instalado para o comando funcionar.

---

<a name="Importação"></a>

## 📦 Importação

### Node

```js
const jsonToSqlWhere = require("@desco/json-to-sql-where");
```

### Browse

```js
import jsonToSqlWhere from "@desco/json-to-sql-where";
```

---

<a name="Como-Usar"></a>

## 📚 Como Usar

### **AND** somente

Vamos começar pelo uso mais simples possível, uma situação onde desejamos apenas verificar se colunas são iguais a valores:

```js
jsonToSqlWhere({ nome: "Rafael Dias", nascimento: "03/07/1986" }); // `nome = "Rafael Dias" AND nascimento = "03/07/1986"`
```

Neste caso simples, basta criarmos um **JSON** contendo pares de coluna/valor que o pacote irá automaticamente comverter tudo com o operador **AND**.

### Mais Operadores Condicionais (**AND**, **OR** e **XOR**)

Mas não só de **AND** é feito uma uma **SQL**, não é mesmo?

Também podemos utilizar os operadores condicionais **OR** e **XOR** simplesmente agrupando no nosso **JSON**, veja:

```js
const result2 = jsonToSqlWhere({
  AND: { nome: "Rafael Dias", nascimento: "03/07/1986" },
  OR: { pais: "Brasil", genero: "M" },
  XOR: { signo: "Câncer", idade: 34 },
}); // (nome = "Rafael Dias" AND nascimento = "03/07/1986")  AND  (pais = "Brasil" OR genero = "M")  AND  (signo = "Câncer" XOR idade = 34)
```

Note que desta forma, cada um dos operadores foi agrupado entre parênteses.

### Operador condicional dentro de operador condicional

Já vimos como utilizar outros operadores condicionais, porém ainda não conseguimos misturar eles...

Ainda! Nada nos impede de criar um agrupamento de operadores condicionais dentro de outro agrupamento, veja:

```js
jsonToSqlWhere({
  OR: {
    idade: 34,
    nome: "Rafael Dias",
    AND: {
      signo: "Câncer",
      nascimento: "03/07/1986",
    },
  },
}); // (idade = 34 OR nome = "Rafael Dias" OR  (signo = "Câncer" AND nascimento = "03/07/1986") )
```

Dessa forma definimos operador condicional **OR** e dentro dele um subconjunto com operador condicional **AND**!

### Tipos

Até aqui vimos como montar nossas condições com os **operadores condicionais**, porém apenas eles não são capazes de nos dar toda a dinâmica necessária.

Para isso precisaos ser capazes de utilizar os **operadores comuns** também, tais como _=_, _!=_, e etc. Para isso, podemos transformar nossos valores em objetos mais detalhados, veja:

```js
jsonToSqlWhere({
  nome: { type: "=", value: "Rafael Dias" },
  signo: { type: "!=", value: "Gêmeos" },
  idade: { type: ">=", value: "18" },
}); // nome = "Rafael Dias" AND signo != "Gêmeos" AND idade >= 18
```

Básicamente você pode por em **type** absolutamente qualquer coisa queira no lugar do símbolo de igual, além disso você também pode trocar por alguns valores pré-estabelecidos para fazer uso de recursos do **MySQL**.

Por exemplo, se você deseja verificar se um valor esta entre dois outros valores, podemos utilizar o **BETWEEN**:

```js
jsonToSqlWhere({
  idade: { type: "BETWEEN", value: [9, 34] },
}); // idade BETWEEN 9 AND 34
```

Note que neste caso, o valor informado precisa ser um **Array** contendo o menor e maior valor respectivamente.

Também pode desejar verificar se um valor consta em uma lista de valores, para isso usamos o **IN**, veja:

```js
jsonToSqlWhere({
  plataforma: {
    type: "IN",
    value: ["Origin", "Steam", "XBox", "PS", "Mobile"],
  },
}); // plataforma IN ("Origin","Steam","XBox","PS","Mobile")
```

Note que neste caso o valor deve ser um **Array** contendo todos os valores possíveis.

## Autor

<table>
  <tr>
    <td width="150px">
      <img src="https://scontent.fsdu1-1.fna.fbcdn.net/v/t1.0-9/539886_235546170253505_5977326689811409130_n.jpg?_nc_cat=106&ccb=3&_nc_sid=174925&_nc_eui2=AeGgFWn_fWInwRkTo3mHSP993TbQ0TzG0Y3dNtDRPMbRjS-eZL1tr4I5maqz6O-jva9qWnIxKOsD3UtSm9CTeCys&_nc_ohc=Qw6NaDGrtIgAX9uFF2c&_nc_ht=scontent.fsdu1-1.fna&oh=5ebac9874d7a24e157c8c99fd965c2a4&oe=606539CE" width="100px;" alt=""/>
      <b>Rafael A. R. Dias</b>
    </td>
    <td>  
      <a href="mailto:eu@diasrafael.com.br" target="_blank" >
        <img alt="Email eu@diasrafael.com.br" src="https://img.shields.io/static/v1?label=Email&message=eu@diasrafael.com.br&color=red&logo=gmail&style=for-the-badge">
      </a>
      <a href="https://www.linkedin.com/in/diasrafael/" target="_blank">
        <img alt="Linkedin @diasrafael" src="https://img.shields.io/static/v1?label=Linkedin&message=@diasrafael&color=blue&logo=linkedin&style=for-the-badge">
      </a>
      <a href="https://www.facebook.com/eudiasrafael" target="_blank">
        <img alt="Facebook @eudiasrafael" src="https://img.shields.io/static/v1?label=Facebook&message=@eudiasrafael&color=blue&logo=facebook&style=for-the-badge">
      </a>
      <a href="https://github.com/descodifica" target="_blank">
        <img alt="GitHub Geral @descodifica" src="https://img.shields.io/static/v1?label=GitHub+Geral&message=@descodifica&color=black&logo=github&style=for-the-badge">
      </a>
      <a href="https://github.com/desco-npm" target="_blank">
        <img alt="GitHub NPM @desco-npm" src="https://img.shields.io/static/v1?label=GitHub+NPM&message=@desco-npm&color=black&logo=github&style=for-the-badge">
      </a>
      <a href="https://www.npmjs.com/org/desco" target="_blank">
        <img alt="NPM @desco" src="https://img.shields.io/static/v1?label=NPM&message=@desco&color=red&logo=npm&style=for-the-badge">
      </a>
    </td>
  </tr>
</table>
