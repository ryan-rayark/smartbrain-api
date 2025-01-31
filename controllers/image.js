const Clarifai =require('clarifai')

const app = new Clarifai.App({
 apiKey: process.env.API_KEY
});

handleImageUrl=(req,res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data=>{res.json(data)})
	.catch(err=>res.status(400).json("error in api"))
}
handleImage=(req,res,db)=>{
	const {id} = req.body;
	db('users')
	.where('id',id)
	.increment('entries',1)
	.returning('entries')
	.then(entry=>{
		if(entry.length){
			res.json(entry[0])
		}else{
			res.status(400).json("inavlid image")
		}
	}) 
	.catch(err=>res.status(400).json("error"))
}
module.exports={
	handleImage,
	handleImageUrl
}