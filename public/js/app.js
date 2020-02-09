console.log('Client side java script has been loaded')
const messageOne=document.querySelector('#message_1')
const messageTwo=document.querySelector('#message_2')



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location=search.value
    messageOne.textContent='Loading'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        

    response.json().then((data)=>{
        {
            if(data.error)
            {
                messageOne.textContent=data.error
            }else{
                // console.log(data.location)
                // console.log(data.forecast)
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }
        }
    })
})

    //console.log(location)
})

