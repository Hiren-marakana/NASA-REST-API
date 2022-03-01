// require classes
const { response } = require('express')
const express = require('express')
const app = express()
const port = 3001
const https = require('https')
const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=BRqx1NhX1P2RXcIBhJ4M6Hd1ChvDSs2dUSVrc8M9'

// create server and add port for listening
var server = require('http').createServer(app)
//Start: Server connection
app.set('port', port)
server.listen(port, function () {
  console.log("(---------------------------------)")
  console.log("|         Server Started...       |")
  console.log("|   Server run on " + port + "  Port    |")
  console.log("(---------------------------------)")
});
//End: Server connection

app.get('/', (req, res)=>{
    res.send('i m here !');
})

const callExternalAPiUsingHttp = (callback) => {
    
}

app.get('/earthobjects', (req, res)=>{
    https.get(apiUrl, (resp) => {
        let data = '';
        
        // A chunk of data has been received
        resp.on('data', (chunk) => {
            data += chunk;
        });
        
        // The whole response has been received. Print out the result
        resp.on('end', () => {
            // let finalData = data.element_count
            res.writeHead(200, { 'Content-Type': 'application/json' });
            var finalData = JSON.parse(data) 
            var mapData = Object.keys(finalData.near_earth_objects).length
            var myMap = [];
            for(var i = 0; i < mapData; i++) {
                var myData = finalData.near_earth_objects[Object.keys(finalData.near_earth_objects)[i]];
                
                var dateObj = {};
                dateObj["date"] = Object.keys(finalData.near_earth_objects)[i];
                
                var dataArray = []; 

                for(var j = 0; j < myData.length; j++ ) {
                    var obj = {};
                    obj["id"] = myData[j].id;
                    obj["name"] = myData[j].name;
                    obj["meter"] = myData[j].estimated_diameter.meters;
                    obj["hazardous"] = myData[j].is_potentially_hazardous_asteroid;
                    for(var k = 0; k < myData[j].close_approach_data.length; k++){
                        obj["velocity"] = myData[j].close_approach_data[k].relative_velocity.kilometers_per_hour
                    }
                    
                    dataArray.push(obj);
                }
                dateObj["data"] = dataArray;
                myMap.push(dateObj);
            } 
            res.write(JSON.stringify(myMap));
            res.end()
        })
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
});