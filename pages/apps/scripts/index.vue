<script setup>
const runtimeConfig = useRuntimeConfig();
const supabase = useSupabaseClient();

useSeoMeta({
  title: `Script App - ${runtimeConfig.public.SiteName}`,
  ogTitle: `Script App  - ${runtimeConfig.public.SiteName}`,
});

const { data: ScriptList, error: ScriptListError } = await supabase
  .from("scripts")
  .select("id,title,image,user_id,created_at")
  .order("id", { ascending: false });

if (ScriptListError) {
  throw createError({
    statusCode: 500,
    statusMessage: "เกิดปัญหาบางอย่างบน Server โปรดติดต่อผู้ดูแลระบบ",
  });
}
</script>

<template>
  <div class="mt-4 mb-3 text-center text-lg-start">
    <h1 class="sarabun-extrabold">ยินดีต้อนรับสู่ ST Dub Script</h1>
    <p>คุณสามารถดูบทพากย์ได้ที่นี่!</p>
    <NuxtLink
      type="button"
      class="btn btn-primary mb-5"
      to="/apps/scripts/create"
      >สร้างบทพากย์</NuxtLink
    >
  </div>
  <div
    class="row row-cols-auto g-4 mb-5 justify-content-center justify-content-lg-start"
  >
    <div class="col" v-for="onceScript in ScriptList">
      <div class="card" style="width: 18rem">
        <img
          :src="onceScript.image ? onceScript.image : '/images/no-image.jpg'"
          class="card-img-top"
          :alt="onceScript.title"
        />
        <div class="card-body text-center">
          <h5 class="card-title sarabun-bold">{{ onceScript.title }}</h5>
          <NuxtLink
            :to="{ path: '/apps/scripts/view', query: { id: onceScript.id } }"
            class="btn btn-primary sarabun-semibold"
            >ดูบทพากย์</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
