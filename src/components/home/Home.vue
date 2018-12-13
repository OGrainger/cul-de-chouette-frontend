<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Salles disponibles</h2>
      </v-flex>
      <v-flex xs12 sm3>
        <v-text-field
                v-model="search"
                label="Recherche"
                append-outer-icon="search"
                v-on:change="filterRooms"
                clearable
                @click:clear="resetFiltering"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 style="margin-bottom: 50px"></v-flex>
      <v-flex xs 12 md6 offset-md3 v-if="rooms.length === 0">
        <v-alert
                :value="true"
                color="info"
                icon="info"
                outline
        >
          Aucune salle de jeu n'existe actuellement.
        </v-alert>
      </v-flex>

      <v-flex xs 12 md6 offset-md3 v-if="filteredRooms.length === 0 && rooms.length > 0">
        <v-alert
                :value="true"
                color="info"
                icon="info"
                outline
        >
          Aucune salle ne correspond à la recherche.
        </v-alert>
      </v-flex>
      <v-flex xs12 sm6 md3 v-for="room in filteredRooms" :key="room.id">
        <div>
          <v-card>
            <v-card-title primary-title>
              <v-badge color="grey">
                <h3>{{room.name}}</h3>
                <span slot="badge">{{room.id}}</span>

              </v-badge>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="" :to="{ name: 'Room', params: { id: room.id }}">
                Rejoindre
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>

      </v-flex>
      <v-flex xs12 style="margin-top: 50px">
        <h2>Créer une salle</h2>

        <v-form ref="form" lazy-validation>
          <v-layout row wrap>
            <v-flex xs12 sm9>
              <v-text-field
                      v-model="newRoomName"
                      label="Nom de la salle"
                      solo
                      required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm3>
              <v-btn @click="submit" :disabled="newRoomName === ''">
                Créer
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import HomeMixin from './Home.mixin'

    export default {
        mixins: [HomeMixin]
    }
</script>
