console.log('public js available')

const form = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')



form.addEventListener('submit', (e) => {
    e.preventDefault()

    msgOne.innerHTML = 'loading...'
    msgTwo.innerHTML = ''

    const location = search.value

    fetch('/weather?address=' + encodeURIComponent(location)).then((res) => {
    res.json().then((data) => {
        if (data.error){
            msgOne.innerHTML = data.error
        } else {
            msgOne.innerHTML = data.location
            msgTwo.innerHTML = data.temperature
        }
    })
})
})