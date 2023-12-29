<template>
  <div class="flex flex-row">
    <div class="w-1/2 mr-3">    
      <SelectMenu label-text="Area" :choices="areaChoices" emit-id="areaSelected" :selected="selectedArea" />
    </div>
    <div class="w-1/4 mx-3">
      <SelectMenu  label-text="SAP" :choices="sapChoices" emit-id="sapSelected" :selected="selected.sap"/>
    </div>
  </div>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="school in schools" :key="school.school_id" class="relative flex justify-between gap-x-6 py-5">
      <div class="flex gap-x-4">
        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="school.logo_url" alt="" />
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            <a :href="`/schools/${school.school_id}`">
              <span class="absolute inset-x-0 -top-px bottom-0" />
              {{ school.name }}
            </a>
            <span v-if="school.type_sap" class="inline-flex items-center rounded-full bg-purple-50 mx-2 px-2 py-1 text-xs font-medium text-purple-600 ring-1 ring-inset ring-purple-500/10">
              SAP
            </span>
            <span v-if="school['type_girls-only']" class="inline-flex items-center rounded-full bg-pink-50 mx-2 px-2 py-1 text-xs font-medium text-pink-600 ring-1 ring-inset ring-pink-500/10">
              Girls Only
            </span>
            <span v-if="school['type_boys-only']" class="inline-flex items-center rounded-full bg-blue-50 mx-2 px-2 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-500/10">
              Boys Only
            </span>
          </p>
          <p class="mt-1 flex text-xs leading-5 text-gray-500">
            {{ school.address }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-x-4">
        <div class="hidden sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-gray-900"><a :href="`${school.website}`" class="relative truncate hover:underline">{{ school.website }}</a></p>
          <p v-if="school.role" class="mt-1 text-xs leading-5 text-gray-500">
            <span class="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
            <svg class="h-1.5 w-1.5 fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
              <circle cx="3" cy="3" r="3" />
            </svg>
            Badge
          </span>
          </p>
          <div v-else class="mt-1 flex items-center gap-x-1.5">
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
              <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p class="text-xs leading-5 text-gray-500">{{ school.area }}</p>
          </div>
        </div>
        <ChevronRightIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
      </div>
    </li>
  </ul>

</template>

<script setup>
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { $on } from 'vue-happy-bus'

const selectedArea = useCookie('selectedArea')
selectedArea.value = selectedArea.value || 'All'
const selected = ref({
  area: 'All',
  sap: 'All',
})
const sapChoices = getSapList()
const areaChoices = getAreaList()

const { data } = await useFetch('/api/list_school')
const schools = ref(data.value)

onMounted(() => {
  const selectedArea = useCookie('selectedArea')
  selectedArea.value = selectedArea.value || 'All'
  selected.value.area = selectedArea.value
})

$on('areaSelected', (area) => {
  selected.value.area = area
  selectedArea.value = area
})
$on('sapSelected', (sap) => {
  selected.value.sap = sap
})

watch(selected, (n, o) => {
  const area = n.area
  const sap = n.sap
  if (area === 'All' && sap === 'All') {
    schools.value = data.value
  } else if (sap === 'All') {
    schools.value = data.value.filter((x) => x.area === area)
  } else if (area == 'All') {
    schools.value = data.value.filter((x) => x.type_sap === sap)
  } else {
    schools.value = data.value.filter((x) => x.area === area && x.type_sap === sap)
  }
}, { deep: true })





</script>