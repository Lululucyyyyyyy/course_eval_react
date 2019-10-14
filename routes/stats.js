const express = require('express');
const router = express.Router();
const models = require('../models');
const multer = require('multer')
const fs = require('fs');
const upload = multer({dest: '/tmp/'})

router.post('/submitModel', upload.single('file'), (req, res, next) => {
	// run model code here

	console.log(req.body);

	const username = req.body.username;
	const public_folder = 'public';
	const file_path = `/models/${req.file.originalname}`;
	const full_file_path = public_folder + file_path;

	fs.rename(req.file.path, full_file_path, (err) => {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			const spawn = require("child_process").spawn;
		    const process = spawn('python',["./scripts/demo.py", 
		                            full_file_path]);
		    console.log('hi');
		  
		    // Takes stdout data from script which executed 
		    // with arguments and send this data to res object 
		    process.stdout.on('data', function(data) { 
		    	const modelOutput = JSON.parse(data.toString());

		    	console.log('deleting file');
		    	try {
				  fs.unlinkSync(full_file_path)
				  //file removed
				} catch(err) {
				  console.error(err)
				}
		    	console.log('before saving to db');
				// save in db
				models.Stat.create({
					username: username,
					latency: modelOutput.latency,
					accuracy: modelOutput.accuracy,
				})
				.then(statCreated => {
					console.log('saved to db')
					res.send(statCreated.get());
				});
		    }); 
		}
	});
	//res.send({accuracy, latency});

});

module.exports = router;
