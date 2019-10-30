const request = require('request')


const geocode = (address,callback) => {

    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY2hpbnRhbjgzIiwiYSI6ImNrMXRsajRwejA1Nm0zbG55azFvdnNjM3kifQ.AOxjFYYp22tAsIwnBvIZPA'

    request({url: geoURL,json:true}, (error, {body})=> {
    
        if(error) {
            // console.log('Unable to connect to the Geo service')
            callback('Unable to connect to the Geo service',undefined)
        }else if (body.features.length !== 0) {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const place_name = body.features[0].place_name
            // console.log(latitude,longitude)
            const data = {
                latitude: latitude,
                longitude: longitude,
                location: place_name
            }

            callback(undefined,data)
        } else {
            // console.log('Unable to find location')
            callback('Unable to find location',undefined)
        }
            
    })
}


module.exports = geocode