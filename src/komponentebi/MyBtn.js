export default function Button({ serverUrl, inputValue, setTodosList, reloadTodosList }){
    async function handleSubmitClick(){
        await fetch(`${serverUrl}/add`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: inputValue }),
            }
        )

        await reloadTodosList();
        // let response = await fetch(serverUrl);
        // let todos = await response.json();
        // setTodosList(todos);
    }

    return <button class="submitBtn" onClick={handleSubmitClick}>Submit</button>
}