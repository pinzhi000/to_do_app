// CODE EXPLAINED channel

// Select the Elements

const clear = document.querySelector(".clear"); 
const dateElement = document.getElementById("date"); 
const list = document.getElementById("list"); 
const input = document.getElementById("input"); 

// Classes names

const CHECK = "fa-check-circle"; 
const UNCHECK = "fa-circle-thin"; 
const LINE_THROUGH = "lineThrough"; 

// Variables

let LIST; 
let id;  

// Get item from local storage (i.e. after refreshing page)

let data = localStorage.getItem("TODO"); 


// Check if data is not empty

if(data){
    LIST = JSON.parse(data); 
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); 
}

else{
    LIST = []; 
    id = 0; 
}


// load items to the user's interface (after refresh)

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    }); 
}

// clear the local storage 

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
}); 


// Show todays date

const options = {weekday: "long", month: "short", day: "numeric"}; 
const today = new Date(); 

dateElement.innerHTML = today.toLocaleDateString("en-US", options); 

// add to do function 

function addToDo(toDo, id, done, trash){

    if(trash){ return; } // if trash input parameter is true, do not run rest of code below

    const DONE = done ? CHECK : UNCHECK // if done input parameter is true, run CHECK class; otherwise run UNCHECK class
    const LINE = done ? LINE_THROUGH : ""; 

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}"> ${toDo} </p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                  </li>
                 `; 
    
    const position = "beforeend"

    list.insertAdjacentHTML(position, item); 

}


// add an item to the list using the "enter" key

document.addEventListener("keyup", function(event){

    if (event.keyCode === 13){
        const toDo = input.value
    

        // if input field is not empty
        if (toDo){
            addToDo(toDo, id, false, false); 

            LIST.push({
                name: toDo, 
                id: id,
                done: false,
                trash: false
            }); 

            // Add item to local storage (this code added everywhere we update LIST array)
            localStorage.setItem("TODO", JSON.stringify(LIST)); 
            
            id++; 
        }
        input.value = ""
    }   
}); 

// complete to do 
function completeToDo(element){

    // classList is useful to add, remove and toggle CSS classes on an element

    element.classList.toggle(CHECK); 
    element.classList.toggle(UNCHECK); 
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH); 

    // if done was set to true then make false; if set to false then make true
    LIST[element.id].done = LIST[element.id].done ? false : true; 

}

// remove to do 
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode); 

    LIST[element.id].trash = true; 

}

// target the items created dynamically 

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list 
    const elementJob = element.attributes.job.value; // complete or delete 

    if (elementJob === "complete"){
        completeToDo(element); 
    }

    else if (elementJob === "delete"){
        removeToDo(element); 
    }

    // Add item to local storage (this code added everywhere we update LIST array)
    localStorage.setItem("TODO", JSON.stringify(LIST));
}); 