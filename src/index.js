import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const countModifier = (count= 0) => {
  // # modify
  count ++
  count --
  return count; 
};
const countStore = createStore(countModifier);

console.log(countStore.getState());