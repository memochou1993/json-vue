<template>
  <div>
    <v-icon
      :color="color"
      :class="[spacing]"
      large
      @click="passEditorData('code', 'tree')"
    >
      {{ icons[0] }}
    </v-icon>
    <br
      v-if="br"
    >
    <v-icon
      :color="color"
      :class="[spacing]"
      large
      @click="passEditorData('tree', 'code')"
    >
      {{ icons[1] }}
    </v-icon>
  </div>
</template>

<script>
import {
  mapState, mapActions,
} from 'vuex';

export default {
  props: {
    icons: {
      type: Array,
      required: true,
    },
    br: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      color: 'primary lighten-2',
      spacing: 'ma-3',
    };
  },
  computed: {
    ...mapState('editor', [
      'codeEditor',
      'treeEditor',
    ]),
  },
  methods: {
    ...mapActions('editor', [
      'setEditorData',
      'setError',
    ]),
    getEditorData(from) {
      if (from === 'code') {
        return this.codeEditor.get();
      }
      if (from === 'tree') {
        return this.treeEditor.get();
      }
      return null;
    },
    passEditorData(from, to) {
      try {
        this.setEditorData({
          to,
          data: this.getEditorData(from),
        });
      } catch (error) {
        this.setError(error);
      }
    },
  },
};
</script>
