<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})

if (props.error?.statusCode == 500) {
    console.log("not found")
    useCookie('sb-repeniolomqnjmxljidk-auth-token').value = null
    useCookie('sb-repeniolomqnjmxljidk-auth-token-code-verifier').value = null
    useCookie('sb-repeniolomqnjmxljidk-auth-token.0').value = null
    useCookie('sb-repeniolomqnjmxljidk-auth-token.1').value = null
}
</script>

<template>
    <NuxtLayout name="auth">
        <SomethingError :title="'เกิดข้อผิดพลาด '+error?.statusCode" :description="error?.message"
        image="https://www.icegif.com/wp-content/uploads/2024/02/icegif-825.gif" />
    </NuxtLayout>
</template>