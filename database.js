import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express();

app.use(cors())

app.get('/products', async (req,res)=>{
    return res.json(await getProducts())
})

app.get('/type', async (req,res)=>{
    return res.json(await getProductsByType())
})

app.get('/price', async (req,res)=>{
    return res.json(await getProductsByPrice())
})

app.get('/priceDesc', async (req,res)=>{
    return res.json(await getProductsByPriceDesc())
})

const pool = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bb1bd03098cda2',
    password: 'd0adc67f',
    database: 'heroku_4452ddd73aec511'
}).promise()



export async function getProducts(){
    const [products] = await pool.query(`
    select * from products order by title
    `)
    return products;
}

export async function getProductsByPrice(){
    const [products] = await pool.query(`
    select * from products order by price asc
    `)
    return products;
}

export async function getProductsByPriceDesc(){
    const [products] = await pool.query(`
    select * from products order by price desc
    `)
    return products;
}

export async function getProductsByType(){
    const [products] = await pool.query(`
    select * from products order by type
    `)
    return products;
}

app.listen(8081,()=>{
    console.log('running')
})


