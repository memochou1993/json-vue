<template>
  <div>
    <v-app>
      <TheToolbar />
      <v-content>
        <v-container
          fluid
          fill-height
        >
          <v-flex>
            <router-view />
          </v-flex>
        </v-container>
      </v-content>
      <TheFooter />
    </v-app>
  </div>
</template>

<script>
import TheToolbar from '@/components/TheToolbar.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheToolbar,
    TheFooter,
  },
};
</script>

<style lang="stylus">
.pointer
  cursor pointer
.primary-gradient {
  background-image: -webkit-linear-gradient(right, #061D30, #2C4C68);
  background-image: -moz-linear-gradient(right, #061D30, #2C4C68);
  background-image: -o-linear-gradient(right, #061D30, #2C4C68);
  background-image: linear-gradient(to right, #061D30, #2C4C68);
}
</style>
