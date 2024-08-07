<script setup>
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

if (route.query.id == undefined || route.query.id == false) {
  await navigateTo("/apps/scripts");
}

useSeoMeta({
  title: `แก้ไขบทพากย์ - ${runtimeConfig.public.SiteName}`,
  ogTitle: `แก้ไขบทพากย์ - ${runtimeConfig.public.SiteName}`,
});

const errorMessage = ref(false)

const { data: originalScript, error: originalScriptError } = await useFetch(
  "/api/scripts",
  {
    headers: useRequestHeaders(["cookie"]),
    method: "get",
    query: { id: route.query.id },
  }
);

if (originalScript.value.status == 404) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

const scriptInfo = ref({
  title: "",
  image: "",
  youtube_video: "",
});

scriptInfo.value = {
  title: originalScript.value.data[0].title,
  image: originalScript.value.data[0].image,
  youtube_video: originalScript.value.data[0].youtube_video,
};

const characterList = ref([]);
const editCharacterModal = ref({
  id: null,
  name: "",
  profileImage: "",
});

const pendingCharacterRemove = ref(null);

characterList.value = originalScript.value.data[0].character;

const addCharacter = () => {
  characterList.value.push({ name: `ตัวละครใหม่`, image: "" });
};

const editCharacter = (id) => {
  editCharacterModal.value = {
    id: id,
    name: characterList.value[id].name,
    profileImage: characterList.value[id].image,
  };
  $("#editCharacterModal").modal("show");
};

const editCharacterSubmit = () => {
  characterList.value[editCharacterModal.value.id].name =
    editCharacterModal.value.name;
  characterList.value[editCharacterModal.value.id].image =
    editCharacterModal.value.profileImage;
  $("#editCharacterModal").modal("hide");
};

const removeCharacter = () => {
  if (scriptList.value.length > 0) {
    let ListScriptForAlive = [];
    scriptList.value.forEach((value) => {
      if (value.character_id != pendingCharacterRemove.value) {
        if (value.character_id > pendingCharacterRemove.value) {
          ListScriptForAlive.push({
            character_id: value.character_id - 1,
            message: value.message,
          });
        } else {
          ListScriptForAlive.push(value);
        }
      }
    });
    scriptList.value = ListScriptForAlive;
    ListScriptForAlive = [];
  }
  characterList.value.splice(pendingCharacterRemove.value, 1);
  pendingCharacterRemove.value = null;
  $("#WarningRemoveCharacterModal").modal("hide");
};

const onCharacterRemove = (id) => {
  $("#WarningRemoveCharacterModal").modal("show");
  pendingCharacterRemove.value = id;
};

const scriptList = ref([]);
const editScriptModal = ref({
  id: null,
  character_id: "",
  message: "",
});

scriptList.value = originalScript.value.data[0].scripts;

const addScript = () => {
  scriptList.value.push({ character_id: 0, message: "ข้อความใหม่" });
};

const editScript = (id) => {
  editScriptModal.value = {
    id: id,
    character_id: scriptList.value[id].character_id,
    message: scriptList.value[id].message,
  };
  $("#editScriptModal").modal("show");
};

const editScriptSubmit = () => {
  scriptList.value[editScriptModal.value.id].character_id =
    editScriptModal.value.character_id;
  scriptList.value[editScriptModal.value.id].message =
    editScriptModal.value.message;
  $("#editScriptModal").modal("hide");
};

const removeScript = (id) => {
  scriptList.value.splice(id, 1);
};

const createNewScript = async () => {
  if (
    scriptInfo.value.title.length == 0 ||
    characterList.value.length == 0 ||
    scriptList.value.length == 0
  ) {
    errorMessage.value = "โปรดใส่ข้อมูลให้ครบ!";
  } else {
    errorMessage.value = false;
    let finalScript = {
      title: scriptInfo.value.title,
      image: scriptInfo.value.image,
      youtube_video: scriptInfo.value.youtube_video,
      character: characterList.value,
      scripts: scriptList.value,
    };
    const { error } = await useFetch("/api/scripts", {
      headers: useRequestHeaders(["cookie"]),
      method: "put",
      query: { id: originalScript.value.data[0].id },
      body: finalScript,
    });
    if (error.value) {
      console.error(error.value);
    } else {
      navigateTo("/apps/scripts");
    }
  }
};
</script>

<template>
  <div class="mt-4 mb-4">
    <h1 class="sarabun-extrabold">สร้างบทพากย์</h1>
  </div>
  <div class="row gy-4 mb-5">
    <div class="col-md-8">
      <h4 class="sarabun-bold mb-3">รายละเอียดทั่วไป :</h4>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="ข้อความ..."
          v-model="scriptInfo.title"
        />
        <label for="floatingInput">ชื่อบทพากย์</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="url"
          class="form-control"
          id="floatingInput"
          placeholder="ข้อความ..."
          v-model="scriptInfo.image"
        />
        <label for="floatingInput">รูปหน้าปกของบทพากย์ (ลิงก์รูปภาพ)</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="ข้อความ..."
          v-model="scriptInfo.youtube_video"
        />
        <label for="floatingInput">วิดีโอบน Youtube (หากมี)</label>
      </div>
    </div>
    <hr />
    <div class="col-md-8">
      <h4 class="sarabun-bold mb-3">สร้างตัวละคร :</h4>
      <div
        class="row align-items-center"
        v-for="(character, index) in characterList"
      >
        <div class="col-auto p-1">
          <img
            :src="
              character.image
                ? character.image
                : '/images/script/char-unknow.jpg'
            "
            width="30"
            height="30"
            style="border-radius: 50%"
          />
        </div>
        <div class="col-auto ps-1 pe-3">
          <p class="m-0 sarabun-bold">{{ character.name }}</p>
        </div>
        <div class="col-auto p-1">
          <button class="btn btn-warning btn-sm" @click="editCharacter(index)">
            แก้ไข
          </button>
        </div>
        <div class="col-auto p-1">
          <button
            class="btn btn-danger btn-sm"
            @click="onCharacterRemove(index)"
          >
            ลบ
          </button>
        </div>
      </div>
      <button class="btn btn-success mt-3" @click="addCharacter">
        สร้างตัวละครเพิ่ม
      </button>
    </div>
    <hr />
    <div class="col-md-8">
      <h4 class="sarabun-bold mb-3">สร้างบทพากย์ :</h4>
      <div
        class="row align-items-center mb-2"
        v-for="(once_script, index) in scriptList"
      >
        <div class="col-md-auto p-1">
          <img
            :src="
              characterList[once_script.character_id].image
                ? characterList[once_script.character_id].image
                : '/images/script/char-unknow.jpg'
            "
            width="30"
            height="30"
            style="border-radius: 50%"
          />
        </div>
        <div class="col-md-auto ps-1 pe-3 sarabun-bold">
          <p class="m-0">{{ characterList[once_script.character_id].name }}</p>
        </div>
        <div class="col-md-auto ps-1 pe-1">
          <p class="m-0">{{ once_script.message }}</p>
        </div>
        <div class="col-md-auto ps-1">
          <div class="row">
            <div class="col-auto pe-1">
              <button class="btn btn-warning btn-sm" @click="editScript(index)">
                แก้ไข
              </button>
            </div>
            <div class="col-auto ps-1 pe-1">
              <button
                class="btn btn-danger btn-sm"
                @click="removeScript(index)"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        :class="{
          btn: true,
          'btn-success': true,
          'mt-3': true,
          disabled: characterList.length == 0,
        }"
        @click="addScript"
      >
        สร้างบทพากย์เพิ่ม
      </button>
      <p v-show="characterList.length == 0" class="text-danger mt-1">
        **บทพากย์จะสร้างได้ก็ต่อเมื่อสร้างตัวละครอย่างน้อย 1 ตัว
      </p>
    </div>
    <hr />
    <div class="row justify-content-start mt-3">
      <div class="col-auto">
        <button class="btn btn-primary" @click="createNewScript">บันทึก</button>
      </div>
    </div>
  </div>

  <!-- editCharacterModal -->
  <div
    class="modal fade"
    id="editCharacterModal"
    tabindex="-1"
    aria-labelledby="editCharacterModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 sarabun-extrabold"
            id="editCharacterModal"
          >
            แก้ไขข้อมูลตัวละคร
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="ข้อความ..."
              v-model="editCharacterModal.profileImage"
            />
            <label for="floatingInput">รูปภาพตัวละคร (ลิงก์รูปภาพ)</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="ข้อความ..."
              v-model="editCharacterModal.name"
            />
            <label for="floatingInput">ชื่อตัวละคร</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="editCharacterSubmit"
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
  <!-- editScriptModal -->
  <div
    class="modal fade"
    id="editScriptModal"
    tabindex="-1"
    aria-labelledby="editScriptModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 sarabun-extrabold" id="editScriptModal">
            แก้ไขข้อมูลบทพากย์
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <select
            class="form-select mb-3"
            aria-label="SelectCharacter"
            v-model="editScriptModal.character_id"
          >
            <option v-for="(character, index) in characterList" :value="index">
              {{ character.name }}
            </option>
          </select>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="ข้อความ..."
              v-model="editScriptModal.message"
            />
            <label for="floatingInput">ข้อความ</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="editScriptSubmit"
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
  <!-- WarningRemoveCharacterModal -->
  <div
    class="modal fade"
    id="WarningRemoveCharacterModal"
    tabindex="-1"
    aria-labelledby="WarningRemoveCharacterModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 sarabun-extrabold"
            id="WarningRemoveCharacterModal"
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
          หากคุณยืนยันที่จะลบตัวละครนี้ บทพากย์ของตัวละครนี้ทั้งหมดจะถูกลบไปด้วย
          คุณต้องการดำเนินการต่อหรือไม่?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="removeCharacter"
          >
            ยืนยัน
          </button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
