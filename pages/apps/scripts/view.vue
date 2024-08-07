<script setup>
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const user = useSupabaseUser();

if (route.query.id == undefined || route.query.id == false) {
  await navigateTo("/apps/scripts");
}

const youtubeVideoUrlConvert = ref("");

const { data: viewScript, error: viewScriptError } = await useFetch(
  "/api/scripts",
  {
    headers: useRequestHeaders(["cookie"]),
    method: "get",
    query: { id: route.query.id },
  }
);

if (viewScript.value.status == 404) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

useSeoMeta({
  title: `${viewScript.value.data[0].title} - ${runtimeConfig.public.SiteName}`,
  ogTitle: `${viewScript.value.data[0].title}  - ${runtimeConfig.public.SiteName}`,
});

if (viewScript.value.data[0].youtube_video) {
  if (viewScript.value.data[0].youtube_video.length == 11) {
    youtubeVideoUrlConvert.value = viewScript.value.data[0].youtube_video;
  } else if (
    viewScript.value.data[0].youtube_video.slice(0, 17) == "https://youtu.be/"
  ) {
    youtubeVideoUrlConvert.value = viewScript.value.data[0].youtube_video.slice(
      17,
      28
    );
  } else if (
    viewScript.value.data[0].youtube_video.slice(0, 32) ==
    "https://www.youtube.com/watch?v="
  ) {
    youtubeVideoUrlConvert.value = new URLSearchParams(viewScript.value.data[0].youtube_video.slice(29)).get("v")
  }
}

const onScriptDelete = async () => {
  const { error } = await useFetch("/api/scripts", {
    headers: useRequestHeaders(["cookie"]),
    method: "delete",
    query: { id: viewScript.value.data[0].id },
  });
  if (error.value) {
    console.error(error.value);
  } else {
    $("#WarningDeleteScriptModal").modal("hide");
    navigateTo("/apps/scripts");
  }
};
</script>

<template>
  <div>
    <div class="row justify-content-center mt-5">
      <div class="col-md-12">
        <img
          :src="
            viewScript.data[0].image ? viewScript.data[0].image : '/images/no-image.jpg'
          "
          class="img-fluid d-block mx-auto"
          width="500px"
        />
      </div>
    </div>
    <div class="row justify-content-center mt-4 mb-4">
      <div class="col-md-8">
        <h2 class="sarabun-extrabold text-center">{{ viewScript.data[0].title }}</h2>
      </div>
    </div>
    <hr />
    <div class="row justify-content-center mt-5 mb-3">
      <div class="col-md-6">
        <div class="ratio ratio-16x9" v-show="youtubeVideoUrlConvert">
          <iframe
            :src="'https://www.youtube.com/embed/' + youtubeVideoUrlConvert"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-12 mt-5 mb-4">
        <div v-for="onceViewScript in viewScript.data[0].scripts">
          <div class="row gx-2 gy-2 align-items-center">
            <div class="col-md-auto">
              <img
                width="40"
                height="40"
                style="border-radius: 50%"
                :src="
                  viewScript.data[0].character[onceViewScript.character_id].image
                    ? viewScript.data[0].character[onceViewScript.character_id].image
                    : '/images/script/char-unknow.jpg'
                "
              />
            </div>
            <div class="col-md-auto">
              <p class="sarabun-extrabold m-0">
                {{ viewScript.data[0].character[onceViewScript.character_id].name }}
              </p>
              <p class="m-0">{{ onceViewScript.message }}</p>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
    <div class="row mb-5 gx-2">
      <div class="col-auto me-auto">
        <NuxtLink class="btn btn-outline-primary" to="/apps/scripts"
          >กลับหน้าหลัก</NuxtLink
        >
      </div>
      <div class="col-auto">
        <NuxtLink
          v-show="viewScript.data[0].user_id == user.id"
          class="btn btn-outline-warning"
          :to="{ path: '/apps/scripts/edit', query: { id: viewScript.data[0].id } }"
          >แก้ไข</NuxtLink
        >
      </div>
      <div class="col-auto">
        <button
          v-show="viewScript.data[0].user_id == user.id"
          class="btn btn-outline-danger"
          data-bs-toggle="modal" 
          data-bs-target="#WarningDeleteScriptModal"
        >
          ลบ
        </button>
      </div>
    </div>
  </div>
    <!-- WarningDeleteScriptModal -->
    <div
    class="modal fade"
    id="WarningDeleteScriptModal"
    tabindex="-1"
    aria-labelledby="WarningDeleteScriptModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 sarabun-extrabold"
            id="WarningDeleteScriptModal"
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
        <div class="modal-body">
          คุณแน่ใจหรือไม่ว่าจะลบบทพากย์นี้?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            @click="onScriptDelete"
          >
            ยืนยัน
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
