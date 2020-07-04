// On the page, there is a `div` with the id of `"dog-bar"`. On page load, make a fetch
// to get all of the pup objects. When you have this information, you'll need to add
// a `span` with the pup's name to the dog bar (ex: `<span>Mr. Bonkers</span>`).
let pups = []


document.addEventListener("DOMContentLoaded", ()=>{
    getPups()
})

function getPups(){
    fetch ('http://localhost:3000/pups')
    .then(response => response.json())
    .then(pups =>{
        pups.forEach(pup => {
            const dogBar = document.querySelector('#dog-bar')
            const dogInfo = document.querySelector('#dog-info')
            let span = document.createElement('span')
            span.innerText = pup.name
            dogBar.append(span)
            span.addEventListener('click', function(){
                    document.getElementById('dog-div')
                    const dogDiv = document.createElement('dog-div')
                    dogDiv.innerHTML = `
                    <img src= ${pup.image}>
                    <h2>${pup.name}</h2>
                    <button>${pup.isGoodDog}</button>`
                    dogInfo.append(dogDiv)
                    // setTimeout(() => dogDiv.remove(), 3000);
            })
        });
    })
}
// function goodDog(){
//     const goodButton = document.querySelector("#dog-info > dog-div > button")
//     goodButton.addEventListener("click", function(){

//         console.log(goodButton)
// }




// When a user clicks on a pup's `span` in the dog bar, that pup's info (`image`, `name`, and `isGoodDog` status) should show up in the `div` with the id of `"dog-info"`.
// When you have the pup's information, the dog info `div` should have the following children:
//  - an `img` tag with the pup's image url
//  - an `h2` with the pup's name
//  - a `button` that says `"Good Dog!"` or `"Bad Dog!"` based on whether `isGoodDog` is true or false.
//  Ex:
//  ```
//   <img src=dog_image_url>
//   <h2>Mr. Bonkers</h2>
//   <button>Good Dog!</button>
//  ```

// When a user clicks the Good Dog/Bad Dog button, two things should happen:
//   - The button's text should change from Good to Bad or Bad to Good
//   - The corresponding pup object in the database should be updated to reflect the new isGoodDog value
//     - Please note, you can update a dog by making a PATCH request to `/pups/:id`


