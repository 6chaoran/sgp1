<template>
    <div class="-mx-4">
    <v-breadcrumbs :items="items" color="indigo-darken-3" divider="/"> <span class="text-gray-600">&nbsp;&nbsp;/</span>
      <template v-slot:prepend>
        <v-icon size="small" icon="mdi-home" color="indigo-600"></v-icon>
      </template>
    </v-breadcrumbs>
  </div>
    <div class="px-0 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900 text-indigo-600">{{ profile.name }}
                    <span v-if="profile['type_gep']"
                        class="inline-flex items-center rounded-full bg-purple-50 mx-2 px-2 py-1 text-xs font-medium text-purple-600 ring-1 ring-inset ring-purple-500/10">
                        GEP
                    </span>
                    <span v-if="profile.type_sap"
                        class="inline-flex items-center rounded-full bg-purple-50 mx-2 px-2 py-1 text-xs font-medium text-purple-600 ring-1 ring-inset ring-purple-500/10">
                        SAP
                    </span>
                    <span v-if="profile['type_girls-only']"
                        class="inline-flex items-center rounded-full bg-pink-50 mx-2 px-2 py-1 text-xs font-medium text-pink-600 ring-1 ring-inset ring-pink-500/10">
                        Girls Only
                    </span>
                    <span v-if="profile['type_boys-only']"
                        class="inline-flex items-center rounded-full bg-blue-50 mx-2 px-2 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-500/10">
                        Boys Only
                    </span>
                </h1>
                <div class="mt-2">
                    <v-icon icon="mdi-map-marker" size="small" color="gray-600" class="pa-1 mr-2"></v-icon><span
                        class="mt-2 text-sm text-gray-700">{{ profile.address }} &nbsp; | &nbsp; <NuxtLink
                            :to="profile.website" target="_blank" class="underline">Website</NuxtLink></span>
                </div>
                <div class="mt-3">
                    <Rating :reviews="reviews" />
                </div>
            </div>
        </div>


</div></template>

<script setup>

const props = defineProps({
    profile: Object,
    reviews: Array,
    items: Array,
})

</script>
