<script setup>
const runtimeConfig = useRuntimeConfig()

useSeoMeta({
  title: `ลืมรหัสผ่าน - ${runtimeConfig.public.SiteName}`,
  ogTitle: `ลืมรหัสผ่าน - ${runtimeConfig.public.SiteName}`
})

definePageMeta({
  layout:'auth'
})
</script>

<template>
    <SomethingError title="คุณเข้าหน้านี้ไม่ได้นะ!" description="หากคุณต้องการเข้าหน้านี้จริงๆ โปรดติดต่อผู้ดูแลระบบ"
    image="https://media1.tenor.com/m/9fV87rRDzDgAAAAC/ansubin0925hellomynameissoobin.gif" />
</template>