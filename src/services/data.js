let localServerUrl = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL; // http://localhost:3000/api/todos

export async function getTodosFromBackend(){
    let response = await fetch(`${localServerUrl}/getAllTodos`);
    let todos = await response.json();

    return todos;
}

export async function createTodoOnBackend(apiUrl, inputValue){
    await fetch(`${localServerUrl}/add`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: inputValue }), // inputValue = "test todo 2"
        }
    )
}

export async function deleteTodoOnBackend(apiUrl, todoId){
    await fetch(`${localServerUrl}/delete/${todoId}`, 
        {
            method: 'POST',
        }
    )
}

export async function editIsChecked(apiUrl, todoId, isChecked){
    await fetch(`${localServerUrl}/edit/${todoId}`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: isChecked }),
        }
    )
}