<script setup>
const user = useSupabaseUser()

const RecommendedList = ref([
    { title: "โปรเจกต์", description: "จัดการโปรเจกต์ทั้งหมดของ ST Dub Team", link: "/projects" },
    { title: "เสนอโปรเจกต์", description: "อยากลองพากย์อะไร สามารถเสนอเข้ามาได้", link: "/projects/request" },
    { title: "แอปทั้งหมด", description: "แอปทั้งหมดของ ST Dub Team", link: "/apps" },
    { title: "จัดการบัญชีผู้ใข้", description: "เพิ่มหรือแก้ไขข้อมูลของคุณ", link: "/account/manage" },
    { title: "ข้อมูลอื่นๆ", description: "ดูข้อมูลเกี่ยวกับ ST Dub Team", link: "/information" },
])
</script>

<template>
    <div class="mt-4 mb-5">
        <h1 class="sarabun-extrabold">สวัสดีคุณ {{ user.user_metadata.display_name }}!</h1>
        <p>วันนี้คุณต้องการทำอะไรไหม..?</p>
    </div>
    <h3 class="sarabun-bold mb-4">ข้อมูลและการจัดการทั่วไป : </h3>
    <div class="row row-cols-auto g-4 mb-5">
        <div class="col" v-for="recommended in RecommendedList">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title sarabun-bold">{{ recommended.title }}</h5>
                    <p class="card-text sarabun-regular">{{ recommended.description }}</p>
                    <NuxtLink :to="recommended.link" class="btn btn-primary sarabun-semibold">เข้าใช้งาน</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>