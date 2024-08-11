<script setup>
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const user = useSupabaseUser();
const supabase = useSupabaseClient();

if (route.query.id == undefined || route.query.id == false) {
  await navigateTo("/projects");
}

const { data: viewProject, error: viewProjectError } = await supabase
  .from("projects")
  .select()
  .eq("id", route.query.id);

if (viewProject.length == 0) {
  throw createError({
    statusCode: 404,
    statusMessage: "ไม่พบหน้านี้ หรือหน้านี้ถูกลบไปแล้ว",
  });
}else if (viewProjectError) {
  throw createError({
    statusCode: 500,
    statusMessage: "เกิดปัญหาบางอย่างบน Server โปรดติดต่อผู้ดูแลระบบ",
  });
}

useSeoMeta({
  title: `${viewProject[0].title} - ${runtimeConfig.public.SiteName}`,
  ogTitle: `${viewProject[0].title}  - ${runtimeConfig.public.SiteName}`,
});

const onProjectDelete = async () => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", route.query.id);
  if (error) {
    console.error(error);
  } else {
    $("#WarningDeleteProjectModal").modal("hide");
    navigateTo("/projects");
  }
};
</script>

<template>
  <div>
    <div class="row mt-5">
      <div class="col-md-6">
        <img
          :src="
            viewProject[0].image
              ? viewProject[0].image
              : '/images/no-image.jpg'
          "
          class="img-fluid"
          width="500px"
        />
      </div>
    </div>
    <div class="row mt-4 mb-4">
      <div class="col-md-8">
        <h2 class="sarabun-extrabold">{{ viewProject[0].title }}</h2>
      </div>
    </div>
    <div class="row mt-4 mb-4">
      <div class="col-md-8">
        <h6 class="sarabun-mediun">
          <b>คำอธิบาย : </b>{{ viewProject[0].description }}
        </h6>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-12 mt-3 mb-4">
        <div class="mb-3" v-for="onceViewMember in viewProject[0].members">
          <div class="row gx-2 gy-2 align-items-center">
            <div class="col-md-auto">
              <img
                width="40"
                height="40"
                style="border-radius: 50%"
                :src="
                  onceViewMember.profileImage
                    ? onceViewMember.profileImage
                    : '/images/script/char-unknow.jpg'
                "
              />
            </div>
            <div class="col-md-auto">
              <p class="sarabun-extrabold m-0">{{ onceViewMember.name }}</p>
              <p class="m-0">หน้าที่ : {{ onceViewMember.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-5 gx-2">
      <div class="col-auto me-auto">
        <NuxtLink class="btn btn-outline-primary" to="/projects"
          >กลับหน้าหลัก</NuxtLink
        >
      </div>
      <div class="col-auto">
        <NuxtLink
          v-show="viewProject[0].user_id == user.id"
          class="btn btn-outline-warning"
          :to="{
            path: '/projects/edit',
            query: { id: viewProject[0].id },
          }"
          >แก้ไข</NuxtLink
        >
      </div>
      <div class="col-auto">
        <button
          v-show="viewProject[0].user_id == user.id"
          class="btn btn-outline-danger"
          data-bs-toggle="modal"
          data-bs-target="#WarningDeleteProjectModal"
        >
          ลบ
        </button>
      </div>
    </div>
  </div>
  <!-- WarningDeleteProjectModal -->
  <div
    class="modal fade"
    id="WarningDeleteProjectModal"
    tabindex="-1"
    aria-labelledby="WarningDeleteProjectModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 sarabun-extrabold"
            id="WarningDeleteProjectModal"
          >
            คำเตือน
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">คุณแน่ใจหรือไม่ว่าจะลบโปรเจกต์นี้?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="onProjectDelete">
            ยืนยัน
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
