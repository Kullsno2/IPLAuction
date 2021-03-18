const express = require('express');
const path = require('path');
const {MongoClient} = require('mongodb');
const keys = require('./config/keys');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname)));

const uri = encodeURI(keys.mongoURI);

app.get('/',(req,res)=> {
	res.sendFile(path.join(__dirname+'/auction.html'));
});

app.get('/teamlist',(req,res)=> {
	res.sendFile(path.join(__dirname+'/teamlist.html'));
});

app.post('/sold',(req,res)=>{
	var x = Object.values(req.body);
	var _json = JSON.stringify(x);
	var _jsonVal = JSON.parse(_json);

	var collection_name = _jsonVal[0]["Team_name"];
	var jsondata = _jsonVal[0];

	MongoClient.connect(uri, function(err,db){
		if(err)
			throw err;
		var dbo = db.db("auction");
		dbo.collection(collection_name).insertOne(jsondata, function(err,res){
			if(err)
				throw err;
			console.log("Document Inserted");
		});
		db.close();
	});
});

app.post('/remove',(req,res)=>{
	var x = Object.values(req.body);
	var _json = JSON.stringify(x);
	var _jsonVal = JSON.parse(_json);

	var collection_name = _jsonVal[0]["Team_name"];
	var jsondata = _jsonVal[0];

	MongoClient.connect(uri, function(err,db){
		if(err)
			throw err;
		var dbo = db.db("auction");
	// 	// dbo.collection(collection_name).insertOne(jsondata, function(err,res){
	// 	// 	if(err)
	// 	// 		throw err;
	// 	// 	console.log("Document Inserted");
	// 	// });
		dbo.collection(jsondata).findOneAndDelete({},{"sort": { "_id": -1 }});
		console.log("Document Removed");
		db.close();
	});
});

app.get('/A',(req,res)=>{
	MongoClient.connect(uri,async function(err,db){
		if(err)
			throw err;
		var dbo = db.db("auction");
		const data = await dbo.collection('A').find().toArray();
		res.send(data);
		db.close();
	});
	
});

app.get('/B',(req,res)=>{
	MongoClient.connect(uri,async function(err,db){
		if(err)
			throw err;
		var dbo = db.db("auction");
		const data = await dbo.collection('B').find().toArray();
		res.send(data);
		db.close();
	});
	
});

app.get('/C',(req,res)=>{
	MongoClient.connect(uri,async function(err,db){
		if(err)
			throw err;
		var dbo = db.db("auction");
		const data = await dbo.collection('C').find().toArray();
		res.send(data);
		db.close();
	});
	
});

app.get('/D',(req,res)=>{
	MongoClient.connect(uri,async function(err,db){
		if(err)
			throw err;
		var dbo = db.db("auction");
		const data = await dbo.collection('D').find().toArray();
		res.send(data);
		db.close();
	});
	
});

app.get('/E',(req,res)=>{
	MongoClient.connect(uri,async function(err,db){
		if(err)
			throw err;
		var dbo = db.db("auction");
		const data = await dbo.collection('E').find().toArray();
		res.send(data);
		db.close();
	});
	
});

app.get('/F',(req,res)=>{
	MongoClient.connect(uri,async function(err,db){
		if(err)
			throw err;
		var dbo = db.db("auction");
		const data = await dbo.collection('F').find().toArray();
		res.send(data);
		db.close();
	});
	
});

app.get('/G',(req,res)=>{
	MongoClient.connect(uri,async function(err,db){
		if(err)
			throw err;
		var dbo = db.db("auction");
		const data = await dbo.collection('G').find().toArray();
		res.send(data);
		db.close();
	});
	
});

app.get('/H',(req,res)=>{
	MongoClient.connect(uri,async function(err,db){
		if(err)
			throw err;
		var dbo = db.db("auction");
		const data = await dbo.collection('H').find().toArray();
		res.send(data);
		db.close();
	});
	
});

const PORT = process.env.PORT || 5002;

app.listen(PORT);