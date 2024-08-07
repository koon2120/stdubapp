<script setup>
const runtimeConfig = useRuntimeConfig()

useSeoMeta({
  title: runtimeConfig.public.SiteName,
  ogTitle: runtimeConfig.public.SiteName,
  description: runtimeConfig.public.SiteDescription,
  ogDescription: runtimeConfig.public.SiteDescription,
  ogImage: runtimeConfig.public.SiteOgImage,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
