document.addEventListener("DOMContentLoaded",()=>{
  
   const doggos = () =>{fetch('http://localhost:3000/pups')
  .then (resp => resp.json())
  .then (json =>{json.forEach(pups => showMeDaPups(pups))})
  }
  function showMeDaPups(pups){
    let dogBar = document.getElementById('dog-bar')
    let names = document.createElement('h4')
    names.dataset.id = pups.id
    names.innerHTML =`<span>${pups.name}</span>`
    dogBar.append(names)
  }

  let dogBar = document.getElementById('dog-bar') 
  dogBar.addEventListener('click',function(e){
    if(e.target.localName == "span"){
   const oneDoggo = () =>{fetch(`http://localhost:3000/pups/${e.target.parentNode.dataset.id}`)
   .then (resp => resp.json())
   .then (json => showMeOnePup(json))
   } 
    
  let dogBio = document.getElementById("dog-info")

   function showMeOnePup(pup) {
    if (pup.isGoodDog == true){ goodBad = "Good Dog!"}
    else if(pup.isGoodDog == false){ goodBad = "Bad Dog!"}
    dogBio.dataset.id = pup.id
    dogBio.innerHTML=`<img src=${pup.image}>
    <h2>${pup.name}</h2>
    <button>${goodBad}</button>`}   
  oneDoggo()
  showMeOnePup()
  }})

  let dogBio = document.getElementById("dog-info")
  dogBio.addEventListener('click',function(e){
if(e.target.innerText == "Bad Dog!"){
 fetch(`http://localhost:3000/pups/${e.target.parentNode.dataset.id}`,{method: "PATCH",
 headers: {
  'Content-Type': 'application/json', //json format
},
 body: JSON.stringify({
 isGoodDog: true
 }),
 
})
.then(response => response.json())
.then(json => console.log(json))
 }
 else if(e.target.innerText == "Good Dog!"){
  fetch(`http://localhost:3000/pups/${e.target.parentNode.dataset.id}`,{method: "PATCH",
 headers: {
  'Content-Type': 'application/json', //json format
},
 body: JSON.stringify({
 isGoodDog: false
 }),
 
}) 
.then(response => response.json())
.then(json => console.log(json))
}
   })   

doggos()
showMeDaPups()

})