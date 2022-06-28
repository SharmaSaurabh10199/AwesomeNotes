console.log('my awesome notes');
// if user adds a npote, add it to the local storage
let addBtn= document.getElementById('addBtn');
showNotes();
addBtn.addEventListener('click',function(e){
    console.log('clicked')
    let addText= document.getElementById('addText');
    // console.log(addText.value)
    let notes= localStorage.getItem('notes');
    if(notes==null){
        // handle for the first time
        notesObj=[];
    }
    else{
        // retrieve the old notes
        notesObj= JSON.parse(notes);
    }
    console.log(notesObj);
    // add the new note
    notesObj.push(addText.value);
    // save them back in new note
    localStorage.setItem('notes',JSON.stringify(notesObj));
    // empty the text area
    addText.value='';
    showNotes();

})

function showNotes(){
    // retrieve the notes from the local storage
    let notes= localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj= JSON.parse(notes);
    }
    // make the html for all the notes
    let html='';
    notesObj.forEach(function(elem,idx){
        html+=`<div class="noteCard card ny-2 nx-2" style="width: 18rem;">
        <h5 class="card-title">Note ${idx+1}</h5>
        <p class="card-text">${elem}</p>
        
        <button id="${idx}" onclick="Delete(this.id)" class="btn btn-primary">Delete Note</button>
      </div>
    </div>`
    });
    let notesElem= document.getElementById('notes');
    // populate the container with the notes
    if(notesObj.length!=0){
        notesElem.innerHTML=html;
    }
    else{
        notesElem.innerHTML='Please add your first note';
    } 

}
// function to delete a note
function Delete(index){
    // console.log('i m being deleted',index);
    let notes= localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj= JSON.parse(notes);
    }
    // deleting the note from the local storage 
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    // show the updated notes
    showNotes();
}

// functionality to search for the notes:
let search= document.getElementById('searchText');
console.log(search)
search.addEventListener('input',function(){
    // console.log('input fired');
    let inpVal= search.value;
    // select all the notecards
    let noteCards= document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(elem, idx){
        let cardText= elem.getElementsByTagName('p')[0].innerText;
        // console.log(cardText);
        if(cardText.includes(inpVal)){
            // set the properety of note to be searched as block
            elem.style.display='block'
        }
        else{
            // hide rest of the notes
            elem.style.display='none';
        }
    })
    
})