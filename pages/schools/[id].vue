<template>

    <div class="px-0 sm:px-6 lg:px-8">
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
              <table class="min-w-full divide-y divide-gray-300 table-fixed">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Phase</th>
                    <th v-for="p in cols" scope="col" class="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">{{ p }}</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="(school, i) in ballotHistoryFiltered" :key="i">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 capitalize">{{ school.category }}</td>
                    <td v-for="p in cols" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ school[p] }}</td>
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
const ballotHistoryFormatted = ref([])
const profile = ref({})
const selectedYear = ref('2023')
$on('selectedYear', (year) => {
  selectedYear.value = String(year)
})


useFetch('/api/list_school').then((resp) => {
const data = resp.data.value
profile.value = data.filter( x => x.school_id == id)[0]})

useFetch(`/api/ballot/${id}`).then((resp) => {
  const data = resp.data.value
  ballotHistoryData.value = data
  const allYears = data.map(x => x.year).filter(onlyUnique).sort().reverse()
  yearChoices.value = allYears.map( x => Object({name: x}))
  ballotHistoryFormatted.value = ballotHistoryData.value.map(formatRow)
  // console.log(ballotHistoryFormatted.value)
})

const ballotHistoryFiltered = computed(() => {
  return ballotHistoryFormatted.value.filter( x => x.year == selectedYear.value)
})

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

const formatOdds = (odds) => {
  if (odds){
    return odds === '' ? '-' : (parseFloat(odds) * 100).toFixed(0) + '%'
  } else {
    return '-'
  }
}

const formatBallot = (ballot) =>{
  if(ballot){
    return ballot === '' ? '-' : ballot
  } else {
    return '-'
  }
}

const formatCnt = (count) => {
  if (count){
    return parseInt(count).toFixed(0)
  } else {
    return '-'
  }
 }

const cols = ['1', '2A(1)', '2A(2)', '2B', '2C', '2C(S)', '3']
const formatRow = (row) => {
  const category = row.category
  let phase;
  for (let i = 0; i < cols.length; i++) {
    phase = cols[i]
    if (category === 'odds') {
      row[phase] = formatOdds(row[phase])
    } else if (category === 'ballot') {
      row[phase] = formatBallot(row[phase])
    } else {
      row[phase] = formatCnt(row[phase])
    }
  }

  return row
}


</script>