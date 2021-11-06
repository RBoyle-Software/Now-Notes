// select password default, description default, unordered list of all messages
const messageList = document.querySelector('#message-list');
const passwordDefault = document.querySelector('#pass');
const descDefault = document.querySelector('#desc');

// select container element and automate opacity
const container = document.getElementById('container');
setTimeout((() => {
  container.style.opacity = 1;
}), 300);


// immediately fetch and display all messages currently in the database
fetchMessages();

async function fetchMessages() {
  const response = await fetch('/messages', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const allMessages = await response.json();
  console.log('Fetching All Messages');

  allMessages.forEach((mess) => {
    prependMessage(mess);
  });
}


// poll for new messages every two seconds
setInterval(() => updateMessages(), 300);

async function updateMessages() {
  const response = await fetch('/messages', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  const allMessages = await response.json();
  const allDeletes = document.querySelectorAll('.deleteButtons');

  if (allMessages.length > allDeletes.length) {
    prependMessage(allMessages[allMessages.length - 1]);
  }
}


// helper to create and append new list item for each database entry
function prependMessage(msg) {
  const newNoteElement = document.createElement('li');
  newNoteElement.classList.add('list-item');
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

  messageList.prepend(newNoteElement);
}


// select the Save button and add click listener
const saveButton = document.querySelector('#save').addEventListener('click', postNewMessage);
descDefault.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    postNewMessage();
  }
});


// when the Save button is clicked
function postNewMessage() {
  const content = document.querySelector('#desc').value;
  const password = document.querySelector('#pass').value;
  const messBody = {
    'message': content,
    'password': password
  };

  fetch('/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messBody),
  })
    .then(response => {
      response.json();
      console.log('Saved a Message');
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  passwordDefault.value = '';
  descDefault.value = '';
}


// when the Delete button is clicked
function deleteMessage() {
  const idToDelete = this.childNodes[1].innerText;

  (async function deletePost() {
    fetch(`/messages/${idToDelete}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        response.json();
        console.log('Deleted a Message');
      })
      .catch((error) => {
        console.error('Error', error);
      });
  })();

  const deleteEntry = this.parentNode;
  messageList.removeChild(deleteEntry);
}
