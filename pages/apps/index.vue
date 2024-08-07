<script setup>
const runtimeConfig = useRuntimeConfig()

useSeoMeta({
    title: `แอปทั้งหมด - ${runtimeConfig.public.SiteName}`,
    ogTitle: `แอปทั้งหมด - ${runtimeConfig.public.SiteName}`
})

const appList = ref([
    {title:"ST Dub Script",description:"สร้าง แก้ไข และเก็บบทพากย์ที่นี่",link:"/apps/scripts"},
    {title:"Storage Management",description:"จัดเก็บไฟล์สำหรับแสดงผลบนเว็บนี้",link:"/apps/storage"},
])
</script>

<template>
    <div class="mt-4 mb-4">
        <h1 class="sarabun-extrabold">แอปต่างๆ : </h1>
    </div>
    <div class="row row-cols-auto g-4">
        <div class="col" v-for="app in appList">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title sarabun-bold">{{app.title}}</h5>
                    <p class="card-text sarabun-regular">{{ app.description }}</p>
                    <NuxtLink :to="app.link" class="btn btn-primary sarabun-semibold">เข้าใช้งาน</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>