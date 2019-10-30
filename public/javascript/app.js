console.log('Client side javascript file is loaded!')



const weatherform = document.querySelector('form')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('Testing')


    const location = document.querySelector('input').value
    console.log(location)
    const message1 = document.querySelector('#message-1')
    const message2 = document.querySelector('#message-2')
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                message1.textContent = data.error
            } else {
                console.log(data.location)
                message1.textContent = data.location
                console.log(data.temprature)
                message2.textContent = data.temprature
            }
        })
    })
    

})
