const request = require('request')

const forecast = (longitude,latitude,callback) => {

    const weatherUrl = 'https://api.darksky.net/forecast/08c9fd4af7eece0713eb8eee29f7dfba/'+latitude+','+longitude

    request({url: weatherUrl,json: true},(error,{body})=> {
        
    if(error) {
        // console.log('Unable to connect to weathre service')
        callback('Unable to connect to weathre service',undefined)
    }else if (body.error) {
        // console.log('Unable to connect to weathre service')
        callback('Unable to connect to weathre service',undefined)
    } else {
        // console.log(response.body.currently.temperature)
        callback(undefined,'The temprature for the location is '+body.currently.temperature+' degree')
    }
})

}


module.exports = forecast