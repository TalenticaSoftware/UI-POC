<script lang="ts">
    import type { FiltersType } from '../types/todos'
  
    type SetFilterType = (newFilter: FiltersType) => void
  
    // svelte-ignore export_let_unused
        export let selectedFilter: FiltersType
    // svelte-ignore export_let_unused
        export let setFilter: SetFilterType
    let filters = ['all', 'active', 'completed']
</script>
  
<div class="filters">
{#each filters as filter}
    <button
    on:click={() => setFilter(filter as FiltersType)}
    class:selected={selectedFilter === filter}
    class="filter"
    >
    {filter}
    </button>
{/each}
</div>

<style>
.filters {
    display: flex;
    gap: var(--spacing-4);
}

.filter {
    text-transform: capitalize;
    padding: var(--spacing-4) var(--spacing-8);
    border: 1px solid transparent;
    border-radius: var(--radius-base);
}

.filter:hover {
    border: 1px solid var(--color-highlight);
}

.selected {
    border-color: var(--color-highlight);
}
</style>