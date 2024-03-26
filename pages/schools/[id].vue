<template>
  <SchoolProfile :profile="profile" :items="items" />
  <div class="mt-4 sm:mt-0 sm:flex-none sm:w-1/6">
    <SelectMenu label-text="Year" :choices="yearChoices" :selected="selectedYear" v-model="selectedYear" />
  </div>
  <BallotHistory :ballotHistoryData="ballotHistoryData" :year="selectedYear.name"/>
  <ReviewModal :school-id="id"/>
</template>
  
<script setup>
import { $on } from 'vue-happy-bus'
const route = useRoute();
const id = route.params.id;
const yearChoices = ref([{ name: '2023' }])

const ballotHistoryData = ref([])
// const ballotHistoryFormatted = ref([])
const profile = ref({})
const selectedYear = ref({ name: '2023' })
const reviews = ref(null)

$on('selectedYear', (year) => {
  selectedYear.value = String(year)
})

const resp = await useFetch('/api/list_school')
profile.value = resp.data.value.filter(x => x.school_id == id)[0]

useFetch(`/api/ballot/${id}`).then((resp) => {
  const data = resp.data.value
  ballotHistoryData.value = data
  const allYears = data.map(x => x.year).filter(onlyUnique).sort().reverse()
  yearChoices.value = allYears.map(x => Object({ name: x }))
})

const items = computed(() => {
  return [
    {
      title: 'School List',
      disabled: false,
      href: '/',
    },
    {
      title: profile.value.area,
      disabled: false,
      href: `/area/${profile.value.area.toLowerCase()}`,
    },
    // {
    //   title: profile.value.name,
    //   disabled: true,
    //   href: '',
    // },
  ]
})

</script>