const express = require('express')
const app = express()

app.get('/', (req, res) => {
	var connectionInterrupt = false;

	var str = "a hihi do ngoc." + new Date().getTime()
	console.log("Process: " + str);

	req.connection.on('close',function(){    
		connectionInterrupt = true;
	});

	setTimeout(function(){
		res.send(str)
		req.connection.removeAllListeners('close')
		if(connectionInterrupt){
			console.log("Roll back: " + str);
		} else {
			console.log("Process done");
		}
	}, 2000);

})

var server = app.listen(3000, () => console.log('Example app listening on port 3000!'))
