const dogArray = []
document.addEventListener("DOMContentLoaded", function(){

    fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(data => {
        data.forEach(dog => {
            dogArray.push(dog)
            let dogBar = document.getElementById('dog-bar')
            let dogTag = document.createElement('span')
            dogTag.innerText = dog['name']
            dogBar.append(dogTag)
          })
        })

    document.addEventListener('click', function(e){
        console.log(e.target)
        if (e.target = "span"){
            dogArray.forEach(dog =>{ 
            if (e.target.innerText === dog.name ){
                let dogContainer = document.getElementById('dog-info')
            dogContainer.innerHTML = `
            <img src="${dog.image}">
            <h2 id=${dog.id}>${dog.name}</h2>
            <button class="status" id='${dog.id}'>${dog.isGoodDog}</button>
            `
            buttonStatus()
            }
           
            })
        }
    })

    document.addEventListener('click', function(e){
        if (e.target.className === 'status'){
            if (e.target.innerText === 'Good Dog!'){
                console.log('good')
                e.target.innerText = 'Bad Dog!'
            }
            else if(e.target.innerText === 'Bad Dog!'){
                e.target.innerText = 'Good Dog!'
            }
        
           const dogStatus = e.target.innerText
           const data = {isGoodDog: dogStatus}

        fetch (`http://localhost:3000/pups/${e.target.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data) , 
        })
        }
        
    })

    let filterButton = document.getElementById('good-dog-filter')
    filterButton.addEventListener('click', function(e){
        console.log(e)
       if( e.target.innerText === "Filter good dogs: OFF"){
        e.target.innerText = "Filter good dogs: ON"
        }
       else if( e.target.innerText === "Filter good dogs: ON"){
        e.target.innerText = "Filter good dogs: OFF"
       }
    })


    function buttonStatus(){
        let button = document.querySelector('.status')
        if (button.innerText === 'true'){
            button.innerText = 'Good Dog!'
        }
        else if(button.innerText === 'false'){
            button.innerText = 'Bad Dog!'
        }
    }


})