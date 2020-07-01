document.addEventListener('DOMContentLoaded', function(e){
    fetchDogs()

    document.addEventListener('click', function(e){
        if (e.target.innerText === 'Good Dog!'){
            const dogId = e.target.parentNode.dataset.id
            let good = true
            goodBad(dogId, good)
            e.target.innerText = 'Bad Dog!'
        }
        else if (e.target.innerText === 'Bad Dog!'){
            const dogId = e.target.parentNode.dataset.id
            let good = false
            goodBad(dogId, good)
            e.target.innerText = 'Good Dog!'
        }
    })
})

function fetchDogs(){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(dogs => renderDogs(dogs))
}

function renderDogs(dogs){
    dogs.forEach(dog => {

        const dogName = dog.name
        
        const dogBar = document.querySelector('#dog-bar')

        const dogSpan = document.createElement('span')
        dogSpan.id = dog.id

        dogSpan.innerHTML = `
                <span>${dogName}</span>
        `

        dogBar.append(dogSpan)

        dogSpan.addEventListener('click', function(e){
            if (e.target === dogSpan){

                const dogDiv = document.querySelector('#dog-info')

                dogDiv.dataset.id = dog.id
                
                if (dog.isGoodDog === false){
                dogDiv.innerHTML = `
                        <image src='${dog.image}'></image>
                        <h2>${dog.name}</h2>
                        <button>Good Dog!</button>
                `}
                else{
                    dogDiv.innerHTML = `
                    <image src='${dog.image}'></image>
                    <h2>${dog.name}</h2>
                    <button>Bad Dog!</button>
                    `
                }
            }
            
        })
    })
}

function goodBad(dogId, good){
    fetch(`http://localhost:3000/pups/${dogId}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accepts': 'application/json'
        },
        body: JSON.stringify({
                    'isGoodDog': good
        })
    })
}