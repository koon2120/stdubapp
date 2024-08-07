<script setup>
const runtimeConfig = useRuntimeConfig()

useSeoMeta({
    title: `ข้อมูลทั่วไป - ${runtimeConfig.public.SiteName}`,
    ogTitle: `ข้อมูลทั่วไป - ${runtimeConfig.public.SiteName}`
})

const { data: Information, error: InformationError } = await useFetch('/api/info', {
    headers: useRequestHeaders(['cookie'])
})
</script>

<template>
    <div class="mt-5 mb-5">
        <h1 class="sarabun-extrabold text-center">ข้อมูลทั่วไปเกี่ยวกับ ST Dub Team</h1>
    </div>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="info in Information">
                    <th scope="row">{{ info.title }}</th>
                    <td>{{ info.description }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>