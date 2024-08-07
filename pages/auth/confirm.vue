<script setup>
const runtimeConfig = useRuntimeConfig()
const user = useSupabaseUser()

useSeoMeta({
    title: `ตรวจสอบการเข้าสู่ระบบ - ${runtimeConfig.public.SiteName}`,
    ogTitle: `ตรวจสอบการเข้าสู่ระบบ - ${runtimeConfig.public.SiteName}`
})

watch(user, () => {
  if (user.value) {
      return navigateTo('/')
  }else {
    return navigateTo('/auth/signin')
  }
}, { immediate: true })

definePageMeta({
  layout:false
})

definePageMeta({
  layout:'auth'
})
</script>

<template>
    <div class="container">
        <img class="rounded mx-auto d-block mt-5" src="https://media.tenor.com/13VnwKt5qS0AAAAd/waiting.gif"
            width="300rem" alt="gif waiting meme">
        <h1 class="sarabun-bold text-center mt-3">ตรวจสอบการเข้าสู่ระบบ</h1>
        <p class="text-center mt-3">โปรดรอสักครู่...</p>
    </div>
</template>