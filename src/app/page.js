"use client";

import "./main.css";
import TodoSia from "../komponentebi/TodoSia";
import { useState } from "react";
import CreateTodo from "@/komponentebi/CreateTodo";
import { getTodosFromBackend } from "@/services/data";

export default function Home(){
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [todosList, setTodosList] = useState([]);

  async function reloadTodosList(){
      let todos = await getTodosFromBackend(apiUrl);

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