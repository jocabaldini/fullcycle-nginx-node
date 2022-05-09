const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sql = `CREATE TABLE IF NOT EXISTS people(name VARCHAR(100) NOT NULL)`
    connection.query(sql)
    connection.end()

app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)
    const sql = `INSERT INTO people(name) values('Joca')`
    connection.query(sql)

    const sqlSelect = `SELECT * FROM people`
    let list = '<ul>'
    let query = connection.query(sqlSelect)
    query
        .on('result', function (row) {
            list += `<li>${row.name}</li>`  
        })
        .on('end', function () {
            list += '</ul>'
            
            res.send(`<h1>Full Cycle Rocks!</h1>${list}`)
        })
    connection.end()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})