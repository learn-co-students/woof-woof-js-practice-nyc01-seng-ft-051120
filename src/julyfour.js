
// When a user clicks on a pup's `span` in the dog bar, that pup's info (`image`, `name`, and `isGoodDog` status) should show up in the `div` with the id of `"dog-info"`.
// When you have the pup's information, the dog info `div` should have the following children:
//  - an `img` tag with the pup's image url
//  - an `h2` with the pup's name
//  - a `button` that says `"Good Dog!"` or `"Bad Dog!"` based on whether `isGoodDog` is true or false.
//  Ex:
//  ```
//   <img src=pup.image>
//   <h2>pup.name</h2>
//   <button>pup.isGoodDog</button>
//  ```
/* <img src= ${pup.image}>
    <h2>${pup.name}</h2>
    <button>${pup.isGoodDog}</button>` */

document.addEventListener('DOMContentLoaded', function(e){

function renderEachPup(pup){
    const dogBar = document.getElementById('dog-bar')
    const dogSpan = document.createElement('span')
    dogSpan.className = 'dog-span'
    dogSpan.textContent = `${pup.name}`
    dogSpan.dataset.image = `${pup.image}`
    dogSpan.dataset.isGoodDog = `${pup.isGoodDog}`
    dogSpan.dataset.id = `${pup.id}`
    dogBar.append(dogSpan)
}

function renderAllPups(allPups){
    allPups.forEach (pup => renderEachPup(pup))
}

function fetchPups(URL){
    fetch (URL)
    .then(resp => resp.json())
    .then(pupsObj => renderAllPups(pupsObj))
}

fetchPups('http://localhost:3000/pups')

const body = document.querySelector('body')
body.addEventListener('click', function(e){
    if (e.target.className === 'dog-span'){
    const dogSpan = e.target
    if (dogSpan.dataset.isGoodDog === "true"){
        const dogInfo = document.getElementById('dog-info')
    dogInfo.innerHTML =`
    <img src=${dogSpan.dataset.image}>
    <h2>${dogSpan.textContent}</h2>
    <button data-id='${dogSpan.dataset.id}'>Good Dog!</button>
    `
    }
    else {
        const dogInfo = document.getElementById('dog-info')
    dogInfo.innerHTML =`
    <img src=${dogSpan.dataset.image}>
    <h2>${dogSpan.textContent}</h2>
    <button class='toggle-btn' data-id='${dogSpan.dataset.id}' >Bad Dog!</button>
    `
    }
    
    }
})
const dogInfo = document.getElementById('dog-info')

    dogInfo.addEventListener('click', function(e){
        console.log(e.target.className)
        if (e.target.className ==='toggle-btn'){
        if (e.target.innerText === "Good Dog!"){
            e.target.innerText = "Bad Dog!"
            const pupObj = {
                "isGoodDog": false
            }
            dogPatch('http://localhost:3000/pups',e.target.dataset.id, pupObj)
        }
        else {
            e.target.innerText = "Good Dog!"
            const pupObj = {
                "isGoodDog": true
            }
            dogPatch('http://localhost:3000/pups',e.target.dataset.id, pupObj)
        }}
    })

function dogPatch(URL,id, pupObj){
    fetch (`${URL}/${id}`,{
        method: 'PATCH',
        headers: {  
            'Content-Type': 'application/json',
            "Accept": 'application/json'
    },
        body: JSON.stringify(pupObj)
    })
}

})

