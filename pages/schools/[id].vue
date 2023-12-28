<template>

    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">{{ profile.name }}</h1>
          <p class="mt-2 text-sm text-gray-700">{{ profile.area }}</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none sm:w-1/6">
          <SelectMenu label-text="Year" :choices="yearChoices" emit-id="selectedYear"/>          
        </div>
      </div>
      
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <!-- <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Year</th> -->
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Phase</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">1</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">2A</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">2B</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">2C</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">2C(S)</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">3</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="(school, i) in ballotHistoryFiltered" :key="i">
                    <!-- <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ school.year }}</td> -->
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ school.category }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ school["1"] }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ school["2A(1)"] }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ school["2B"] }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ school["2C"] }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ school["2C(S)"] }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ school["3"] }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ school["Total"] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { $on } from 'vue-happy-bus'
const route = useRoute();
const id = route.params.id;
const yearChoices = ref([{name: '2023'}])
const ballotHistoryData = ref([])
const profile = ref({})
const selectedYear = ref('2023')
$on('selectedYear', (year) => {
  selectedYear.value = String(year)
})

useFetch('/api/list_school').then((resp) => {
  const data = resp.data.value
  profile.value = data.filter( x => x.school_id == id)[0]

})

useFetch(`/api/ballot/${id}`).then((resp) => {
  const data = resp.data.value
  ballotHistoryData.value = data
  const allYears = data.map(x => x.year).filter(onlyUnique).sort().reverse()
  yearChoices.value = allYears.map( x => Object({name: x}))
})

const ballotHistoryFiltered = computed(() => {
  return ballotHistoryData.value.filter( x => x.year == selectedYear.value)
})

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}


</script>