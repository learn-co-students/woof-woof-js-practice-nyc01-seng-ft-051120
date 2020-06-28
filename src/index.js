document.addEventListener("DOMContentLoaded", e => {
    const dogBar = document.querySelector("#dog-bar")
    const dogInfo = document.querySelector("#dog-info")
    const baseUrl = 'http://localhost:3000/pups'
    const dogFilter = document.getElementById("good-dog-filter")
    const fetchPups = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(pups => {

           
            pups.forEach(pupObj => makePups(pupObj))
        })
        // need to get the filter button 
            // if filter text button "on"
            // only show dogs with isGoodDog = true 
        
        
    }

    const makePups = (pupObj) => {
        const dogSpan = document.createElement("span")
        dogSpan.dataset.number = pupObj.id
        dogSpan.className = "dog-values"
        dogSpan.innerHTML = `
        <h4>${pupObj.name}</h4>
        <p hidden>${pupObj.isGood}</p>
        `
        dogBar.append(dogSpan)
        // console.log(dogSpan);
        // let pupsArray = Array.from(dogSpan)
        // console.log(pupsArray);
        
        
        
    }

    // √when a user clicks on a pup the pup should render below with more info
        // √need to find place to put dog info 
        // √if specific dog is clicked need to populate with dog info for specific dog
        
    document.addEventListener("click", e => {
     
    let dogId = e.target.dataset.number  
    
      
        if (e.target.className === 'dog-values'){
            function getSingleDog(){
                fetch(baseUrl+`/${dogId}`)
                .then(r => r.json())
                .then(pup => {
                    dogInfo.id = dogId
                    if (pup.isGoodDog === true) {
                        dogInfo.innerHTML = `
                        <img src='${pup.image}'>
                        <h2>${pup.name}</h2>
                        <button id='dog-btn'>Bad Dog!</button>
                        `
                    } else { 
                        dogInfo.innerHTML = `
                        <img src='${pup.image}'>
                        <h2>${pup.name}</h2>
                        <button id='dog-btn'>Good Dog!</button>
                        `
                    }
                    console.log(pup.isGoodDog);
                    
                })
            }
            getSingleDog(dogId)
  
            
        }

     if (e.target.textContent === "Good Dog!"){
            e.target.textContent = "Bad Dog!" 
            newValue = false
            patchDog(dogInfo.id,newValue)
              
        } else if (e.target.textContent === "Bad Dog!"){
            e.target.textContent = "Good Dog!"
            newValue = true
            patchDog(dogInfo.id,newValue)
        }

    })

    const patchDog = (dogId,newValue) => {
        console.log(dogId,newValue);
        
        fetch(baseUrl+`/${dogInfo.id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: newValue
            })
        })
    }





    
    fetchPups()
})