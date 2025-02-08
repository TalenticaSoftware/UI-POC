<script>
    // export let title= '';
    export let size='small';
    // export let shadow=false;
    // export let bgColor=undefined;
    // export let textClor=undefined;
    // console.log($$slots) // give the slots passed by parent
     let isLeftHovered=false;
</script>
<!-- slot is used to pass prop as children -->
 <!-- normal way of adding style dynamically -->
<button 
class={size === 'large' ? 'size-lg' : 'size-sm'} 
on:click 
{...$$restProps}
>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="left-content" 
    on:mouseenter={() => isLeftHovered=true} 
    on:mouseleave={() => isLeftHovered=false}>
        <slot name="leftContent" />
    </div>
    <slot {isLeftHovered}>Fallback</slot>
</button> 

<!-- using class directive in diffrent ways -->
<!-- <button class:size-lg={size === 'large'} class:size-sm={size === 'small'} class:shadow>{title}</button>  -->
<!-- using style directive in diffrent ways (*** use css variable to update values directly)-->
<!-- <button style:--button-bg-color={bgColor} style:color={textClor} class:size-lg={size === 'large'} class:size-sm={size === 'small'} class:shadow>{title}</button>  -->


<style>
    :global(body){
        background-color: #f7f6f6;
    }
    button{
        color:#fff;
        border-radius: 0.5rem;
        background-color: rgb(243, 196, 196);
        border: 1px solid #fff;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        &:hover{
            background-color:rgb(195, 51, 51);
        }
        &.size-sm{
            padding: 0.75rem 1rem;
        }
        &.size-lg{
            padding: 1rem 1.5rem;
        }
       &:disabled{
        opacity: 0.4;
        cursor: not-allowed;
       }
        /* &.shadow{
            box-shadow: 0 0 10px rgba(24, 24, 24, 0.3);
        } */
    }
    .left-content{
        margin-right: 10px;
    }
    
</style>