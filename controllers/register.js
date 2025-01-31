const handleRegister = (req,res,db,bcrypt,saltRounds)=>{
	const {name,email,password}=req.body
	if(!name || !email || !password){
		return res.status(400).json('incorrect data')
	}
	const hash = bcrypt.hashSync(password, saltRounds);
	db.transaction(trx=>{
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{
			return trx('users')
			.returning('*')
			.insert({
				email:loginEmail[0],
				name:name,
				joined:new Date()
			})
			.then(user=>{res.json(user[0])})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err=>{
		console.log(err)
		res.status(400).json("Unable to register")})
}
module.exports={
	handleRegister
}