<script setup>
const runtimeConfig = useRuntimeConfig()
const supabase = useSupabaseClient()

useSeoMeta({
  title: `สมัครสมาชิก - ${runtimeConfig.public.SiteName}`,
  ogTitle: `สมัครสมาชิก - ${runtimeConfig.public.SiteName}`
})

definePageMeta({
  middleware: 'auth',
  layout:'auth'
})

const errorMessage = ref(false)
const username = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")

const signUpWithEmailPassword = async () => {
  if (username.value && email.value && password.value && confirmPassword.value) {
    if (password.value === confirmPassword.value) {
      errorMessage.value = false
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options:{
          data:{
            display_name: username.value
          }
        }
      })
      if (error) {
        switch (error.message) {
          case "Password should be at least 6 characters." :
            errorMessage.value = "รหัสผ่านต้องมีเกิน 6 ตัวอักษร"
            break
          case "User already registered":
            errorMessage.value = "มีบัญชีนี้อยู่แล้ว"
            break
          default:
          errorMessage.value = error.message
        }
      }else {
        navigateTo("/")
      }
    } else {
      errorMessage.value = "รหัสผ่านที่กรอกไม่ตรงกัน"
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
        <h1 class="text-center mt-5"><b>สมัครสมาชิก</b></h1>
        <div class="alert alert-danger mt-3" role="alert" v-show="errorMessage">
          {{ errorMessage }}
        </div>
        <div class="my-4">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInputUsername" placeholder="example123"
              v-model="username">
            <label for="floatingInput">ชื่อผู้ใช้</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com"
              v-model="email">
            <label for="floatingInput">อีเมล</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
            <label for="floatingPassword">รหัสผ่าน</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingConfirmPassword" placeholder="Password"
              v-model="confirmPassword">
            <label for="floatingPassword">ยืนยันรหัสผ่าน</label>
          </div>
          <div class="row justify-content-center g-2 mt-3">
            <div class="col-auto"><button class="btn btn-success" @click="signUpWithEmailPassword">สมัครสมาชิก</button>
            </div>
            <div class="col-auto">
              <NuxtLink class="btn btn-secondary" to="/auth/signin">เข้าสู่ระบบ</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>