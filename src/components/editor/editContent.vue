<template>
  <q-btn align="left" class="q-pl-none q-mr-md" flat size="md" unelevated color="secondary" label="Edit" @click="open('bottom')" />
  <q-file standout style="width: 200px" accept=".bpmn" color="secondary" dense filled v-model="model" label="UPLOAD FILE">
    <template v-slot:prepend>
      <q-icon name="cloud_upload" />
    </template>
  </q-file>

  <q-dialog v-model="dialog" full-width position="bottom">
    <q-card style="width: 100vw">
      <q-card-section>
        <div class="text-overline text-secondary">Edit Your text content and subtitle</div>
        <div class="cursor-pointer text-h6 q-mt-sm q-mb-xs">
          {{ label }}
          <q-popup-edit v-model="label" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
      </q-card-section>
      <q-linear-progress :value="1" color="secondary" />
      <q-editor
        v-model="qeditor"
        :dense="$q.screen.lt.md"
        :toolbar="[
          [
            {
              label: $q.lang.editor.align,
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              list: 'only-icons',
              options: ['left', 'center', 'right', 'justify']
            },
            {
              label: $q.lang.editor.align,
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              options: ['left', 'center', 'right', 'justify']
            }
          ],
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          ['token', 'hr', 'link', 'custom_btn'],
          ['print', 'fullscreen'],
          [
            {
              label: $q.lang.editor.formatting,
              icon: $q.iconSet.editor.formatting,
              list: 'no-icons',
              options: [
                'p',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'code'
              ]
            },
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7'
              ]
            },
            {
              label: $q.lang.editor.defaultFont,
              icon: $q.iconSet.editor.font,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'default_font',
                'arial',
                'arial_black',
                'comic_sans',
                'courier_new',
                'impact',
                'lucida_grande',
                'times_new_roman',
                'verdana'
              ]
            },
            'removeFormat'
          ],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

          ['undo', 'redo'],
          ['viewsource']
        ]"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana'
        }"
      />
    </q-card>
  </q-dialog>
</template>

<script>
import index from 'diagram-js-minimap'
import { ref, watch } from 'vue'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    updateText: {
      type: Function,
    },
    updateSubtitle: {
      type: Function
    },
    index: {
      type: Number
    },
    updateBPMN: {
      type: Function
    }
  },
  setup(props) {
    const dialog = ref(false)
    const label = ref(props.item.subtitle)
    const qeditor = ref(props.item.text)
    const model = ref(null)

    watch(qeditor, (newValue) => {

      props.updateText(props.index, newValue)
    })

    watch(label, (newValue) => {
      props.updateSubtitle(props.index, newValue)
    })

    const readBlobContent = (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        props.updateBPMN(props.index, content)
      };
      reader.readAsText(file);
    };

    watch(model, (newValue)=> {
      if (newValue) {
        readBlobContent(newValue);
      }
    })


    const open = (pos) => {

      dialog.value = true
    }

    return {
      label,
      qeditor,
      dialog,
      open,
      model

    }
  }
}
</script>
