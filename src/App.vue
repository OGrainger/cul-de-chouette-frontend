<template>
  <v-app>
    <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
          <router-link :to="{ name: 'Home' }">

          <span>CUL</span>
          <span class="font-weight-light"> DE CHOUETTE</span>
          </router-link>

        </v-toolbar-title>

      <v-spacer></v-spacer>

      <!--<v-btn flat>
        <span class="mr-2">Déconnexion</span>
      </v-btn>-->
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
    import Home from './components/home/Home'
    import Room from './components/room/Room'

    export default {
        name: 'App',
        components: {
            Home,
            Room
        },
        data() {
            return {
                isConnected: false
            }
        }
    }
</script>
<style>
  a {
    color: inherit !important;
    text-decoration: none; /* no underline */
  }
</style>
