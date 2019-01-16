<template>
  <div>
    <v-layout
      row
      wrap
      align-center
      justify-center
    >
      <v-flex
        md5
        xs12
      >
        <div
          ref="code"
          class="editor"
        />
      </v-flex>
      <v-flex
        md1
        xs12
      >
        <v-layout
          justify-center
        >
          <div
            class="hidden-sm-and-down"
          >
            <v-icon
              x-large
              color="primary lighten-1"
              class="ma-3"
              @click="passEditorData('code', 'tree')"
            >
              arrow_forward
            </v-icon>
            <br>
            <v-icon
              x-large
              color="primary lighten-1"
              class="ma-3"
              @click="passEditorData('tree', 'code')"
            >
              arrow_back
            </v-icon>
          </div>
          <div
            class="hidden-md-and-up"
          >
            <v-icon
              x-large
              color="primary lighten-1"
              class="ma-3"
              @click="passEditorData('code', 'tree')"
            >
              arrow_downward
            </v-icon>
            <v-icon
              x-large
              color="primary lighten-1"
              class="ma-3"
              @click="passEditorData('tree', 'code')"
            >
              arrow_upward
            </v-icon>
          </div>
        </v-layout>
      </v-flex>
      <v-flex
        md5
        xs12
      >
        <div
          ref="tree"
          class="editor"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Editor from 'jsoneditor';
import Cache from '@/helpers/Cache';

export default {
  data() {
    return {
      //
    };
  },
  computed: {
    codeEditor() {
      return this.$store.state.editor.codeEditor;
    },
    treeEditor() {
      return this.$store.state.editor.treeEditor;
    },
    data() {
      return this.$store.state.editor.data;
    },
    error() {
      return this.$store.state.editor.error;
    },
  },
  watch: {
    data(value) {
      Cache.set('data', value);
    },
  },
  created() {
    this.setData(Cache.get('data'));
  },
  mounted() {
    const [code, tree] = [this.$refs.code, this.$refs.tree];
    const codeEditor = this.initEditor(code, 'code');
    const treeEditor = this.initEditor(tree, 'tree');
    this.setEditor('code', codeEditor);
    this.setEditor('tree', treeEditor);
    this.setEditorData('code', this.data);
    this.setEditorData('tree', this.data);
  },
  methods: {
    initEditor(container, mode) {
      const options = {
        mode,
        onChangeText: (data) => {
          try {
            this.setData(data);
          } catch (error) {
            this.setError(error);
          }
        },
        onError: (error) => {
          this.setError(error);
        },
      };
      return new Editor(container, options);
    },
    setEditor(mode, editor) {
      this.$store.dispatch('setEditor', {
        mode,
        editor,
      });
    },
    setEditorData(to, data) {
      this.$store.dispatch('setEditorData', {
        to,
        data,
      });
    },
    getEditorData(from) {
      switch (from) {
        case 'code':
          return this.codeEditor.get();
        case 'tree':
          return this.treeEditor.get();
        default:
          return {};
      }
    },
    passEditorData(from, to) {
      try {
        this.$store.dispatch('setEditorData', {
          to,
          data: this.getEditorData(from),
        });
      } catch (error) {
        this.setError(error);
      }
    },
    setData(data) {
      this.$store.dispatch('setData', typeof data === 'string' ? JSON.parse(data) : data);
    },
    setError(error) {
      this.$store.dispatch('setError', typeof error === 'string' ? error : error.toString());
    },
  },
};
</script>
