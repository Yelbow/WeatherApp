var request = require('request');

function forecast(coordinates, callback){

    const url = 'https://api.darksky.net/forecast/1eb35c2ae15a373db58c441c9330b229/' + coordinates + '?units=si'

    request( { url, json: true, }, (e, { body }) => {
 
        if(e){
            callback('location service unavailable.')
        } else if(body.length === 0) {
            callback('location could not be found.')
        } else {
            const { temperature, summary } = body.currently
            callback(e, temperature, summary )    
        }
    })
}

module.exports = forecast