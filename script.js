// JavaScript to handle tab switching and functionalities

function showTab(tabId) {
    // Hide all tab contents
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    // Show the selected tab
    document.getElementById(tabId).style.display = 'block';

    // Update active tab button
    const tabButtons = document.querySelectorAll('.tabs button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.tabs button[onclick="showTab('${tabId}')"]`).classList.add('active');
}

function updateProfile() {
    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;
    const contact = document.getElementById('contact').value;

    // You might want to save this data to a server or local storage
    console.log('Profile updated:', { name, bio, contact });

    // Optionally show an alert or confirmation
    alert('Profile updated successfully!');
}

function addPost() {
    const newPostText = document.getElementById('newPost').value;
    if (newPostText.trim() === '') {
        alert('Post content cannot be empty.');
        return;
    }

    const postContainer = document.createElement('div');
    postContainer.className = 'post';

    const postContent = document.createElement('p');
    postContent.textContent = newPostText;
    postContainer.appendChild(postContent);

    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.onclick = function() {
        alert('Post liked!');
    };
    postContainer.appendChild(likeButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        const newContent = prompt('Edit your post:', postContent.textContent);
        if (newContent !== null) {
            postContent.textContent = newContent;
        }
    };
    postContainer.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        if (confirm('Are you sure you want to delete this post?')) {
            postContainer.remove();
        }
    };
    postContainer.appendChild(deleteButton);

    const postsContainer = document.getElementById('postsContainer');
    postsContainer.appendChild(postContainer);

    document.getElementById('newPost').value = ''; // Clear textarea
}

function startChat(friendName) {
    // Check if a chat with the same friend already exists
    const existingChat = document.querySelector(`.chat-box[data-friend-name="${friendName}"]`);
    if (existingChat) {
        alert(`Chat with ${friendName} is already open.`);
        return; // Exit the function if the chat already exists
    }

    // Create a new chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-box';
    chatContainer.setAttribute('data-friend-name', friendName); // Set an attribute to identify the chat

    const chatHeader = document.createElement('div');
    chatHeader.className = 'chat-header';
    chatHeader.innerHTML = `
        <h3>Chat with ${friendName}</h3>
        <button onclick="closeChat(this)">Close Chat</button>
    `;
    chatContainer.appendChild(chatHeader);

    const messagesContainer = document.createElement('div');
    messagesContainer.className = 'messages';
    chatContainer.appendChild(messagesContainer);

    const messageInput = document.createElement('textarea');
    messageInput.placeholder = 'Type a message...';
    chatContainer.appendChild(messageInput);

    const sendMessageButton = document.createElement('button');
    sendMessageButton.textContent = 'Send';
    sendMessageButton.onclick = function() {
        const messageText = messageInput.value;
        if (messageText.trim() === '') {
            alert('Message cannot be empty.');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = messageText;
        messagesContainer.appendChild(messageDiv);

        messageInput.value = ''; // Clear input field
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
    };
    chatContainer.appendChild(sendMessageButton);

    document.getElementById('privateChats').appendChild(chatContainer);
}



function closeChat(button) {
    const chatBox = button.closest('.chat-box');
    if (confirm('Are you sure you want to close this chat?')) {
        chatBox.remove();
    }
}

function uploadFiles() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    const filesContainer = document.getElementById('filesContainer');

    for (const file of files) {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file';

        const fileName = document.createElement('span');
        fileName.textContent = file.name;
        fileDiv.appendChild(fileName);

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.onclick = function() {
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();
            URL.revokeObjectURL(url);
        };
        fileDiv.appendChild(downloadButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            if (confirm('Are you sure you want to delete this file?')) {
                fileDiv.remove();
            }
        };
        fileDiv.appendChild(deleteButton);

        filesContainer.appendChild(fileDiv);
    }

    fileInput.value = ''; // Clear file input
}
// Function to add a new post
function addPost() {
    const newPostText = document.getElementById('newPost').value;
    if (newPostText.trim() === '') {
        alert('Post content cannot be empty.');
        return;
    }

    const postContainer = document.createElement('div');
    postContainer.className = 'post';

    const postContent = document.createElement('div');
    postContent.className = 'post-content';
    postContent.textContent = newPostText;
    postContainer.appendChild(postContent);

    const likeCounter = document.createElement('div');
    likeCounter.className = 'like-counter';
    likeCounter.textContent = 'Likes: 0';
    postContainer.appendChild(likeCounter);

    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.onclick = function() {
        const currentLikes = parseInt(likeCounter.textContent.split(': ')[1]);
        likeCounter.textContent = `Likes: ${currentLikes + 1}`;
    };
    postContainer.appendChild(likeButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        const newContent = prompt('Edit your post:', postContent.textContent);
        if (newContent !== null) {
            postContent.textContent = newContent;
        }
    };
    postContainer.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        postContainer.remove(); // No confirmation dialog
    };
    postContainer.appendChild(deleteButton);

    const commentForm = document.createElement('div');
    commentForm.className = 'comment-form';
    commentForm.innerHTML = `
        <textarea placeholder="Add a comment..."></textarea>
        <button onclick="addComment(this)">Comment</button>
    `;
    postContainer.appendChild(commentForm);

    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'comments';
    postContainer.appendChild(commentsContainer);

    document.getElementById('postsContainer').appendChild(postContainer);
    document.getElementById('newPost').value = ''; // Clear textarea
}

// Function to add a comment to a post
function addComment(button) {
    const commentText = button.previousElementSibling.value;
    if (commentText.trim() === '') {
        alert('Comment cannot be empty.');
        return;
    }

    const commentsContainer = button.parentElement.nextElementSibling;

    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.textContent = commentText;
    commentsContainer.appendChild(commentDiv);

    button.previousElementSibling.value = ''; // Clear textarea
}

function startChat(friendName) {
    // Open the Chats tab
    showTab('chats');

    // Check if a chat with the same friend already exists
    const existingChat = document.querySelector(`.chat-box[data-friend-name="${friendName}"]`);
    if (existingChat) {
        alert(`Chat with ${friendName} is already open.`);
        return; // Exit the function if the chat already exists
    }

    // Create a new chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-box';
    chatContainer.setAttribute('data-friend-name', friendName); // Set an attribute to identify the chat

    const chatHeader = document.createElement('div');
    chatHeader.className = 'chat-header';
    chatHeader.innerHTML = `
        <h3>Chat with ${friendName}</h3>
        <button onclick="closeChat(this)">Close Chat</button>
    `;
    chatContainer.appendChild(chatHeader);

    const messagesContainer = document.createElement('div');
    messagesContainer.className = 'messages';
    chatContainer.appendChild(messagesContainer);

    const messageInput = document.createElement('textarea');
    messageInput.placeholder = 'Type a message...';
    chatContainer.appendChild(messageInput);

    const sendMessageButton = document.createElement('button');
    sendMessageButton.textContent = 'Send';
    
    // Apply the styles to the send button
    sendMessageButton.style.margin = '5px';
    sendMessageButton.style.padding = '10px';
    sendMessageButton.style.background = '#ccc';
    sendMessageButton.style.color = '#333';
    sendMessageButton.style.border = 'none';
    sendMessageButton.style.borderRadius = '4px';
    sendMessageButton.style.cursor = 'pointer';
    sendMessageButton.style.transition = 'background-color 0.3s, color 0.3s';

    sendMessageButton.onmouseover = function() {
        sendMessageButton.style.background = '#bbb'; // Change background on hover
        sendMessageButton.style.color = '#222'; // Change text color on hover
    };

    sendMessageButton.onmouseout = function() {
        sendMessageButton.style.background = '#ccc'; // Revert background after hover
        sendMessageButton.style.color = '#333'; // Revert text color after hover
    };

    sendMessageButton.onclick = function() {
        const messageText = messageInput.value;
        if (messageText.trim() === '') {
            alert('Message cannot be empty.');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = messageText;
        messagesContainer.appendChild(messageDiv);

        messageInput.value = ''; // Clear input field
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
    };

    chatContainer.appendChild(sendMessageButton);

    document.getElementById('privateChats').appendChild(chatContainer);
}

// Function to close a chat
function closeChat(button) {
    const chatBox = button.closest('.chat-box');
    chatBox.remove(); // No confirmation dialog
}


// Function to upload files
function uploadFiles() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    const filesContainer = document.getElementById('filesContainer');

    for (const file of files) {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file';

        const fileName = document.createElement('span');
        fileName.textContent = file.name;
        fileDiv.appendChild(fileName);

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.onclick = function() {
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();
            URL.revokeObjectURL(url);
        };
        fileDiv.appendChild(downloadButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            fileDiv.remove(); // No confirmation dialog
        };
        fileDiv.appendChild(deleteButton);

        filesContainer.appendChild(fileDiv);
    }

    fileInput.value = ''; // Clear file input
}

// Function to update profile information
function updateProfile() {
    const nameInput = document.getElementById('name');
    const bioInput = document.getElementById('bio');
    const contactInput = document.getElementById('contact');

    const profileName = nameInput.value.trim();
    const profileBio = bioInput.value.trim();
    const profileContact = contactInput.value.trim();

    if (profileName === '' || profileBio === '' || profileContact === '') {
        alert('All fields are required.');
        return;
    }

    // Create a card for the profile
    const profileCard = document.createElement('div');
    profileCard.className = 'profile-card';

    profileCard.innerHTML = `
        <h3>${profileName}</h3>
        <p><strong>Bio:</strong> ${profileBio}</p>
        <p><strong>Contact:</strong> ${profileContact}</p>
    `;

    // Append the card to the profile display section
    const profileDisplay = document.getElementById('profileDisplay');
    profileDisplay.appendChild(profileCard);

    // Make sure the profile display section is visible
    profileDisplay.style.display = 'block';

    // Clear the input fields
    nameInput.value = '';
    bioInput.value = '';
    contactInput.value = '';
}

// Function to switch tabs
function showTab(tabId) {
    // Hide all tab contents
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    // Show the selected tab
    document.getElementById(tabId).style.display = 'block';

    // Update active tab button
    const tabButtons = document.querySelectorAll('.tabs button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.tabs button[onclick="showTab('${tabId}')"]`).classList.add('active');
}


