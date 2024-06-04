import { createTodoOnBackend } from "@/services/data";

export default function Button({ serverUrl, inputValue, setTodosList, reloadTodosList }){
    async function handleSubmitClick(){
        await createTodoOnBackend(inputValue);

        await reloadTodosList();
    }

    return <button class="submitBtn" onClick={handleSubmitClick}>Submit</button>
}