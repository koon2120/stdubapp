<script setup>
const runtimeConfig = useRuntimeConfig()
const supabase = useSupabaseClient()

useSeoMeta({
  title: `เข้าสู่ระบบ - ${runtimeConfig.public.SiteName}`,
  ogTitle: `เข้าสู่ระบบ - ${runtimeConfig.public.SiteName}`
})

definePageMeta({
  middleware: 'auth',
  layout:'auth'
})

const errorMessage = ref(false)
const email = ref("")
const password = ref("")

const signInWithEmailPassword = async () => {
  if (email.value && password.value) {
    errorMessage.value = false
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) {
      switch (error.message) {
        case "Invalid login credentials":
          errorMessage.value = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
          break
        default:
          errorMessage.value = error.message
      }
    } else {
      navigateTo("/")
    }
  } else {
    errorMessage.value = "โปรดใส่ข้อมูลให้ครบ"
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mt-5"><b>เข้าสู่ระบบ</b></h1>
        <div class="mt-5">
          <div class="alert alert-danger mt-3" role="alert" v-show="errorMessage">
            {{ errorMessage }}
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="email">
            <label for="floatingInput">อีเมล</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
            <label for="floatingPassword">รหัสผ่าน</label>
          </div>
          <div class="row justify-content-center g-2 mt-3">
            <div class="col-auto"><button class="btn btn-success" @click="signInWithEmailPassword">เข้าสู่ระบบ</button>
            </div>
            <div class="col-auto">
              <NuxtLink class="btn btn-secondary" to="/auth/signup">สมัครสมาชิก</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>