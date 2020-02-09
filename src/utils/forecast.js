const request=require('request')

const forecast=(longitude,latitude,callback)=>{
    url='https://api.darksky.net/forecast/1f3280994380841895384e62b3657e5a/'+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)+'?lang=en'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to weather API',undefined)
        }else if(body.error,undefined){
            callback('Unable to find location')
        }else{
            callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'%  chance of rain.')
        }
    })

}
module.exports=forecast