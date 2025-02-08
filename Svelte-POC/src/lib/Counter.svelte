<script>
  export let initialCount = 0; //component props
  export let maxCount = 0;
  let count = initialCount
  function increment () {
    if (count >= maxCount) {
      return;
    }
    count += 1
  }
  // let s = `You have clicked ${count} times` // this wont update even the state updates

  //Reactive Statement : to update the string when state updated
  // Note : Reactive statement expects state value on right side of the statement and order in which states are updated.

  $: s = `You have clicked ${count} times`
  

</script>


<button on:click={increment}>Clicks {count}</button>
<p>{s}</p>