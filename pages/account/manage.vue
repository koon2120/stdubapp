<script setup>
const runtimeConfig = useRuntimeConfig();
const user = useSupabaseUser();
const supabase = useSupabaseClient();

useSeoMeta({
  title: `จัดการบัญชี - ${runtimeConfig.public.SiteName}`,
  ogTitle: `จัดการบัญชี - ${runtimeConfig.public.SiteName}`,
});

const profileImage = ref("");
const displayName = ref("");
const inputPassword = ref("");
const showErrorMessage = ref(false);

const { data: profileImageUrl, refresh: profileImageUrlRefresh } =
  await useAsyncData("profileImageUrl", () => {
    if (user.value.user_metadata.profileImage) {
      return user.value.user_metadata.profileImage;
    } else {
      return "/images/trial-profile.jpg";
    }
  });

const openChangeProfileModal = () => {
  showErrorMessage.value = false;
  $("#ChangeProfileModal").modal("show");
};

const onProfileImageSubmit = async () => {
  showErrorMessage.value = false;
  if (profileImage.value != "") {
    const { error: updateProfileImageError } = await supabase.auth.updateUser({
      data: { profileImage: profileImage.value },
    });
    if (updateProfileImageError) {
      showErrorMessage.value = updateProfileImageError.message;
    } else {
      profileImage.value = "";
      profileImageUrlRefresh();
      $("#ChangeProfileModal").modal("hide");
    }
  } else {
    showErrorMessage.value = "โปรดใส่ลิงก์รูปภาพ";
  }
};

const openChangeDisplayNameModal = () => {
  showErrorMessage.value = false;
  $("#ChangeDisplayNameModal").modal("show");
};

const onDisplayNameSubmit = async () => {
  showErrorMessage.value = false;
  if (displayName.value != "") {
    const { error: updateDisplayNameError } = await supabase.auth.updateUser({
      data: { display_name: displayName.value },
    });
    if (updateDisplayNameError) {
      showErrorMessage.value = updateDisplayNameError.message;
    } else {
      displayName.value = "";
      $("#ChangeDisplayNameModal").modal("hide");
    }
  } else {
    showErrorMessage.value = "โปรดใส่ชื่อผู้ใช้";
  }
};

const openChangePasswordModal = () => {
  showErrorMessage.value = false;
  $("#ChangePasswordModal").modal("show");
};

const onResetPassword = async () => {
  showErrorMessage.value = false;
  if (inputPassword.value != "") {
    const { error: updatePasswordError } = await supabase.auth.updateUser({
      password: inputPassword.value,
    });
    if (updatePasswordError) {
      switch (updatePasswordError.message) {
        case "Password should be at least 6 characters.":
          showErrorMessage.value = "รหัสผ่านต้องไม่ต่ำกว่า 6 ตัวอักษร";
          break;
        case "New password should be different from the old password.":
          showErrorMessage.value =
            "คุณกำลังกรอกรหัสผ่านเดิมที่ใช้อยู่ โปรดกรอกรหัสผ่านใหม่";
          break;
        default:
          showErrorMessage.value = updatePasswordError.message;
      }
    } else {
      inputPassword.value = "";
      $("#ChangePasswordModal").modal("hide");
    }
  } else {
    showErrorMessage.value = "โปรดใส่รหัสผ่าน";
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mt-4"><b>จัดการบัญชี</b></h1>
        <img
          :src="profileImageUrl"
          alt="Logo"
          width="80"
          height="80"
          style="border-radius: 50%"
          class="mx-auto d-block mt-5 mb-4"
        />
        <p><b>ไอดี : </b>{{ user.id }}</p>
        <p>
          <b>ชื่อผู้ใช้ : </b>{{ user.user_metadata.display_name }}
          <button
            class="btn btn-sm btn-outline-info ms-1"
            @click="openChangeDisplayNameModal"
          >
            เปลื่ยนชื่อผู้ใช้
          </button>
        </p>
        <p><b>อีเมล : </b>{{ user.email }}</p>
        <p><b>สร้างบัญชีเมื่อ : </b>{{ formatDate(user.created_at) }}</p>
        <p>
          <b>เข้าสู่ระบบครั้งล่าสุด : </b>{{ formatDate(user.last_sign_in_at) }}
        </p>
        <div class="row justify-content-start g-2">
          <div class="col-auto">
            <button
              class="btn btn-sm btn-info"
              @click="openChangePasswordModal"
            >
              เปลื่ยนรหัสผ่าน
            </button>
          </div>
          <div class="col-auto">
            <button class="btn btn-sm btn-info" @click="openChangeProfileModal">
              เปลื่ยนรูปภาพโปรไฟล์
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Change Profile Image Modal -->
  <div
    class="modal fade"
    id="ChangeProfileModal"
    tabindex="-1"
    aria-labelledby="ChangeProfileModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 sarabun-extrabold"
            id="ChangeProfileModal"
          >
            เปลื่ยนรูปภาพโปรไฟล์
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div
            class="alert alert-danger"
            role="alert"
            v-show="showErrorMessage"
          >
            {{ showErrorMessage }}
          </div>
          <div class="alert alert-info" role="alert">
            คุณสามารถอัปโหลดรูปโปรไฟล์ได้ที่
            <NuxtLink
              to="/apps/storage"
              target="_blank"
              class="link-underlinelink-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >Storage Management</NuxtLink
            >
            แล้วนำลิงก์มาวางที่นี่
          </div>
          <div class="mb-3">
            <div class="form-floating mb-3">
              <input
                type="url"
                class="form-control"
                id="floatingInputProfileLink"
                placeholder="example123"
                v-model="profileImage"
                required
              />
              <label for="floatingInput">ลิงก์รูปภาพโปรไฟล์</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="onProfileImageSubmit"
          >
            บันทึก
          </button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Change Display Name Modal -->
  <div
    class="modal fade"
    id="ChangeDisplayNameModal"
    tabindex="-1"
    aria-labelledby="ChangeDisplayNameModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 sarabun-extrabold"
            id="ChangeDisplayNameModal"
          >
            เปลื่ยนชื่อผู้ใช้
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div
            class="alert alert-danger"
            role="alert"
            v-show="showErrorMessage"
          >
            {{ showErrorMessage }}
          </div>
          <div class="mb-3">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInputUsername"
                placeholder="example123"
                v-model="displayName"
                required
              />
              <label for="floatingInput">ชื่อผู้ใช้</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="onDisplayNameSubmit"
          >
            บันทึก
          </button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Change Display Name Modal -->
  <div
    class="modal fade"
    id="ChangePasswordModal"
    tabindex="-1"
    aria-labelledby="ChangePasswordModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 sarabun-extrabold"
            id="ChangePasswordModal"
          >
            เปลื่ยนรหัสผ่าน
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div
            class="alert alert-danger"
            role="alert"
            v-show="showErrorMessage"
          >
            {{ showErrorMessage }}
          </div>
          <div class="mb-3">
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                id="floatingInputPassword"
                placeholder="123456"
                v-model="inputPassword"
                required
              />
              <label for="floatingInput">รหัสผ่านใหม่</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="onResetPassword"
          >
            บันทึก
          </button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
