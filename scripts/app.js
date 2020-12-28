// dom queries
const chatList=document.querySelector('.chat-list');
const newChatForm=document.querySelector('.new-chat');
const newNameForm=document.querySelector('.new-name');
const updateMssg=document.querySelector('.update-mssg');
const rooms=document.querySelector('.chat-rooms');
const welcome=document.querySelector('h4');

//add a new chat
newChatForm.addEventListener('submit',e=>{
    e.preventDefault();
    const message=newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(()=>newChatForm.reset())
        .catch(err=>console.log(err));
});

// update username
newNameForm.addEventListener('submit',e=>{
    e.preventDefault();
    //update name via chatroom class
    const newName=newNameForm.name.value.trim();
    chatroom.updateName(newName)
    const welcomeText=`Welcome back ${newName}!`;
    welcome.innerText=welcomeText;
    //reset form
    newNameForm.reset();
    // shown them hide the msg
    updateMssg.innerText=`Your name was updated to ${newName}`;
    setTimeout(()=>updateMssg.innerText='',3000)
});

//update chatroom
rooms.addEventListener('click',e=>{
    if(e.target.tagName==='BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats((chat)=>chatUI.render(chat))
    }
});

// check local storage for a name
const username=localStorage.username ? localStorage.username: 'anonymous';
const welcomeText=`Welcome back ${username}!`;
welcome.innerText=welcomeText;

//class intances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general',username);

//get chats and render
chatroom.getChats(data=>chatUI.render(data));
