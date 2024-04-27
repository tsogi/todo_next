"use client";

import "./main.css";
import TodoSia from "./komponentebi/TodoSia";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("Initial input");

  async function handleSubmitClick(){
    console.log("Submit clicked", inputValue);
    await fetch('https://app-servers.io/api/todos/add', 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: inputValue }),
      }
    )
  }

  function handleInputChange(event){
    let inputText = event.target.value;
    setInputValue(inputText);
  }

  return (
    <div class="container">
        <div class="todoApp">
            <div class="todoHeader">
                Todos (<span class="todosCount">~</span>)
            </div>
            <div class="todoBody">
                <div class="createTodo">
                    <input class="textInput" onChange={handleInputChange} value={inputValue} type="text" placeholder="Enter todo here" />
                    <button class="submitBtn" onClick={handleSubmitClick}>Submit</button>
                </div>
                <TodoSia />
            </div> 
        </div>
    </div>
  );
}
