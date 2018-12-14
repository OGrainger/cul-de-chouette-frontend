<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 v-if="!hasChooseUsername">
        <h2>Choisissez un pseudo</h2>

        <v-form ref="form" lazy-validation>
          <v-layout row wrap>
            <v-flex xs12 sm9>
              <v-text-field
                      v-model="username"
                      label="Pseudo"
                      solo
                      counter
                      maxlength="15"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm3>
              <v-btn @click="hopIn" :disabled="username === ''">
                Rejoindre
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>

      <v-flex xs12 v-if="hasChooseUsername">
        {{room}}
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
