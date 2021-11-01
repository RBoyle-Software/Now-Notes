// select the unordered list of all messages
const messageList = document.querySelector('#message-list');
setTimeout(() => console.log(messageList.childNodes), 500);


// poll for new messages every two seconds
setInterval(() => compareLists(), 2000);

const compareLists = () => {
  console.log(messageList.childNodes.length);
};


// immediately fetch all messages currently in the database
(async function fetchAllMessages() {
  const response = await fetch('/messages', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const allMessages = await response.json();
  console.log(allMessages);
  
  allMessages.reverse().forEach((mess) => {
    appendMessage(mess);
  });
})();


// helper to create and append new list item for each database entry
const appendMessage = (msg) => {
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


// select the Save button and add click listener
const saveButton = document.querySelector('#save').addEventListener('click', postNewMessage);


// when the "Save" button is clicked
function postNewMessage() {
  console.log('SAVE');
  const newMessage = this.parentElement;
  const password = document.querySelector('#pass').value;
  const content = document.querySelector('#desc').value;

  const messBody = {
    'message': content,
    'password': password
  };

  console.log(messBody);

  (async function postNew () {
    const newPost = fetch('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messBody),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  })();

}

// // when the "Delete" button is clicked
// function deleteNote() {
//   // select the note id
// }