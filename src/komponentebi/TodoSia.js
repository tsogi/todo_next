"use client";

import { useEffect, useState } from "react";
import { deleteTodoOnBackend, editIsChecked } from "@/services/data";

export default function TodoSia({ todosList, reloadTodosList }){
    useEffect(async () => {
        await reloadTodosList();
    }, []);

    async function deleteTodo(todoId){
        await deleteTodoOnBackend(todoId);
        await reloadTodosList();
    }

    async function handleCheckboxClick(isChecked, todoId){
        await editIsChecked(todoId, isChecked);
        await reloadTodosList();
    }

    return <div class="todoList">
        {
            todosList.map((todo) => {
                return <div class="todoItem">
                        <div class="todoCheckbox">
                            <input checked={todo.completed ? true : false} onChange={(event) => { handleCheckboxClick(event.target.checked, todo._id) }} type="checkbox" data-todoid="762" />
                        </div>
                        <div class="todoName">{ todo.task }</div>
                        <div class="actions">
                            <span class="btnEdit">Edit</span>
                            <span class="btnDelete" onClick={ () => { deleteTodo(todo._id) } }>Delete</span>
                        </div>
                    </div>
            })
        }
    </div>
}