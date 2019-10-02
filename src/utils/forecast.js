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
            const { temperatureLow, temperatureHigh  } = body.daily.data[0]

            const desc = summary + '. De koudste temperatuur van vandaag is '+temperatureLow+'&#8451;. Op zijn warmst wordt het vandaag '+temperatureHigh+'&#8451;.' 

            callback(e, temperature, desc)    
        }
    })
}
module.exports = forecast