<script>
  import TodoList from './lib/TodoList.svelte'
  import {v4 as uuid } from 'uuid'
  import { onMount, tick } from "svelte";
  import { fly } from "svelte/transition";

    let todos = null;
    let error = null;
    let isLoading = false;
    let isAdding = false;
    let todoListVar;
    let disabledItems = [];
    let showlist = true;

// ------------------------------Await Block Script----------------------------------------
    // function loadTodo () {
    //   return fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then((res) => {
    //     if(res.ok){
    //       return res.json()
    //     }else{
    //       throw new Error('Error while fetching data')
    //     }
    //   })
    // }
// ---------------------------------Closing Await Block Script---------------------------------



   async function loadTodo() {
    isLoading = true
    await fetch('https://jsonplaceholder.typicode.com/todos?_limit=15').then(async(res) => {
        if(res.ok){
          todos = await res.json()
        }else{
          error = 'Error while fetching data'
        }
      })
    isLoading = false
    }

    onMount(() => {
      loadTodo()
    })

    async function handleAddTodo (event) {
      event.preventDefault();
      isAdding = true
      await fetch('https://jsonplaceholder.typicode.com/todos',{
        method:'POST',
        body:JSON.stringify({
          title:event.detail.title,
          completed:false
        }),
        headers:{
          'Content-type':'application/json',
          'charset':'UTF-8'
        }
      }).then(async(res) => {
        if(res.ok){
          const todo = await res.json();
          const uid = uuid()
          todos = [...todos, {...todo, id:uid, userId:1}]
          todoListVar.clearInput()
        }
      }).catch((error) => alert(error))
      isAdding = false;
      await tick();
      todoListVar.focusInput()
    }

    async function handleRemoveTodo (event) {
      const id = event.detail.id;
      if(disabledItems.includes(id)) return
      disabledItems = [...disabledItems , id]
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
        method:'DELETE',
        headers:{
          'Content-type':'application/json',
          'charset':'UTF-8'
        }
      }).then(async(res) => {
        if(res.ok){
          todos = todos.filter((todo) => todo.id !== id)
        }
      }).catch((error) => alert(error))
      disabledItems.filter((itemId) => itemId !== id )
    }

    async function handleToggleTodo (event){
      const id = event.detail.id;
      const value = event.detail.value;
      if(disabledItems.includes(id)) return
      disabledItems = [...disabledItems , id]
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
        method:'PATCH',
        body:JSON.stringify({
          completed:value
        }),
        headers:{
          'Content-type':'application/json',
          'charset':'UTF-8'
        }
      }).then(async(res) => {
          if(res.ok){
            const updatedTodo = await res.json()
            todos = todos.map((todo) => {
            if(todo.id === id){
              return updatedTodo
            }
            return {...todo}
          });
          }
      }).catch((error) => alert(error))
      disabledItems.filter((itemId) => itemId !== id )
    }
</script>

<main>
  <!-- bind:{value} is used to bind the component prop to varaiable -->


<!-- --------------------------------Await Block Code------------------------- -->
<!-- {#await loadTodo() }
<p>Loading...</p>
{:then todos}
<TodoList 
  bind:this={todoListVar} 
  {todos} 
  on:addTodo={handleAddTodo} 
  on:removeTodo={handleRemoveTodo} 
  on:toggleTodo={handleToggleTodo}
/>
{:catch error }
<p>{error.message || 'An error occured'}</p>
{/await} -->
<!-- ----------------------------------Closing Await Block Code---------------------- -->
  <label class="flexContentCenter">
    <input type="checkbox" bind:checked={showlist} >
    <span >Show/Hide List</span>
  </label>
  {#if showlist}
    <div style="padding-top: 1rem;">
      <TodoList
      bind:this={todoListVar} 
      {todos} 
      {error}
      {isLoading}
      disableAdding = {isAdding}
      {disabledItems}
      on:addTodo={handleAddTodo} 
      on:removeTodo={handleRemoveTodo} 
      on:toggleTodo={handleToggleTodo}
      let:todo
      >
      </TodoList>
    </div>
    {#if todos}
      <p class='flexContentCenter'>No of todos: {#key todos.length}
        <span in:fly|local={{y:-10}}>{todos.length}</span>
      {/key}</p>
    {/if}
  {/if}
</main>

<style>
  .flexContentCenter{
    display: flex;
    justify-content: center;
  }
</style>
