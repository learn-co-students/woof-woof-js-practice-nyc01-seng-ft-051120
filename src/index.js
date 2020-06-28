document.addEventListener("DOMContentLoaded", function(e){

    const dogInfo = document.querySelector("#dog-info")
    const dogBar = document.querySelector("#dog-bar")
    
    function renderDog(dog){
            const singleDog = document.createElement("span")
            singleDog.dataset.id = `${dog.id}`
            singleDog.dataset.image = `${dog.image}`
            singleDog.dataset.good = `${dog.isGoodDog}`
            singleDog.className = "singleDog"
            singleDog.textContent = `${dog.name}`
            dogBar.appendChild(singleDog)    
    } 

    function renderDogs(dogs){
        dogs.forEach(dog => renderDog(dog))
    }

    function getDogs(url){  
        fetch(url)
        .then(resp => resp.json())
        .then(dogsObject => renderDogs(dogsObject))
    }

    getDogs("http://localhost:3000/pups")
    

    dogBar.addEventListener("click", function(e){

        if (e.target.className === 'singleDog'){
            const dog = e.target
            if (dog.dataset.good === "true"){
                dogInfo.innerHTML = ` 
                <img src= ${dog.dataset.image}>
                <h2>${dog.textContent}</h2>
                <button id="${dog.dataset.id}" data-good= "good" class="behavior">Good Dog!</button>`
            } else {
                dogInfo.innerHTML = ` 
                <img src= ${dog.dataset.image}>
                <h2>${dog.textContent}</h2>
                <button id="${dog.dataset.id}" data-good= "bad" class="behavior">Bad Dog!</button>`
            }
        }
    })


    function updateDog(url, goodness) {
        fetch(url, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                isGoodDog: goodness
                }
            )
        })
        .catch(error => console.log(error))
    }


    
    dogInfo.addEventListener("click", function(e){
        const button = e.target
        const buttonId = parseInt(button.id)
        
        if (button.dataset.good === "bad"){
            button.dataset.good = "good"
            button.textContent= "Good Dog!"  
            const goodness = true
            updateDog(`http://localhost:3000/pups/${buttonId}`, goodness)
        } else {
            console.log(`${button.dataset.good}`)
            button.dataset.good = "bad"
            button.textContent= "Bad Dog!"
            const goodness = false
            updateDog(`http://localhost:3000/pups/${buttonId}`, goodness)
        }

    })


    const filterButton = document.querySelector("#good-dog-filter")
    filterButton.addEventListener("click", function(e){

        const dogs = document.querySelectorAll('span')

        if (e.target.textContent === "Filter good dogs: OFF"){
            e.target.textContent = "Filter good dogs: ON"
            for (let i=0; i<dogs.length; i++){

                if (dogs[i].dataset.good === "false"){
                    dogs[i].style.display = "none"
                }else{
                    dogs[i].style.display = "block"
                }
            }
        }
        
        else{
            e.target.textContent = "Filter good dogs: OFF"

            for (let i=0; i<dogs.length; i++){
                 dogs[i].style.display = "block"
            }
        }

    })


})