<template>
    <Listbox as="div" v-model="selected">
      <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{ labelText }}</ListboxLabel>
      <div class="relative mt-2">
        <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-5 text-left text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <span class="block truncate capitalize text-sm">{{ mapBoolean(selected.name) }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>
  
        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="(person, id) in choices" :key="id" :value="person" v-slot="{ active, selected }">
              <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-5']">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate capitalize text-sm']">{{ mapBoolean(person.name) }}</span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
  import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

  const props = defineProps({
    labelText: String,
    choices: Array,
    selected: Object,
  })

  const mapBoolean = (x) => {
    if ( x === true ) {
      return 'Yes'
    } else if ( x === false) {
      return 'No'
    } else {
      return x
    }
  }
  

  const selected = ref(props.selected)

  </script>
