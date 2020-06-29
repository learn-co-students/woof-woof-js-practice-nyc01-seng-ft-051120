let doggo
const getPuppy=()=>{
    fetch("http://localhost:3000/pups")
    .then(resp=> resp.json())
    .then(dogs=>{
        doggo=dogs
        dogs.forEach(element => {
            renderDog(element)
        });
    })
}
const renderDog=dog =>{
const dogCard=document.querySelector('#dog-bar')
const dogSpan=document.createElement('span')
dogSpan.innerHTML=dog.name
dogCard.appendChild(dogSpan)
}

const getInfo=theDog=>{ 
    const dInfo= document.querySelector('#dog-info')  
    const button=document.createElement('button') 
    
    
    dInfo.innerHTML=`<img src='${theDog.image}'>
    <h2>${theDog.name}</h2>`
   
    let dogType='Bad Dog!'
    if(theDog.isGoodDog){
        dogType='Good Dog!'
    }
    button.innerText=dogType
    button.id=`${theDog.id}`
    button.className='change-type'
    
    dInfo.appendChild(button)
    
}
const changeType=button=>{
    let dogType
    if(button.textContent==='Good Dog!'){
        dogType=false
    }
    else{
        dogType=true
    }
    

    fetch(`http://localhost:3000/pups/${button.id}`,{
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: dogType
        })
    })
    .then(resp=>resp.json())
    .then(updatedDog=>{
        console.log(updatedDog)
        updateDog(updatedDog, button)
    })
    .catch(error=>{ console.log(error)}
    
    )
}


const findDog=dog=>{
    
    let theDog 
    doggo.forEach(d=>{
        if(d.name===dog.textContent){
            theDog=d
        }
    })
    console.log(theDog)
    return theDog
}

const updateDog=(updatedDog, button)=>{
    if(updatedDog.isGoodDog){
        button.innerText='Good Dog!'
    }else{button.innerText='Bad Dog!'}
}
const filterDog=()=>{
    fetch("http://localhost:3000/pups")
    .then(resp=> resp.json())
    .then(dogs=>{
        doggo=dogs
        dogs.forEach(element => {
            if(element.isGoodDog){
                renderDog(element)
            }
            
        });
    })
}
const clearDom=()=>{
    dogTab=document.querySelector('#dog-bar')
    while(dogTab.firstChild){
        dogTab.removeChild(dogTab.firstChild)
    }
}
document.addEventListener('DOMContentLoaded', e=>{
    getPuppy()
    
    document.addEventListener('click', e=>{
       
        if(e.target.tagName==='SPAN'){
          getInfo(findDog(e.target))  
        }
        else if(e.target.className==='change-type'){ 
            changeType(e.target)
            
        }
        else if(e.target.id==='good-dog-filter'){
            clearDom()
            filterDog()
            e.target.id='all-dog'
            e.target.textContent='Filter good dogs: On'
        }
        else if(e.target.id==='all-dog'){
            clearDom()
            e.target.id='good-dog-filter'
            e.target.textContent='Filter good dogs: OFF'
            getPuppy()
        }
    })
})