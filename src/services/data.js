export async function getTodosFromBackend(apiUrl){
    let response = await fetch(apiUrl);
    let todos = await response.json();

    return todos;
}

export async function createTodoOnBackend(apiUrl, inputValue){
    await fetch(`${apiUrl}/add`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: inputValue }),
        }
    )
}

export async function deleteTodoOnBackend(apiUrl, todoId){
    await fetch(`${apiUrl}/delete/${todoId}`, 
        {
            method: 'POST',
        }
    )
}

export async function editIsChecked(apiUrl, todoId, isChecked){
    await fetch(`${apiUrl}/edit/${todoId}`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: isChecked }),
        }
    )
}