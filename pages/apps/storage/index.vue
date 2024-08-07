<script setup>
const runtimeConfig = useRuntimeConfig()
const user = useSupabaseUser()
const supabase = useSupabaseClient()

useSeoMeta({
    title: `Storage Management - ${runtimeConfig.public.SiteName}`,
    ogTitle: `Storage Management  - ${runtimeConfig.public.SiteName}`
})

const { data: ListFile, error: ListFileError, refresh: ListFileRefresh } = await useFetch('/api/storage/listfile', {
    headers: useRequestHeaders(['cookie'])
})

const newFile = ref(null)
const onCreateNewFIleErrorMessage = ref(false)

function onCreateNewFIleOpen() {
    onCreateNewFIleErrorMessage.value = false
    $('#createFileModal').modal('show');
}

async function onCreateNewFIle() {
    onCreateNewFIleErrorMessage.value = false
    if (newFile.value == null) {
        onCreateNewFIleErrorMessage.value = "ไม่มีไฟล์"
    } else {
        const { error } = await supabase
            .storage
            .from('user-input')
            .upload(`${user.value.id}/${newFile.value.name}`, newFile.value)
        if (error) {
            onCreateNewFIleErrorMessage.value = error.message
        } else {
            ListFileRefresh()
            $('#createFileModal').modal('hide');
        }
    }
}

function onFilePicked(event) {
    newFile.value = event.target.files[0]
}

function onFileUrlCopy(filename) {
    const { data } = supabase
        .storage
        .from('user-input')
        .getPublicUrl(`${user.value.id}/${filename}`)
    if (data.publicUrl) {
        navigator.clipboard.writeText(data.publicUrl)
    }
}

async function onFileRemove(filename) {
    const { error } = await supabase
        .storage
        .from('user-input')
        .remove([`${user.value.id}/${filename}`])
    if (error) {
        console.error(error)
    } else {
        ListFileRefresh()
    }
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('th-TH',{year: 'numeric', month: 'long', day: 'numeric',weekday: 'long',hour:'numeric',minute:'numeric',second:'numeric'})
}

</script>

<template>
    {{ ListFileError }}
    <div class="mt-4 mb-3">
        <h1 class="sarabun-extrabold">ยินดีต้อนรับสู่ Storage Management</h1>
        <p>สามารถจัดการไฟล์ต่างๆ ได้ที่นี่</p>
    </div>
    <button class="btn btn-success" @click="onCreateNewFIleOpen">สร้างไฟล์ใหม่</button>
    <div class="table-responsive">
        <table class="table table-hover mt-4 mb-5">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ชื่อไฟล์</th>
                    <th scope="col">ชนิดไฟล์</th>
                    <th scope="col">สร้างเมื่อ</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(file, index) in ListFile">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ file.name }}</td>
                    <td>{{ file.metadata.mimetype }}</td>
                    <td>{{ formatDate(file.created_at) }}</td>
                    <td><button class="btn btn-primary btn-sm" @click="onFileUrlCopy(file.name)">คัดลอกลิงก์</button>
                    </td>
                    <td><button class="btn btn-danger btn-sm" @click="onFileRemove(file.name)">ลบไฟล์</button></td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- createFileModal -->
    <div class="modal fade" id="createFileModal" tabindex="-1" aria-labelledby="createFileModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 sarabun-extrabold" id="createFileModal">สร้างไฟล์ใหม่</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert" v-show="onCreateNewFIleErrorMessage">
                        {{ onCreateNewFIleErrorMessage }}
                    </div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">เลือกไฟล์ : </label>
                        <input class="form-control" type="file" id="formFile" accept="image/png, image/jpeg"
                            @change="onFilePicked">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="onCreateNewFIle">สร้างไฟล์</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">ยกเลิก</button>
                </div>
            </div>
        </div>
    </div>
</template>