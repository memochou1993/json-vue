<template>
  <div
    id="app"
  >
    <TheToolbar />
    <v-content>
      <v-container
        fluid
      >
        <RouterView />
      </v-container>
    </v-content>
    <TheFooter />
  </div>
</template>

<script>
import TheToolbar from '@/components/TheToolbar.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  components: {
    TheToolbar,
    TheFooter,
  },
};
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
