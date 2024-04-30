"use client";

import "./main.css";
import TodoSia from "../komponentebi/TodoSia";
import { useState } from "react";
import CreateTodo from "@/komponentebi/CreateTodo";

export default function Home() {
  const [apiUrl, setApiUrl] = useState("https://app-servers.io/api/todos");
  const [todosList, setTodosList] = useState([]);

  async function reloadTodosList(){
      let response = await fetch(apiUrl);
      let todos = await response.json();
      setTodosList(todos);
  }

  return (
    <div class="container">
        <div class="todoApp">
            <div class="todoHeader">
                Todos (<span class="todosCount">{todosList.length}</span>)
            </div>
            <div class="todoBody">
              <CreateTodo reloadTodosList={reloadTodosList} setTodosList={setTodosList} serverUrl={apiUrl} />
              <TodoSia apiUrl={apiUrl} todosList={todosList} setTodosList={setTodosList} reloadTodosList={reloadTodosList} />
            </div> 
        </div>
    </div>
  );
}