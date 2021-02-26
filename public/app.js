// console.log(firebase);

// USER AUTHENTICATION
const auth = firebase.auth();
const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");

const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");

const userDetails = document.getElementById("userDetails");

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.addEventListener("click", () => {
  auth.signInWithPopup(provider);
});

signOutBtn.addEventListener("click", () => {
  auth.signOut();
});

// callback func called whenever user signs in or out
auth.onAuthStateChanged((user) => {
  if (user) {
    // user signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
  } else {
    // not signed in
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = "";
  }
});

// FIRESTORE  – CONNECTING TO DATABASE
const db = firebase.firestore();

const addTodo = document.getElementById("add-todo-btn"); // create thing
const todoList = document.getElementById("todo-list"); // thing list
const todoInput = document.getElementById("add-todo-input");

const handleChange = (event) => {
  return event.target.value;
};

let inputValue;
todoInput.handleChange("change", (event) => (inputValue = event.target.value));
console.log("inputValue", inputValue);
// need 2 things when accessing database from firestore in realtime stream
//  1. Reference to a database location:
let thingsRef;
let unsubscribe; // tell app when to stop listening to realtime stream

// function updateTodo(event) {
//   const db = firebase.firestore();
//   const myPost = db.collection("posts").doc("firstpost");
//   myPost.update({ title: event.target.value });
// }

auth.onAuthStateChanged((user) => {
  if (user) {
    // database reference
    thingsRef = db.collection("todos");
    // createThing.onClick
    addTodo.addEventListener("click", (event) => {
      const { serverTimestamp } = firebase.firestore.FieldValue;
      thingsRef.add({
        uid: user.uid, // User has-many things
        name: inputValue,
        createdAt: serverTimestamp(),
      });
    });
    // onSnapshot runs when data changes
    unsubscribe = thingsRef
      .where("uid", "==", user.uid)
      // .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        // map results to an array of li elements
        const items = querySnapshot.docs.map((doc) => {
          return `<li>${doc.data().name}</li>`;
        });
        todoList.innerHTML = items.join("");
      });
  } else {
    // unsubscribe when the user signs out
    unsubscribe && unsubscribe();
  }
});
