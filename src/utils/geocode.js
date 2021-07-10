const request = require('request')

const geocode = (locationID, callback) => {
    const apiGeoBaseAddress = 'http://api.mapbox.com/'
    const apiGeoVersion = 'geocoding/v5/'
    const apiGeoEndpoint = 'mapbox.places/'
    const accessToken = 'pk.eyJ1Ijoic2FtZWVybmF5YXIiLCJhIjoiY2txdHFjejJkMmN0MTJucGUzM2lwNGxoNyJ9.ch5AnX1FBxqfI3QVI-v80g'
    
    const locationUrl = `${apiGeoBaseAddress}${apiGeoVersion}${apiGeoEndpoint}` + encodeURIComponent(locationID) + '.json?access_token=' + `${accessToken}` + '&limit=1'
    let coordinates = {}
    request({url: locationUrl, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to API service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            coordinates = body.features[0].center
            // const {longitude, latitude} = coordinates
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            callback(undefined, {
                coordinates: body.features[0].center,
                latitude,
                longitude,
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode