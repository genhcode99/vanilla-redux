import { createStore } from "redux";


//--------------------< function Count >--------------------
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.getElementById("number");

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS"

const countModifier = (count= 0, action) => {
  switch (action.type) {
    case ADD:
      return count +1 ;
    case MINUS:
      return count -1 ;
    default:
      return count;
  };
};


const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};
countStore.subscribe(onChange);


const handleAdd = () => countStore.dispatch({ type: ADD });
const handleMinus = () => countStore.dispatch({ type: MINUS });

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

//--------------------< function To Do >--------------------
const form = document.getElementById("toDo__form");
const input = document.getElementById("toDo__input");
const ul = document.getElementById("toDo__ul");

const ADD_TODO= "ADD_TODO";
const DELETE_TODO= "DELETE_TODO";

const reducer = (state= [], action) => {
  console.log(action);
  switch(action.type) {
    case ADD_TODO:
      return [{text: action.text, id: action.id}, ...state];
    case DELETE_TODO:
      return state.filter(toDo => toDo.id !== action.id );
    default:
      return state;
  };
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const addToDo = (text) => {
  const id = Date.now();
  store.dispatch({type: ADD_TODO, text, id});
};

const deleteToDo = (event) => {
  const id = parseInt(event.target.parentNode.id);
  store.dispatch({type: DELETE_TODO, id})
};

const paintToDos = () => {
  ul.innerHTML = "";
  const toDos = store.getState();
  toDos.forEach(toDo =>{
    const li =document.createElement("li");
    const btn = document.createElement("button");
    li.id = toDo.id;
    li.innerText = toDo.text
    btn.innerText = "DEL";
    btn.type = "button";
    btn.addEventListener("click", deleteToDo);
    li.appendChild(btn);
    ul.appendChild(li);
  })
}

store.subscribe(paintToDos);

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  addToDo(toDo);
};

form.addEventListener("submit", onSubmit);


