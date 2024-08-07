<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.log(error)
    } else {
        navigateTo("/auth/confirm")
    }
}

const { data: profileImageUrl } = await useAsyncData('profileImageUrl', () => {
    if (user.value.user_metadata.profileImage) {
        return user.value.user_metadata.profileImage
    } else {
        return '/images/trial-profile.jpg'
    }
})
</script>

<template>
    <header class="noto-sans-thai">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <img src="/images/logo.png" alt="Logo" width="30" style="border-radius: 50%;" class="me-2">
                <NuxtLink class="navbar-brand" href="/"><b>ST Dub App</b></NuxtLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <NuxtLink class="nav-link" aria-current="page" href="/">หน้าหลัก</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink class="nav-link" href="/apps">แอปทั้งหมด</NuxtLink>
                        </li>
                        <li class="nav-item dropdown">
                            <NuxtLink class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                ทั่วไป
                            </NuxtLink>
                            <ul class="dropdown-menu">
                                <li>
                                    <NuxtLink class="dropdown-item" href="/information">ข้อมูลอื่นๆ
                                    </NuxtLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <NuxtLink class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                โปรเจกต์
                            </NuxtLink>
                            <ul class="dropdown-menu">
                                <li>
                                    <NuxtLink class="dropdown-item" href="/projects">โปรเจกต์ทั้งหมด</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink class="dropdown-item" href="/projects/create">สร้างโปรเจกต์</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink class="dropdown-item" href="/projects/request">เสนอโปรเจกต์
                                    </NuxtLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <NuxtLink class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                ช่วยเหลือ
                            </NuxtLink>
                            <ul class="dropdown-menu">
                                <li>
                                    <NuxtLink class="dropdown-item" href="/help/forgot-password">ลืมรหัสผ่าน</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink class="dropdown-item" href="/help/cannot-signin">ไม่สามารถเข้าสู่ระบบได้
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink class="dropdown-item" href="/help/cannot-signup">ไม่สามารถสมัครสมาชิกได้
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink class="dropdown-item" href="/help/cannot-use">ไม่สามารถใช้งานได้
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink class="dropdown-item" href="/help/something-error">เกิดข้อผิดพลาดอื่นๆ
                                    </NuxtLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div class="dropdown">
                        <NuxtLink class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <img :src="profileImageUrl" alt="Logo" width="30" height="30" style="border-radius: 50%;"
                                class="me-2">
                            {{ user.user_metadata.display_name }}
                        </NuxtLink>
                        <ul class="dropdown-menu dropdown-menu-lg-end">
                            <li>
                                <NuxtLink class="dropdown-item" href="/account/manage">จัดการบัญชี</NuxtLink>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <button class="dropdown-item" @click="signOut">ออกจากระบบ</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <main class="container sarabun-medium">
        <slot></slot>
    </main>
</template>