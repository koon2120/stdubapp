<script setup>
const runtimeConfig = useRuntimeConfig()

useSeoMeta({
    title: `Script App - ${runtimeConfig.public.SiteName}`,
    ogTitle: `Script App  - ${runtimeConfig.public.SiteName}`
})

const { data: ScriptList, error: ScriptListError } = await useFetch('/api/scripts', {
    headers: useRequestHeaders(['cookie']),
    method: "get"
})
</script>

<template>
    <div class="mt-4 mb-3">
        <h1 class="sarabun-extrabold">ยินดีต้อนรับสู่ ST Dub Script</h1>
        <p>คุณสามารถดูบทพากย์ได้ที่นี่!</p>
    </div>
    <NuxtLink type="button" class="btn btn-primary mb-5" to="/apps/scripts/create">สร้างบทพากย์</NuxtLink>
    <div class="row row-cols-auto g-4 mb-5">
        <div class="col" v-for="onceScript in ScriptList">
            <div class="card" style="width: 18rem;">
                <img :src="onceScript.image ? onceScript.image : '/images/no-image.jpg'" class="card-img-top"
                    :alt="onceScript.title">
                <div class="card-body text-center">
                    <h5 class="card-title sarabun-bold">{{ onceScript.title }}</h5>
                    <NuxtLink :to="{path:'/apps/scripts/view',query:{id:onceScript.id}}" class="btn btn-primary sarabun-semibold">ดูบทพากย์</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>