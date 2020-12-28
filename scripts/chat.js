// adding new documents
// setting up a real time listener to get new chats
// updating username
// updating the room

// set up initial properties of chatroom instance
class Chatroom{
    constructor(room,username){
        this.room=room;
        this.username=username;
        this.chats=db.collection('chats');
        this.unsub;
    }
   // method to add new chat document
   async addChat(message){
       // format chat object
       const now=new Date();
       const chat={
           message,
           username: this.username,
           room: this.room,
           created_at: firebase.firestore.Timestamp.fromDate(now)
       };
       // save chat document
       const response=await this.chats.add(chat);
       return response;
   }
   //real time update
   getChats(callback){
       this.unsub=this.chats
       //get documents from a certain collection where a certain condition is true 
        .where('room','==', this.room)
        //reorder msg based on time created
        .orderBy('created_at')// if got error, click on the link on create index
        .onSnapshot(snapshot=>{
            snapshot.docChanges().forEach(change=>{ 
                if (change.type==='added'){
                    // update the ui
                    callback(change.doc.data());
                }
            }); 
        }); 
   }
   updateName(username){
       this.username=username;
       localStorage.setItem('username',username); 
   }

   updateRoom(room){
       this.room=room;
       console.log('room updated');
       if (this.unsub){
        this.unsub();
       }
   }
}




