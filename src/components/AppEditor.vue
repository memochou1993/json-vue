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

export default {
  data() {
    return {
      codeEditor: {},
      treeEditor: {},
      data: {},
      error: '',
    };
  },
  watch: {
    data(value) {
      this.setCacheData('data', value);
    },
  },
  created() {
    this.data = this.getCacheData('data');
  },
  mounted() {
    const [code, tree] = [this.$refs.code, this.$refs.tree];
    this.codeEditor = this.initEditor(code, 'code');
    this.treeEditor = this.initEditor(tree, 'tree');
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
            this.setError('');
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
    setCacheData(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
    getCacheData(key) {
      return JSON.parse(localStorage.getItem(key)) || {};
    },
    setEditorData(to, data) {
      switch (to) {
        case 'code':
          this.codeEditor.set(data);
          this.codeEditor.focus();
          break;
        case 'tree':
          this.treeEditor.set(data);
          this.treeEditor.expandAll();
          break;
        default:
          break;
      }
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
        const data = this.getEditorData(from);
        this.setEditorData(to, data);
        this.setError('');
      } catch (error) {
        this.setError(error);
      }
    },
    setData(data) {
      this.data = JSON.parse(data);
    },
    setError(error) {
      this.error = error.toString();
    },
  },
};
</script>
