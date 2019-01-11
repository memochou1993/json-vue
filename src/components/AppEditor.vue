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
              @click="passData('code', 'tree')"
            >
              arrow_forward
            </v-icon>
            <br>
            <v-icon
              x-large
              color="primary lighten-1"
              class="ma-3"
              @click="passData('tree', 'code')"
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
              @click="passData('code', 'tree')"
            >
              arrow_downward
            </v-icon>
            <v-icon
              x-large
              color="primary lighten-1"
              class="ma-3"
              @click="passData('tree', 'code')"
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
      error: '',
    };
  },
  mounted() {
    const [code, tree] = [this.$refs.code, this.$refs.tree];
    this.codeEditor = this.getEditor(code, 'code');
    this.treeEditor = this.getEditor(tree, 'tree');
    const data = this.getCache('data');
    this.setData('code', data);
    this.setData('tree', data);
  },
  methods: {
    getEditor(container, mode) {
      const options = {
        mode,
        modes: ['code', 'form', 'text', 'tree', 'view'],
        onError: (error) => {
          this.error = error.toString();
        },
      };
      return new Editor(container, options);
    },
    setCache(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getCache(key) {
      return JSON.parse(localStorage.getItem(key)) || {};
    },
    setData(to, value) {
      switch (to) {
        case 'code':
          this.codeEditor.set(value);
          break;
        case 'tree':
          this.treeEditor.set(value);
          break;
        default:
          break;
      }
    },
    getData(from) {
      switch (from) {
        case 'code':
          return this.codeEditor.get();
        case 'tree':
          return this.treeEditor.get();
        default:
          return {};
      }
    },
    passData(from, to) {
      const value = this.getData(from);
      this.setData(to, value);
      this.setCache('data', value);
    },
  },
};
</script>
