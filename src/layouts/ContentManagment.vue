<template>
  <div>
    <q-layout view="hHh Lpr lff" container style="height: 100vh">
      <q-header :class="$q.dark.isActive ? 'bg-dark' : 'bg-dark'">
        <q-toolbar>
          <q-btn flat @click="drawerLeft = !drawerLeft" style="rotate: 90deg;" round dense icon="leaderboard" />
          <div class="text-weight-bold q-mr-auto q-ml-md">Content Management Page</div>
          <q-btn flat round dense icon="arrow_back" @click="goBack" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawerLeft"
        show-if-above
        :width="300"
        :breakpoint="700"
        :bordered="false"
        class="bg-accent text-white"
      >
        <q-scroll-area class="fit">
          <q-list class="drag-drop-container q-pt-sm" style="position: relative; height: calc(100vh - 170px); margin-top: 150px; border-right: solid #dddddd 1px;">
            <q-card-section>
              <div class="text-subtitle2 text-dark">Directory: Root</div>
              <div class="text-secondary" style="display: flex; align-items:center; text-align: center">
                <div>
                  File Name: {{ label }}
                  <q-popup-edit v-model="label" auto-save v-slot="scope">
                    <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                  </q-popup-edit>
                </div>
              <q-icon class="q-ml-xs text-secondary" size="xs" name="draw" ></q-icon>
              </div>
            </q-card-section>

            <q-separator />
            <q-btn @click="addItem" align="left" no-caps class="q-ml-sm q-mr-sm q-mb-md q-mt-md" unelevated color="dark" style="border-radius: 5px; width: calc(100% - 16px)" unelaveted label="Add Content">
              <q-badge color="secondary" floating transparent>+</q-badge>
            </q-btn>
            <DragDrop :items="fileContentArray" @update:items="handleItemsUpdate" />
          </q-list>
        </q-scroll-area>
        <q-img
          class="absolute-top"
          src="/src/assets/dark.jpg"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="">{{ user.username }}</div>
            <div>{{ user.email }}</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page class="bg-accent">
          <ContentPage :updateBPMN="updateBPMN" :items="fileContentArray" :updateText="updateText" :updateSubtitle="updateSubtitle" :deleteItem="deleteItem" :updateSubject="updateSubject" :subject="subject" :getMultipleFiles="getMultipleFiles" :createFile="createFile"/>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { uid } from 'uid';
import DragDrop from '../pages/contentManagment/dragDrop.vue';
import ContentPage from "../pages/contentManagment/contentPage.vue";
import { ref, getCurrentInstance, onMounted } from 'vue';
import { createFile } from 'src/boot/directories';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar'; // Import Notify from Quasar
import { getCurrentUser } from 'boot/auth'; // Import the getCurrentUser function
import Cookies from 'js-cookie';

export default {
  components: {
    DragDrop,
    ContentPage
  },
  setup() {
    const { proxy } = getCurrentInstance(); // Get the current instance proxy
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar(); // Use useQuasar to access $q.notify

    const user = ref({
      name: '',
      email: '',
      username: '',
      status: ''
    });



    const authToken = Cookies.get('authToken'); // Get auth token from cookies


    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser(authToken);
        user.value = userData;
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    onMounted(fetchUserData);



    const goBack = () => {
      router.go(-1)
    }
    const label = ref("New File")
    const drawerLeft = ref(false);
    const fileContentArray = ref([
      {
        "subtitle": "Process Design and Development",
        "text": "Based on the gathered requirements, the process design phase involves creating detailed workflows and process maps. Various tools and methodologies, such as BPMN (Business Process Model and Notation), are used to visually represent the process flow. Design reviews and validation sessions are conducted to ensure the process meets all requirements and adheres to best practices. Any necessary adjustments are made based on feedback.",
        "label": "str" + uid()
      },
      {
        "subtitle": "Implementation and Integration",
        "text": "In this final phase, the designed process is implemented within the organization. This involves configuring necessary tools and technologies, training staff, and integrating the new process with existing systems. Pilot tests are conducted to identify any issues or inefficiencies, and adjustments are made accordingly. Once the process is fully operational, continuous monitoring and optimization are carried out to ensure it remains effective and efficient.",
        "label": "str" + uid()
      },
      {
        "subtitle": "Implementation and Integration",
        "text": "In this final phase, the designed process is implemented within the organization. This involves configuring necessary tools and technologies, training staff, and integrating the new process with existing systems. Pilot tests are conducted to identify any issues or inefficiencies, and adjustments are made accordingly. Once the process is fully operational, continuous monitoring and optimization are carried out to ensure it remains effective and efficient.",
        "label": "str" + uid()
      },
      {
        "subtitle": "Implementation and Integration",
        "text": "In this final phase, the designed process is implemented within the organization. This involves configuring necessary tools and technologies, training staff, and integrating the new process with existing systems. Pilot tests are conducted to identify any issues or inefficiencies, and adjustments are made accordingly. Once the process is fully operational, continuous monitoring and optimization are carried out to ensure it remains effective and efficient.",
        "label": "str" + uid()
      }
    ]);
    const multipleFiles = ref({})
    const subject = ref("Whats the subject?")

    const handleItemsUpdate = (newItems) => {
      fileContentArray.value = newItems;
    };

    const updateText = (index, value) => {
      fileContentArray.value[index].text = value;
      document.querySelector(`.inner-html-${fileContentArray.value[index].label}`).innerHTML = value;
    };

    const updateSubtitle = (index, value) => {
      fileContentArray.value[index].subtitle = value;
    }

    const updateBPMN = ( index, value ) => {
      fileContentArray.value[index].BPMN_string = value
      console.log(fileContentArray.value[index])
    }

    const updateSubject = ( value ) => {
      subject.value = value
    }

    const getMultipleFiles = ( value ) => {
      multipleFiles.value = value
    }

    const addItem = () => {
      const newItem = {
        "subtitle": "Requirement Gathering and Analysis",
        "text": "<div>In this critical phase, detailed business requirements are collected through various means such as interviews, surveys, and workshops. Stakeholders from different departments provide input to ensure comprehensive coverage of needs. These requirements are then documented and analyzed to identify key features and functionalities needed in the process. Any potential risks or challenges are also identified at this stage.</div>",
        label: "str" + uid().toString()
      };
      fileContentArray.value.push(newItem);
      setTimeout(()=> {
        document.querySelector(`.inner-html-${fileContentArray.value[fileContentArray.value.length - 1].label}`).innerHTML = newItem.text;
        let element_ = document.querySelector(`.${fileContentArray.value[fileContentArray.value.length - 1].label}`)
        element_.classList.add('appearing');
        setTimeout(()=>{
          const selectForAnime = document.querySelectorAll(`.appearing`)
          selectForAnime.forEach(animeItem => animeItem.classList.remove('appearing'));
        },500)
      },50)
    };

    const deleteItem = (index) => {
      let element_ = document.querySelector(`.${fileContentArray.value[index].label}`)
      element_.classList.add('disappear');
      setTimeout(()=>{
        fileContentArray.value.splice(index, 1);
      },300)
    };



    const createFile = () => {
      if (route.params.dir) {
        const Appload = proxy.$editorCloudF.uploadFiles({
          files: multipleFiles.value,
          title: subject.value,
          content: fileContentArray.value,
          parent: route.params.dir,
          name: label.value
        });

        Appload.then((data) => {
          // Use q.notify here for success
          $q.notify({
            type: 'positive',
            message: 'File uploaded successfully!',
            timeout: 2000,
            position: 'top'
          });
          goBack()
        }).catch((error) => {
          console.log(error)
          // Use q.notify here for error
          $q.notify({
            type: 'negative',
            message: 'File upload failed. Please try again.',
            timeout: 2000,
            position: 'top'
          });
        });
      } else {
        proxy.$editorCloudF.uploadFiles({
          files: multipleFiles.value,
          title: subject.value,
          content: fileContentArray.value,
          parent: "",
          name: label.value
        }).then(() => {
          // Use q.notify here for success
          $q.notify({
            type: 'positive',
            message: 'File uploaded successfully!',
            timeout: 2000,
            position: 'top'
          });
          goBack()
        }).catch((error) => {
          console.log(error)
          // Use q.notify here for error
          $q.notify({
            type: 'negative',
            message: 'File upload failed. Please try again.',
            timeout: 2000,
            position: 'top'
          });
        });
      }
    }



    return {
      user,
      drawerLeft,
      fileContentArray,
      handleItemsUpdate,
      updateText,
      updateSubtitle,
      updateBPMN,
      addItem,
      deleteItem,
      label,
      subject,
      updateSubject,
      getMultipleFiles,
      createFile,
      goBack
    };
  }
};
</script>

<style>
.draggable {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  color: black;
  background-color: #dddddd;
  border-radius: 8px;
  cursor: move;
  transition: background-color 0.1s ease, opacity 0.3s ease;
}

.draggable.dragging {
  opacity: 0.5;
  border: dotted .5px #222222;
}

.draggable.dropping {
  background-color: #c3e5ae;
}

.appearing {
  animation: appear .4s forwards;
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.disappear {
  animation: disappear 0.5s ease-out forwards; /* 0.5s duration, ease-out timing, and forwards fill mode */
}
@keyframes disappear {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
