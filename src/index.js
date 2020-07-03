document.addEventListener("DOMContentLoaded", () => {

// GET
    // Fetches all dogs from the db and renders each one into the dog bar (w/in 'span' tag)

    function renderOneDog(dog){
        const dogsDiv = document.querySelector('#dog-bar')

        const dogsSpan = document.createElement('span')
        dogsSpan.innerHTML = `
                              <span>${dog.name}</span>
        `
        
        dogsDiv.append(dogsSpan)
    }

    function renderAllDogs(dogs){
        dogs.forEach(dog => renderOneDog(dog))
    }

    function fetchAllDogsData(url){
        fetch(url)
        .then(resp => resp.json())
        .then(allDogsDataObjects => renderAllDogs(allDogsDataObjects))
    }
    fetchAllDogsData("http://localhost:3000/pups/")

})