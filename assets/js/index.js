// select the unordered list of all messages
const messageList = document.querySelector('#message-list');


// immediately fetch all messages currently in the database
(async function fetchAllMessages() {
  const response = await fetch('/messages');
  const allMessages = await response.json();
  console.log(allMessages);
  
  allMessages.forEach((mess) => {
    appendMessage(mess);
  });
})();


// helper to create and append new list item for each database entry
const appendMessage = (msg) => {
  const messageList = document.querySelector('#message-list');

  const newNoteElement = document.createElement('li');

  const messTextDiv = document.createElement('div');
  messTextDiv.classList.add('postedMessages');
  messTextDiv.innerText = msg.message;
  newNoteElement.append(messTextDiv);

  const messDeleteButton = document.createElement('button');
  messDeleteButton.innerText = 'Delete';
  newNoteElement.append(messDeleteButton);

  const messIdDiv = document.createElement('div');
  messIdDiv.innerText = msg._id;
  messIdDiv.style.display = 'none';
  newNoteElement.append(messIdDiv);

  messageList.append(newNoteElement);
};


// poll for new messages every two seconds
// setInterval(() => fetchNewMessages(), 2000);




// // when the "Save" button is clicked
// function saveNewNote() {
//   // select the password and description elements
//   const entryPass = document.querySelector('#pass');
//   const entryDesc = document.querySelector('#desc');
//   // store the user-entered password and description as an object
//   const newNote = ( { password: entryPass.value, description: entryDesc.value } );
//   console.log(newNote);
// }

// // when the "Delete" button is clicked
// function deleteNote() {
//   // select the note id
  
// }