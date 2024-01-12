<template>  
  <div>
    <h2 class="font-semibold text-indigo-600">Intro
      <span><v-icon :class="['transition', showIntro ? '' : 'rotate-180']" icon="mdi-chevron-double-down"
          color="indigo-600" size="20px" @click="showIntro = !showIntro"></v-icon></span>
    </h2>
    <div v-show="showIntro" class="text-sm">
      <p> I know, I know "every primary school is a good school", but kiasu parents still cautiously plan their strategies
        for their little ones' primary one registration.
        Some quetisons are appareantly brother the parents.
        Shall I join the parent voluneer program now to secure the 2B round ?
        Shall I move to another district that is less competitive in P1 application? </p>
      <p>I hope this is the tool, that should provide some number insights to help with your important decisions. Lastly,
        may your kid goes to the dream school, as you wish!</p>

    </div>

  </div>
  <v-divider class="my-3"></v-divider>
    <div class="flex flex-row space-x-1">
    <div class="w-1/2 sm:w-1/2">
      <SelectMenu label-text="Area" :choices="areaChoices" :selected="selected.area" v-model="selected.area" />
    </div>
    <div class="w-1/6 sm:w-1/6">
      <SelectMenu label-text="SAP" :choices="sapChoices" :selected="selected.sap" v-model="selected.sap" />
    </div>
    <div class="w-1/6  sm:w-1/6">
      <SelectMenu label-text="GEP" :choices="gepChoices" :selected="selected.gep" v-model="selected.gep" />
    </div>
    <div class="w-1/6  sm:w-1/10 sm:block">
      <SelectMenu label-text="Affil." :choices="affilChoices" :selected="selected.affil" v-model="selected.affil">
      </SelectMenu>
    </div>
  </div>
      <div class="w-full mt-1.5 sm:w-1/2 ">
      <v-autocomplete variant="outlined" density="compact" label="School" rounded="lg" color="indigo" clearable
        :items="schoolList" v-model="selected.school" ></v-autocomplete>
    </div>

  
  <div class="mt-3 ml-1">
    {{ schoolsForDisplay.length }} schools are selected
  </div>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="school in schoolsForDisplay" :key="school.school_id" class="relative flex justify-between gap-x-6 py-5">
      <div class="flex gap-x-4">
        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" loading="lazy" width="48px" height="48px"
          :src="school.logo_url2 ? '/school_logo/' + school.logo_url2 : school.logo_url" :alt="'logo of ' + school.name" />
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            <a :href="`/schools/${school.school_id}`">
              <span class="absolute inset-x-0 -top-px bottom-0" />
              {{ school.name }}
            </a>
            <span v-if="school['type_gep']"
              class="inline-flex items-center rounded-full bg-purple-50 mx-2 px-2 py-1 text-xs font-medium text-purple-600 ring-1 ring-inset ring-purple-500/10">
              GEP
            </span>
            <span v-if="school.type_sap"
              class="inline-flex items-center rounded-full bg-purple-50 mx-2 px-2 py-1 text-xs font-medium text-purple-600 ring-1 ring-inset ring-purple-500/10">
              SAP
            </span>
            <span v-if="school['type_girls-only']"
              class="inline-flex items-center rounded-full bg-pink-50 mx-2 px-2 py-1 text-xs font-medium text-pink-600 ring-1 ring-inset ring-pink-500/10">
              Girls
            </span>
            <span v-if="school['type_boys-only']"
              class="inline-flex items-center rounded-full bg-blue-50 mx-2 px-2 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-500/10">
              Boys
            </span>
            <span v-if="school['affiliations']"
              class="inline-flex items-center rounded-full bg-blue-50 mx-2 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10">
              Affil. 
            </span>
            <v-tooltip v-if="school['affiliations']" activator="parent" location="right">{{ school['affiliations'] }}</v-tooltip>

          </p>
          <div class="mt-1 flex items-center gap-x-1.5 sm:hidden">
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
              <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p class="text-xs leading-5 text-gray-500">{{ school.area }}</p>
          </div>
          <p class="mt-1 flex text-xs leading-5 text-gray-500">
            {{ school.address }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-x-4">
        <div class="hidden sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-gray-900"><a :href="`${school.website}`"
              class="relative truncate hover:underline">{{ school.website }}</a></p>
          <p v-if="school.role" class="mt-1 text-xs leading-5 text-gray-500">
            <span
              class="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
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
import { getAffilList } from '~/utils/selectionChoices';

const sapChoices = getSapList()
const gepChoices = getGepList()
const areaChoices = getAreaList()
const affilChoices = getAffilList()

const { data } = await useFetch('/api/list_school')
const schools = ref(data.value.filter(x => x.school_id != 'juying'))
const schoolList = computed(() => {
  return schools.value.map(x => x.name)
})
const showIntro = useCookie('showIntro', {
  default: () => (true)
})
const selectedArea = useCookie('selectedArea', {
  default: () => ('All')
})
const selected = ref({
  area: { name: selectedArea.value },
  sap: { name: 'All' },
  gep: { name: 'All' },
  affil: { name: 'All' },
  school: null
})

const schoolsForDisplay = computed(() => {
  const area = selected.value.area.name
  const sap = selected.value.sap.name
  const gep = selected.value.gep.name
  const affil = selected.value.affil.name
  const school = selected.value.school
  let filtered = schools.value
  if (area === 'All') {
    // filtered = schools.value
  } else {
    filtered = schools.value.filter((x) => x.area === area)
    selectedArea.value = area
  }

  if (sap === true) {
    filtered = filtered.filter((x) => x.type_sap)
  } else if (sap === false) {
    filtered = filtered.filter((x) => !x.type_sap)
  } else {

  }

  if (gep === true) {
    filtered = filtered.filter((x) => x.type_gep)
  } else if (gep === false) {
    filtered = filtered.filter((x) => !x.type_sap)
  } else {

  }

  if (affil === true) {
    filtered = filtered.filter((x) => x.affiliations != null)
  } else if (affil === false) {
    filtered = filtered.filter((x) => x.affiliations == null)
  } else {
    
  }

  if (school) {
    filtered = data.value.filter((x) => x.name === school)
  }
  return filtered

})


useHead({
  title: 'SGP1 | P1 school selection companion',
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'canonical', href: 'https://sgp1.ichaoran.com' }],
  meta: [
    {
      name: 'description',
      content: 'The Singapore primary school selection companion for the kaisu parents ...'
    },
    { property: 'og:title', content: 'SGP1' },
    { property: 'og:description', content: 'The Singapore primary school selection companion for the kiasu parents ...' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://sgp1.ichaoran.com' },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:image', content: '/social.jfif' },
  ],
});

</script>