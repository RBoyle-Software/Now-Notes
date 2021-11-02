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
  const textDiv = document.createElement('div');

  const messTextDiv = document.createElement('span');
  messTextDiv.classList.add('postedMessages');
  messTextDiv.innerText = msg.message;
  textDiv.append(messTextDiv);
  
  const timeStamp = document.createElement('span');
  timeStamp.classList.add('timeStamps');
  timeStamp.innerText = `Posted: ${msg.created_at}`;
  textDiv.append(timeStamp);

  newNoteElement.append(textDiv);
  textDiv.classList.add('textDiv');
  
  const messDeleteButton = document.createElement('button');
  messDeleteButton.classList.add('deleteButtons');
  messDeleteButton.onclick = deleteMessage;
  messDeleteButton.innerText = 'Delete';
  newNoteElement.append(messDeleteButton);

  const messIdDiv = document.createElement('div');
  messIdDiv.classList.add('idNumbers');
  messIdDiv.innerText = msg._id;
  messIdDiv.style.display = 'none';
  messDeleteButton.append(messIdDiv);

  messageList.append(newNoteElement);
};


// select the Save button and add click listener
const saveButton = document.querySelector('#save').addEventListener('click', postNewMessage);




// when the "Save" button is clicked
function postNewMessage() {
  const content = document.querySelector('#desc').value;
  const password = document.querySelector('#pass').value;
  const messBody = {
    'message': content,
    'password': password
  };

  (async function postNew () {
    fetch('/messages', {
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


// when the "Delete" button is clicked
function deleteMessage() {
  const toDelete = { _id: this.childNodes[1].innerText };

  (async function deletePost() {
    fetch('/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toDelete)
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