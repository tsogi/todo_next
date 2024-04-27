"use client";

import { useEffect, useState } from "react";

export default function TodoSia(){
    const [todosState, setTodosState] = useState([]);
    const [apiUrl, setApiUrl] = useState("https://app-servers.io/api/todos")

    useEffect(async () => {
        await refreshTodosState();
    }, []);

    async function refreshTodosState(){
        let response = await fetch(apiUrl);
        let todos = await response.json();
        todos = getUncompletedTodos(todos);
        setTodosState(todos);
    }

    function getUncompletedTodos(todos){
        return todos;
    }

    async function deleteTodo(todoId){
        await fetch(`${apiUrl}/delete/${todoId}`, 
            {
                method: 'POST',
            }
        )

        await refreshTodosState();
    }

    return <div class="todoList">
        {
            todosState.map((todo) => {
                return <div class="todoItem">
                        <div class="todoCheckbox">
                            <input type="checkbox" data-todoid="762" />
                        </div>
                        <div class="todoName">{ todo.task }</div>
                        <div class="actions">
                            <span class="btnEdit">Edit</span>
                            {/* <span class="btnDelete" onClick={deleteTodo.bind(this, todo.id)}>Delete</span> */}
                            <span class="btnDelete" onClick={ () => { deleteTodo(todo.id) } }>Delete</span>
                        </div>
                    </div>
            })
        }
    </div>
}