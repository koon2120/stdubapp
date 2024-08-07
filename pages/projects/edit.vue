<script setup>
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

if (route.query.id == undefined || route.query.id == false) {
    await navigateTo("/projects")
}

useSeoMeta({
    title: `แก้ไขโปรเจกต์ - ${runtimeConfig.public.SiteName}`,
    ogTitle: `แก้ไขโปรเจกต์ - ${runtimeConfig.public.SiteName}`
})

const errorMessage = ref(false)

const projectInfo = ref({
    title: "",
    description: "",
    image: ""
})

const memberList = ref([])
const editMemberModal = ref({
    name: "",
    profileImage: "",
    role: ""
})

const { data: originalProject, error: originalProjectError } = await useFetch('/api/projects', {
    headers: useRequestHeaders(['cookie']),
    method: "get",
    query:{id:route.query.id}
})

if (originalProject.value.status == 404) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

projectInfo.value = {
    title:originalProject.value.data[0].title,
    description:originalProject.value.data[0].description,
    image:originalProject.value.data[0].image
}

memberList.value = originalProject.value.data[0].members

const addMember = () => {
    memberList.value.push({
        name: "สมาชิกใหม่",
        profileImage: "",
        role: "",
    })
}

const editMember = (id) => {
    editMemberModal.value = { id: id, name: memberList.value[id].name, profileImage: memberList.value[id].image, role: memberList.value[id].role }
    $('#editMemberModal').modal('show');
}

const editMemberSubmit = () => {
    memberList.value[editMemberModal.value.id] = {
        name: editMemberModal.value.name,
        profileImage: editMemberModal.value.profileImage,
        role: editMemberModal.value.role
    }
    $('#editMemberModal').modal('hide');
}

const onMemberRemove = (id) => {
    memberList.value.splice(id, 1)
}

const createNewProject = async () => {
    if (
    projectInfo.value.title.length == 0 ||
    projectInfo.value.description.length == 0 ||
    memberList.value.length == 0
  ) {
    errorMessage.value = "โปรดใส่ข้อมูลให้ครบ!";
  } else {
    errorMessage.value = false;
    let finalScript = {
      title: projectInfo.value.title,
      description: projectInfo.value.description,
      image: projectInfo.value.image,
      members: memberList.value,
    };
    const { error } = await useFetch("/api/projects", {
      headers: useRequestHeaders(["cookie"]),
      method: "put",
      query: {id:originalProject.value.data[0].id},
      body: finalScript,
    });
    if (error.value) {
      console.error(error.value)
    }else {
      navigateTo('/projects')
    }
  }
}
</script>

<template>
    <div class="alert alert-danger mt-3" role="alert" v-show="errorMessage">
        {{ errorMessage }}
    </div>
    <div class="mt-4 mb-4">
        <h1 class="sarabun-extrabold">สร้างโปรเจกต์</h1>
    </div>
    <div class="row gy-4 mb-5">
        <div class="col-md-8">
            <h4 class="sarabun-bold mb-3">รายละเอียดทั่วไป : </h4>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="ข้อความ..."
                    v-model="projectInfo.title">
                <label for="floatingInput">ชื่อโปรเจกต์</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="ข้อความ..."
                    v-model="projectInfo.description">
                <label for="floatingInput">คำอธิบายโปรเจกต์</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="ข้อความ..."
                    v-model="projectInfo.image">
                <label for="floatingInput">รูปภาพปกของโปรเจกต์ (ลิงก์รูปภาพ)</label>
            </div>
        </div>
        <hr>
        <div class="col-md-8">
            <h4 class="sarabun-bold mb-3">สร้างสมาชิก (ผู้เข้าร่วม) : </h4>
            <div class="row align-items-center" v-for="(member, index) in memberList">
                <div class="col-auto p-1">
                    <img :src="member.profileImage ? member.profileImage : '/images/script/char-unknow.jpg'" width="30"
                        height="30" style="border-radius: 50%;">
                </div>
                <div class="col-auto ps-1 pe-3" v-if="member.name">
                    <p class="m-0">{{ member.name }}</p>
                </div>
                <div class="col-auto ps-1 pe-3" v-else>
                    <p class="m-0 text-secondary">ไม่มีชื่อ</p>
                </div>
                <div class="col-auto ps-1 pe-3" v-if="member.role">
                    <p class="m-0">{{ member.role }}</p>
                </div>
                <div class="col-auto ps-1 pe-3" v-else>
                    <p class="m-0 text-secondary">ไม่มีตำแหน่ง/หน้าที่</p>
                </div>
                <div class="col-auto p-1">
                    <button class="btn btn-warning btn-sm" @click="editMember(index)">แก้ไข</button>
                </div>
                <div class="col-auto p-1">
                    <button class="btn btn-danger btn-sm" @click="onMemberRemove(index)">ลบ</button>
                </div>
            </div>
            <button class="btn btn-success mt-3" @click="addMember">สร้างสมาชิกเพิ่ม</button>
        </div>
        <hr>
        <div class="row justify-content-start mt-3">
            <div class="col-auto"><button class="btn btn-primary" @click="createNewProject">บันทึก</button></div>
        </div>
    </div>

    <!-- editMemberModal -->
    <div class="modal fade" id="editMemberModal" tabindex="-1" aria-labelledby="editMemberModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 sarabun-extrabold" id="editMemberModal">แก้ไขข้อมูลlสมาชิก</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="ข้อความ..."
                            v-model="editMemberModal.profileImage">
                        <label for="floatingInput">รูปภาพสมาชิก (ลิงก์รูปภาพ)</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="ข้อความ..."
                            v-model="editMemberModal.name">
                        <label for="floatingInput">ชื่อสมาชิก</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="ข้อความ..."
                            v-model="editMemberModal.role">
                        <label for="floatingInput">ตำแหน่ง/หน้าที่</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="editMemberSubmit">บันทึก</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">ยกเลิก</button>
                </div>
            </div>
        </div>
    </div>
</template>
