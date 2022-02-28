const https = require('https');
let url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=LXpfjasGceq2bgXEQoLqMFkFSRUacypikNduOmfA";  

exports.handler = async (event) => {
    let data = '';
    
    const response = await new Promise((resolve, reject) => {
        const req = https.get(url, function(res) {
          res.on('data', chunk => {
            data += chunk;
          });
          res.on('end', () => {
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
            resolve({
                statusCode: 200,
                body: JSON.stringify(myMap, null, 4)
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });
    
    // Return specific data.
    //console.log(response.links.next);
    return response;
};