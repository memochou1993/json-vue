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
        />
      </v-flex>
      <v-flex
        md1
        xs12
      >
        <v-layout
          justify-center
        >
          <AppEditorPivot
            class="hidden-sm-and-down"
            :icons="['fas fa-arrow-right', 'fas fa-arrow-left']"
            :br="true"
          />
          <AppEditorPivot
            class="hidden-md-and-up"
            :icons="['fas fa-arrow-down', 'fas fa-arrow-up']"
            :br="false"
          />
        </v-layout>
      </v-flex>
      <v-flex
        md5
        xs12
      >
        <div
          ref="tree"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import {
  mapState, mapActions,
} from 'vuex';
import Editor from 'jsoneditor';
import Cache from '@/helpers/Cache';
import AppEditorPivot from '@/components/AppEditorPivot.vue';

export default {
  components: {
    AppEditorPivot,
  },
  computed: {
    ...mapState('editor', [
      'data',
      'error',
    ]),
  },
  watch: {
    data(value) {
      Cache.set('data', value);
      this.error && this.setError('');
    },
  },
  created() {
    this.setData(Cache.get('data'));
  },
  mounted() {
    const [code, tree] = [this.$refs.code, this.$refs.tree];
    this.setEditor({
      mode: 'code',
      editor: this.initEditor(code, 'code'),
    });
    this.setEditor({
      mode: 'tree',
      editor: this.initEditor(tree, 'tree'),
    });
    this.setEditorData({
      to: 'code',
      data: this.data,
    });
    this.setEditorData({
      to: 'tree',
      data: this.data,
    });
  },
  methods: {
    ...mapActions('editor', [
      'setEditor',
      'setEditorData',
      'setData',
      'setError',
    ]),
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
  },
};
</script>
