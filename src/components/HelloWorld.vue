<template>
  <v-container>
    <v-layout
            text-xs-center
            wrap
    >
      <v-flex xs12 sm3 v-for="room in rooms" :key="room.id">
        <v-card>
          <v-card-title primary-title>
            <h3>Hello</h3>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="green">Rejoindre</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        data: () => ({
            rooms: []
        })
    }
</script>

<style>

</style>
