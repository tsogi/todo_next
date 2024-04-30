export default function Input({ inputValue, setInputValue }){
    function handleInputChange(event){
        let inputText = event.target.value;
        setInputValue(inputText);
    }

    return <input class="textInput" onChange={handleInputChange} value={inputValue} type="text" placeholder="Enter todo here" />
}