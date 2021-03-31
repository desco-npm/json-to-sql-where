<div align="right">
  <a href="README.md">
    <img alt="Ler em Portugês do Brasil" src="https://img.shields.io/static/v1?label=&message=Ler+em+Portugu%C3%AAs+do+Brasil&color=green&style=for-the-badge" />
  </a>
</div>

<table>
  <tr>
    <td><img src="https://i.ibb.co/qCk0rmM/json-to-sql-where.png"></td>
    <td>  
      <h1>@desco/json-to-sql-where</h1>
      Converts data in JSON to a SQL "WHERE" condition.
      <br /><br />
      <div align="center">
        <img alt="MIT License" src="https://img.shields.io/static/v1?label=License&message=MIT&color=green&style=for-the-badge">
        <img alt="Version 2.1.3" src="https://img.shields.io/static/v1?label=Version&message=2.1.3&color=blue&style=for-the-badge">
      </div>
      <h4 align="center"> 
        🚀 Ready to use! 🚀
      </h4>
    </td>
  </tr>
</table>

> <a href="https://github.com/desco-npm" target="_blank">See other NPM projects here.</a>

> <a href="https://github.com/descoifica" target="_blank">See other projects here.</a>

---

## 📋 Table of Contents

- [⚙️ Installation](#Installation)
- [📦 Import](#Import)
- [📚 How to use](#How-to-use)

---

<a name="Installation"></a>

## ⚙️ Installation

```bash
npm install --save @desco/json-to-sql-where
```

> Note that it will be necessary to have **NPM** installed for the command to work.

---

<a name="Import"></a>

## 📦 Import

### Node

```js
const getQuotesContent = require("@desco/json-to-sql-where");
```

### Browse

```js
import getQuotesContent from "@desco/json-to-sql-where";
```

---

<a name="How-To-Use"></a>

## 📚 How to use

### **AND** only

Let's start with the simplest possible use, a situation where we just want to check if columns are equal to values:

```js
jsonToSqlWhere({ nome: "Rafael Dias", nascimento: "03/07/1986" }); // `nome = "Rafael Dias" AND nascimento = "03/07/1986"`
```

In this simple case, just create a **JSON** containing column / value pairs and the package will automatically convert everything with the **AND** operator.

### More Conditional Operators (**AND**, **OR** and **XOR**)

But not only **AND** is a **SQL** made, right?

We can also use the conditional operators **OR** and **XOR** simply by grouping in our **JSON**, see:

```js
const result2 = jsonToSqlWhere({
  AND: { nome: "Rafael Dias", nascimento: "03/07/1986" },
  OR: { pais: "Brasil", genero: "M" },
  XOR: { signo: "Câncer", idade: 34 },
}); // (nome = "Rafael Dias" AND nascimento = "03/07/1986")  AND  (pais = "Brasil" OR genero = "M")  AND  (signo = "Câncer" XOR idade = 34)
```

Note that in this way, each of the operators was grouped in parentheses.

### Conditional operator within conditional operator

We have already seen how to use other conditional operators, but we have not yet been able to mix them ...

Yet! Nothing prevents us from creating a grouping of conditional operators within another grouping, see:

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

In this way we define conditional operator **OR** and within it a subset with conditional operator **AND**!

### Types

So far we have seen how to set up our conditions with **conditional operators**, but only they are not able to give us all the necessary dynamics.

For this we need to be able to use **common operators** as well, such as _=_, _!=_, Etc. For this, we can transform our values into more detailed objects, see:

```js
jsonToSqlWhere({
  nome: { type: "=", value: "Rafael Dias" },
  signo: { type: "!=", value: "Gêmeos" },
  idade: { type: ">=", value: "18" },
}); // nome = "Rafael Dias" AND signo != "Gêmeos" AND idade >= 18
```

Basically you can put in **type** absolutely anything you want in place of the equal symbol, in addition you can also change it for some pre-established values to make use of **MySQL** features.

For example, if you want to check if a value is between two other values, we can use **BETWEEN**:

```js
jsonToSqlWhere({
  idade: { type: "BETWEEN", value: [9, 34] },
}); // idade BETWEEN 9 AND 34
```

Note that in this case, the value entered must be a **Array** containing the smallest and largest value respectively.

You may also want to check if a value is in a list of values, for that we use **IN**, see:

```js
jsonToSqlWhere({
  plataforma: {
    type: "IN",
    value: ["Origin", "Steam", "XBox", "PS", "Mobile"],
  },
}); // plataforma IN ("Origin","Steam","XBox","PS","Mobile")
```

Note that in this case the value must be a **Array** containing all possible values.

## Author

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
        <img alt="GitHub Overview @descodifica" src="https://img.shields.io/static/v1?label=GitHub+Overview&message=@descodifica&color=black&logo=github&style=for-the-badge">
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
