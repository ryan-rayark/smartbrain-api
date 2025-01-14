const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors=require('cors')
const knex=require('knex')


const register=require('./controllers/register.js')
const signin=require('./controllers/signin.js')
const profile=require('./controllers/profile.js')
const image=require('./controllers/image.js')

const db=knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  	ssl: true,
  }
});

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{res.send("it is working great!")})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt,saltRounds)})
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleImageUrl(req,res)})

const PORT = process.env.PORT
app.listen(PORT||3000,()=>{
	console.log(`This app is working nicely on port ${PORT}`)
})