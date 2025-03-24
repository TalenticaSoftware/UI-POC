import { writable, type Writable } from 'svelte/store'

export function useStorage<Value>(
  key: string,
  initialValue: Value,
): Writable<Value> {
  let serialize = JSON.stringify
  let deserialize = JSON.parse
  console.log(initialValue)
  // get stored value
  let storedValue
  try {
    const item = localStorage.getItem(key)
    storedValue = item ? deserialize(item) : initialValue
  } catch (error) {
    console.error('Failed to parse stored value:', error)
    storedValue = initialValue
  }

  // if value exists return it otherwise use initial value
  let store = writable(storedValue ? storedValue : initialValue)
  // subscribe to the store and update local storage when it changes
  store.subscribe((value) => localStorage.setItem(key, serialize(value)))

  return store
}
