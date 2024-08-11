<script setup>
const runtimeConfig = useRuntimeConfig();
const user = useSupabaseUser();
const supabase = useSupabaseClient();

useSeoMeta({
  title: `เสนอโปรเจกต์ - ${runtimeConfig.public.SiteName}`,
  ogTitle: `เสนอโปรเจกต์  - ${runtimeConfig.public.SiteName}`,
});
const newProjectRequest = ref({
  title: "",
  description: "",
});
const errorMessage = ref(false);
const {
  data: ProjectRequestList,
  refresh: ProjectRequestListRefresh,
} = await useAsyncData(async () => {
  return await supabase
    .from("projects-request")
    .select()
    .order("id", { ascending: true });
});

if (ProjectRequestList.value.error) {
  throw createError({
    statusCode: 500,
    statusMessage: "เกิดปัญหาบางอย่างบน Server โปรดติดต่อผู้ดูแลระบบ",
  });
}

const addProjectRequest = async () => {
  errorMessage.value = false;
  if (
    newProjectRequest.value.title.length != 0 &&
    newProjectRequest.value.description.length != 0
  ) {
    let newProjectRequestObject = newProjectRequest.value;
    const { error } = await supabase
    .from("projects-request")
    .insert({
      title: newProjectRequestObject.title,
      description: newProjectRequestObject.description,
      user_id: user.value.id,
    })
    if (error) {
      errorMessage.value = error.message
    }else {
      newProjectRequest.value = { title: "", description: "" };
      $("#addProjectRequest").modal("hide");
    }
  } else {
    errorMessage.value = "โปรดใส่ข้อมูลให้ครบ";
  }
  ProjectRequestListRefresh();
};

const deleteProjectRequest = async (id) => {
  const { error } = await supabase
    .from("projects-request")
    .delete()
    .eq("id", id);
  if (error) {
    console.error(error);
  }
  ProjectRequestListRefresh();
};
</script>

<template>
  <div>
    <div class="mt-4 mb-3 text-center text-lg-start">
      <h1 class="sarabun-extrabold">
        รวมข้อเสนอโปรเจกต์ที่อยากทำใน ST Dub Team
      </h1>
      <p>สามารถสร้างและดูข้อเสนอได้</p>
      <button
        type="button"
        class="btn btn-primary mb-5"
        data-bs-toggle="modal"
        data-bs-target="#addProjectRequest"
      >
        เสนอโปรเจกต์ใหม่
      </button>
    </div>
    <div
      class="row row-cols-auto g-4 mb-5 justify-content-center justify-content-lg-start"
    >
      <div class="col-md-4" v-for="project in ProjectRequestList.data">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title sarabun-bold">{{ project.title }}</h5>
            <p>{{ project.description }}</p>
            <button
              v-show="project.user_id == user.id"
              class="btn btn-danger"
              @click="deleteProjectRequest(project.id)"
            >
              ลบข้อเสนอ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- addProjectRequest -->
  <div
    class="modal fade"
    id="addProjectRequest"
    tabindex="-1"
    aria-labelledby="addProjectRequest"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 sarabun-extrabold" id="addProjectRequest">
            เสนอโปรเจกต์ใหม่
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
            class="alert alert-danger mt-3"
            role="alert"
            v-show="errorMessage"
          >
            {{ errorMessage }}
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="ข้อความ..."
              v-model="newProjectRequest.title"
            />
            <label for="floatingInput">หัวข้อ</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="ข้อความ..."
              v-model="newProjectRequest.description"
            />
            <label for="floatingInput">คำอธิบาย</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="addProjectRequest"
          >
            เพิ่ม
          </button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
