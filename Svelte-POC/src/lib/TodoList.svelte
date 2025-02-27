<!-- ------Telling compiler that will not update the component it will always recieve the new todo array---- -->
<svelte:options immutable={true}/>

<script>
// @ts-nocheck

  import Button from "./button.svelte";
  import {v4 as uuid } from 'uuid'
  import {createEventDispatcher, afterUpdate} from 'svelte'
  import { slide, crossfade, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import FaRegTrashAlt from 'svelte-icons/fa/FaRegTrashAlt.svelte';

    export let todos = null;
    export let error = null;
    export let isLoading = false;
    export let disableAdding = false;
    export const disabledItems = [];
    let prevTodos = []
    let inputText = '';
    let input 
    let listDiv, autoScroll;
    const [send , recieve] = crossfade({
        duration:400,
        fallback: (node) => {
            return scale(node, {start:0.5, duration:300})
        }
    })

    $: done = todos ? todos.filter(t => t.completed) : [];
    $: todo = todos ? todos.filter(t => !t.completed) : [];
    
    export function clearInput (){
        inputText=''
    }

    export function focusInput (){
        input.focus()
    }
    
    afterUpdate(() => {
        if(autoScroll){
            listDiv.scrollTo(0, listDiv.scrollHeight)
        }
        autoScroll = false
    }
    )

    $: {
        autoScroll = todos && prevTodos && prevTodos.length < todos.length 
        prevTodos = todos
    }


    const dispatch = createEventDispatcher();

	function handleAddTodo() {
		if(!inputText) return;
// -----------------------------------------------------------------
        // 1st way
        // todos.push({
        //     id: uuid(),
        //     title:inputText,
        //     completed:false
        // })
        // // We need to use assignment operator to update the Todos state whenever dealing with object & arrays
        // todos = todos;


        // 2nd way
        // todos = [...todos , {
        //     id: uuid(),
        //     title:inputText,
        //     completed:false
        // }]
// ---------------------------------------------------------------
//Title :- Will be using custom events passed to parent to handle all works done related to todos in single place
       const isNotCancelled = dispatch('addTodo', {
            title: inputText
        }, {cancelable: true })

        if(isNotCancelled){
            inputText=''
        }
	}

    function handleRemoveTodo(id){
        dispatch('removeTodo', {
            id
        })
    }

    function handleToggleTodo(id , value){
        dispatch('toggleTodo', {
            id,
            value
        })
    }
</script>

<main style="width: 100%">
    <!-- <ul>
        {#each todos as todo, index (todo.id) } 
        {@const number = index + 1}
        <li>{number}- {todo.title}</li>
        {/each}
    </ul> -->
    <!-- destructure the object -->
    {#if isLoading}
        <p>Loading...</p>
    {:else if error}
        <p>{error}</p>
    {:else if todos}
        <div class="list" bind:this={listDiv}>
            {#if todos.length === 0}
                <p class="no-items-text">No Todo yet</p>
            {:else}
                <div style="display: flex; height:79vh">
                    {#each [todo, done] as list, index}    
                        <div class="list-wrapper">
                            <h2>{index === 0 ? 'Todo' : 'Done'}</h2>
                            <ul>
                                {#each list as todo, index (todo.id) } 
                                {@const number = index + 1}
                                {@const {id , title, completed} = todo}
                                <li animate:flip={{ duration: 300 }}>
                                    <slot {todo}>
                                        <div class:completed in:recieve|local={{ key: id }} out:send|local={{ key: id }}>
                                            <label class='li-label'>
                                                <input 
                                                type="checkbox"  
                                                disabled= {disabledItems.includes(id)}
                                                checked={completed} 
                                                on:input={(e) => {
                                                    e.currentTarget.checked = completed;
                                                    handleToggleTodo(id , !completed)
                                                }}
                                                />
                                                {number}- {title}
                                            </label>
                                            <button 
                                            class="remove-todo-button"
                                            disabled= {disabledItems.includes(id)}
                                            aria-label="Remove todo: {title}" 
                                            on:click={() => handleRemoveTodo(id)}>
                                                <span style:width="10px" style:display="inline-block">
                                                    <FaRegTrashAlt />
                                                </span>
                                            </button>
                                        </div>
                                    </slot>
                                </li>
                                {/each}
                            </ul>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
    <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
        <!-- 1st method to bind a varaible to form input -->
        <input type="text" bind:value={inputText} bind:this={input} disabled={disableAdding || !todos} placeholder="New Todo"> 
         <!-- 2nd method to bind with callback is old method will use 1st method as sevlte will do things for us -->
         <!-- <input type="text" on:input={(e) => {inputText = e.currentTarget.value}}> -->
        <Button type='submit' disabled={!inputText || disableAdding || !todos}>Add</Button>
    </form>
</main>

<style>
.list{
    max-height: 200px;
    overflow: auto;
    background-color: #4b4b4b;
    min-height: fit-content;
    border: 1px solid #4b4b4b;
    max-height: 70vh;

}
.no-items-text {
      margin: 0;
      padding: 1rem;
      text-align: center;
}
ul {
    margin: 0;
    padding: 0.625rem;
    list-style: none;
}
li > div{
    margin-bottom: 0.375rem;
    display: flex;
    align-items: center;
    background-color: #222;
    border-radius: 0.375rem;
    color: #fff;
    padding: 0.625rem;
    position: relative;
    &.completed > .li-label {
        opacity: 0.5;
        text-decoration: line-through;
    }
}
.li-label{
    cursor: pointer;
    font-size: 1.125rem;
    display: flex;
    align-items: baseline;
    padding-right: 50px;

    input[type='checkbox'] {
        margin: 0 10px 0 0;
        cursor: pointer;
    }
}
.remove-todo-button {
    padding: 0.375rem;
    position: absolute;
    right: 0.625rem;
    cursor: pointer;
    background-color: rgb(248, 176, 176);
    &:disabled{
        opacity: 0.4;
        cursor: not-allowed;
    }
}

.add-todo-form {
  padding: 1rem;
  background-color: #4b4b4b;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #4b4b4b;
  margin-top: 0.5rem;
}
input {
    flex: 1;
    background-color: #222;
    border: 1px solid #4b4b4b;
    padding: 0.625rem;
    color: #fff;
    border-radius: 0.375rem;
    margin-right: 0.625rem;
}
.list-wrapper{
    display: flex;
    flex-direction: column;
    color:#fff;
    h2{
        display: flex;
        margin:1rem 0.5rem 0
    }
}
.completed > label {
    opacity: 0.5;
    text-decoration: line-through;
}
</style>