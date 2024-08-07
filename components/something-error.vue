<script setup>
const props = defineProps(['title','description','image'])
</script>

<template>
    <img class="rounded mx-auto d-block mt-5"
        :src="image" width="300rem"
        alt="gif sad meme">
    <h1 class="sarabun-bold text-center mt-5">{{ props.title }}</h1>
    <p class="text-center mt-3">{{ props.description }}</p>
    <div class="row justify-content-center">
        <div class="col-auto">
            <NuxtLink class="btn btn-outline-primary" to="/">กลับหน้าหลัก</NuxtLink>
        </div>
    </div>
</template>