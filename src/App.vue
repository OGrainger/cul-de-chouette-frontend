<template>
  <v-app>
    <v-toolbar app class="primary">
        <v-toolbar-title class="headline text-uppercase">
          <router-link :to="{ name: 'Home' }">

          <span>CUL</span>
          <span class="font-weight-light"> DE CHOUETTE</span>
          </router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>DEMO (Score max : 50)</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content><notifications position="top center"></notifications>
      <router-view></router-view>
    </v-content>
    <v-footer height="auto">
      <v-layout
              justify-center
              row
              wrap
      >
        <v-btn  flat
                round
                href="https://fr.wikibooks.org/wiki/Bo%C3%AEte_%C3%A0_jeux/Le_cul_de_chouette"
        >
          Règles du jeu
        </v-btn>
        <v-flex py-3
                text-xs-right
                xs6>
          <span style="margin-right: 50px">(Environ 12% des règles sont actuellement appliquées)</span>
          &copy;2018 — <strong>Kaamelott</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>

    export default {
        name: 'App',
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
  .notifications {
    top: 5px !important;
  }
</style>
