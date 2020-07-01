document.addEventListener('DOMContentLoaded', () =>{
    getDogs()
    goodButton()
    filter()
    // goodDogsOnly()
})

function getDogs(){
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(dogs => {dogs.forEach(function(dog){
        render(dog)
        goodDogsOnly(dog)
    })
})
}

function render(dog){
    const dogBar = document.getElementById('dog-bar')
    const dogInfo = document.getElementById('dog-info')
    let dogSpan = document.createElement('span')
    let goodBoy = ""
    
    dogSpan.id = dog.id
    dogSpan.innerText = `${dog.name}`
    dogBar.append(dogSpan)

    if(dog.isGoodDog === 'true'){
        goodBoy = 'Good Dog!'
    }else if(dog.isGoodDog ==='false'){
        goodBoy = 'Bad Dog!'
    }

    dogSpan.addEventListener('click', function(e){
        if(e.target.id===dogSpan.id){
            e.preventDefault()
            dogInfo.innerHTML = `
                <img src=${dog.image}>
                <h2>${dog.name}</h2>
                <p class='goodness'>${dog.isGoodDog}</p>
                <button class='good-or-bad' id=${dog.id}>${goodBoy}</button>
            `
        }
    })
}

function goodButton(){
    document.addEventListener('click', function(e){
        const currentDog = e.target.id
        let goodness = document.querySelector('.goodness')
        if(e.target.className === 'good-or-bad'){
            e.preventDefault()
            if(e.target.textContent==='Good Dog!' && goodness.textContent === 'true'){
                goodness.textContent = 'false'
                e.target.textContent='Bad Dog!'
            }else if(e.target.textContent==='Bad Dog!' && goodness.textContent === 'false'){
                e.target.textContent='Good Dog!'
                goodness.textContent = 'true'
            }
        }
        fetch(`http://localhost:3000/pups/${currentDog}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                    isGoodDog: goodness.textContent
                })
            })
    })
}

function filter(){
    const filterBtn = document.querySelector('#good-dog-filter')
    filterBtn.addEventListener('click', function(e){
        if(e.target.id === "good-dog-filter"){
            e.preventDefault()
            if(filterBtn.textContent === 'Filter good dogs: OFF'){
                filterBtn.textContent = 'Filter good dogs: ON'
            }else if(filterBtn.textContent === 'Filter good dogs: ON'){
                filterBtn.textContent = 'Filter good dogs: OFF'
            }
        }
    })
}

function goodDogsOnly(dog){
    let filterButton = document.querySelector('#good-dog-filter')
    if(filterButton.textContent === 'Filter good dogs: ON'){
        console.log('hello')
        // if (dog.isGoodDog === 'true'){
        //     render(dog)
        // }
    

    }
    
}