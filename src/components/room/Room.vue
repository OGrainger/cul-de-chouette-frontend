<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>Saisissez votre pseudo</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import RoomMixin from './Room.mixin'

    export default {
        mixins: [RoomMixin]
    }
</script>
