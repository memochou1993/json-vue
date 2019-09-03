export default {
  namespaced: true,
  state: {
    codeEditor: null,
    treeEditor: null,
    data: {},
    error: '',
  },
  mutations: {
    setCodeEditor(state, codeEditor) {
      state.codeEditor = codeEditor;
    },
    setTreeEditor(state, treeEditor) {
      state.treeEditor = treeEditor;
    },
    setData(state, data) {
      state.data = data;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    setEditor({
      commit,
    }, {
      mode,
      editor,
    }) {
      if (mode === 'code') {
        commit('setCodeEditor', editor);
      }
      if (mode === 'tree') {
        commit('setTreeEditor', editor);
      }
    },
    setEditorData({
      state,
    }, {
      to,
      data,
    }) {
      if (to === 'code') {
        state.codeEditor.set(data);
        state.codeEditor.focus();
      }
      if (to === 'tree') {
        state.treeEditor.set(data);
        state.treeEditor.expandAll();
      }
    },
    setData({
      commit,
    }, data) {
      commit('setData', typeof data === 'string' ? JSON.parse(data) : data);
    },
    setError({
      commit,
    }, error) {
      commit('setError', typeof error === 'string' ? error : error.toString());
    },
  },
};
