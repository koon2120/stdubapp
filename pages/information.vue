<script setup>
const runtimeConfig = useRuntimeConfig();
const supabase = useSupabaseClient()

useSeoMeta({
  title: `ข้อมูลทั่วไป - ${runtimeConfig.public.SiteName}`,
  ogTitle: `ข้อมูลทั่วไป - ${runtimeConfig.public.SiteName}`,
});

const { data: Information, error: InformationError } = await supabase
    .from("stdubteam-information")
    .select()
    .order("id", { ascending: true });

if (InformationError) {
  throw createError({
    statusCode: 500,
    statusMessage: "เกิดปัญหาบางอย่างบน Server โปรดติดต่อผู้ดูแลระบบ",
  });
}
</script>

<template>
  <div class="mt-5 mb-5">
    <h1 class="sarabun-extrabold text-center text-lg-start">
      ข้อมูลทั่วไปเกี่ยวกับ ST Dub Team
    </h1>
  </div>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in Information">
          <th scope="row">{{ info.title }}</th>
          <td>{{ info.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
