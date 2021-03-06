const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const weatherToken = '81a5d8bf8307eabafdee860efc11795c'
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=' + `${weatherToken}` + '&query=' + latitude +',' + longitude + '&units=f'
    request({url: weatherUrl, json: true}, (error, {body} = {}) => {
            if (error) {
                callback('Unable to connect to API service', undefined)
            } else if (body.error) {
                callback('Unable to find weather location', undefined)
            } else {
                console.log(body.current)
                // callback(undefined, {
                //     temp: body.current.temperature,
                //     rainChance: body.current.precip,
                //     forecast: body.current.weather_descriptions[0] + ' ... is it?'
                // })
                callback(undefined, 'The weather is ' + body.current.weather_descriptions[0] + '.The temperature is ' + body.current.temperature + ' and feels like ' + body.current.feelslike + '.')
            }
        })
}

module.exports = forecast