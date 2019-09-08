<template>
  <div>
    <v-footer
      height="auto"
    >
      <v-card
        class="flex primary primary-gradient white--text text-xs-center"
      >
        <v-card-text>
          <span
            class="pointer"
            @click="explore()"
          >
            &copy; 2019 Memo Chou
          </span>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  methods: {
    explore() {
      window.open('https://github.com/memochou1993/json-vue', '_blank');
    },
  },
};
</script>
