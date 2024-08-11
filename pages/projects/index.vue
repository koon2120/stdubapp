<script setup>
const runtimeConfig = useRuntimeConfig();
const supabase = useSupabaseClient();

useSeoMeta({
  title: `โปรเจกต์ - ${runtimeConfig.public.SiteName}`,
  ogTitle: `โปรเจกต์  - ${runtimeConfig.public.SiteName}`,
});

const { data: ProjectList, error: ProjectListError } = await supabase
  .from("projects")
  .select("id,title,description,image,user_id,created_at")
  .order("id", { ascending: false });

if (ProjectListError) {
  throw createError({
    statusCode: 500,
    statusMessage: "เกิดปัญหาบางอย่างบน Server โปรดติดต่อผู้ดูแลระบบ",
  });
}
</script>

<template>
  <div>
    <div class="mt-4 mb-3 text-center text-lg-start">
      <h1 class="sarabun-extrabold">รวมโปรเจกต์ทั้งหมดของ ST Dub Team</h1>
      <p>คุณสามารถดูโปรเจกต์ทั้งหมดได้ที่นี่!</p>
      <NuxtLink
        type="button"
        class="btn btn-primary mb-5 d-inline me-2"
        to="/projects/create"
        >สร้างโปรเจกต์</NuxtLink
      >
      <NuxtLink
        type="button"
        class="btn btn-outline-primary mb-5"
        to="/projects/request"
        >เสนอโปรเจกต์</NuxtLink
      >
    </div>
    <div
      class="row row-cols-auto g-4 mb-5 justify-content-center justify-content-lg-start"
    >
      <div class="col" v-for="project in ProjectList">
        <div class="card" style="width: 18rem">
          <img
            :src="project.image ? project.image : '/images/no-image.jpg'"
            class="card-img-top"
            :alt="project.title"
          />
          <div class="card-body text-center">
            <h5 class="card-title sarabun-bold">{{ project.title }}</h5>
            <NuxtLink
              :to="{ path: '/projects/view', query: { id: project.id } }"
              class="btn btn-primary sarabun-semibold"
              >ดูข้อมูล</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
