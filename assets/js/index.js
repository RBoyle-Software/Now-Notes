
// poll for new messages every two seconds
setInterval(() => loadMessageList(), 2000);


function loadMessageList() {
  console.log('TEST');
}



function displayAllMessages () {
  // select the unordered list element
  
  // iterate over all messages in the database
  for (const message of allMessages) {
    // for each message, append list item element to the unordered list element
    const newNoteElement = document.createElement('li');
    newNoteElement.innerHTML = '<button class="del" id="{message._id}" onclick="deleteNote()">Delete</button>';
    newNoteElement.innerText = message.message;
    messageList.appendChild(newNoteElement);
  }
}

// when the "Save" button is clicked
function saveNewNote() {
  // select the password and description elements
  const entryPass = document.querySelector('#pass');
  const entryDesc = document.querySelector('#desc');
  // store the user-entered password and description as an object
  const newNote = ( { password: entryPass.value, description: entryDesc.value } );
  console.log(newNote);
}

// when the "Delete" button is clicked
function deleteNote() {
  // select the note id
  
}