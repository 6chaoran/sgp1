<template>
    Hi
    {{ id }}
</template>
<script setup>
const route = useRoute();
const id = route.params.area
</script>