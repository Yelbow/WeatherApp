var request = require('request');

function geocode(address, callback){

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + decodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZm9mZiIsImEiOiJjazEzdXB5dmcwYzhnM25weWx1aDFreXZ4In0.s3jeGeqpRrHVxyaXSW-ZLw&limit=1'

    request({ url, json: true}, (e, { body }) => {

        if(e){
            callback('location services unavailable.')
        } else if(body.features.length === 0) {
            callback('location could not be found.')
        } else {
            const { center, place_name:placeName } = body.features[0]
            const coordinates = [center[1], center[0]].toString()

            callback(e, coordinates, placeName)   
        }
    }) 
}

module.exports = geocode