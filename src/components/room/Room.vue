<template>
  <v-container grid-list-md>

    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="elevation-3">
          <v-card-title>
            <v-layout row wrap>
              <v-flex xs12 md9 text-xs-left>
                <h1>Salle : {{room.name}}</h1>
              </v-flex>
              <v-flex xs12 md3 text-xs-right>
                <h1 style="font-weight: normal"> Tour {{room.turnCount}}</h1>
              </v-flex>

            </v-layout>
          </v-card-title>
        </v-card>


      </v-flex>

      <v-flex xs12 v-if="!hasChooseUsername && room.players.length < 6">
        <v-card>
          <v-card-title>
            <v-layout row wrap>
              <v-flex xs12>
                <h2>Choisissez un pseudo</h2>
              </v-flex>
              <v-flex xs12 sm10>
                <v-text-field
                        v-model="username"
                        label="Pseudo"
                        counter
                        maxlength="15"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm2>
                <v-btn flat @click="hopIn" :disabled="username === ''">
                  Rejoindre
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-title>
        </v-card>

      </v-flex>

      <v-flex xs12 v-if="hasChooseUsername && room.players.length < 2">
        <h2>En attente d'un autre joueur...</h2>
        <div class="text-xs-center">
          <v-progress-circular :indeterminate="true"></v-progress-circular>
        </div>
      </v-flex>


      <v-flex xs12 v-if="room.players.length >= 2" style="margin-top: 50px">
        <v-layout row wrap>

          <v-flex xs12 md3>
            <v-card class="elevation-2">
              <v-list>
                <v-list-tile>
                  <v-list-tile-content class="font-weight-bold">Joueurs</v-list-tile-content>
                  <v-list-tile-content class="align-end font-weight-bold">Score</v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-for="player in room.players" :key="player.id">
                  <v-list-tile-content><span :class="player.id === me.id ? 'font-weight-bold' : null"><span
                          class="font-weight-bold" v-if="player.isPlayersTurn"> > </span>{{player.username}}
                    <span v-if="player.id === me.id "> (vous) </span> :</span></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ player.score }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
            <v-card v-if="hasChooseUsername && room.players.some(p => p.isPlayersTurn && p.id === me.id)"
                    style="margin-top: 15px">
              <v-card-title>
                <h1>Actions</h1>
              </v-card-title>
              <v-card-actions>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-btn flat @click="throwChouettes" :disabled="me.chouette1 > 0 && me.chouette2 > 0">
                      Lancer les chouettes
                    </v-btn>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn flat @click="throwCul" :disabled="me.chouette1 === 0 && me.chouette2 === 0">
                      Lancer le cul
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>

          </v-flex>
          <v-flex xs12 md1>
          </v-flex>
          <v-flex xs12 md8>
            <v-layout row wrap>
              <v-flex xs12 sm6 v-for="player in room.players" :key="player.id">
                <v-card flat :dark="Boolean(player.isPlayersTurn)" style="margin: 2px">
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs11>
                        <h3 class="headline mb-0">{{player.username}} <span v-if="player.id === me.id "> (vous) </span>
                        </h3>
                      </v-flex>
                      <v-flex xs1>
                        <h3 class="headline">{{player.score}}</h3>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap row>
                      <v-flex xs8>
                        <span>Chouettes</span>
                      </v-flex>
                      <v-flex xs3 style="text-align: right">
                        <span>Cul</span>
                      </v-flex>
                      <v-flex xs3>
                        <dice
                                :angle="player.chouette1"
                                :faces="6"
                                color="'black"
                                firstColor="black"
                                backgroundColor="white"
                                frameColor="grey"
                        ></dice>
                      </v-flex>
                      <v-flex xs3>
                        <dice
                                :angle="player.chouette2"
                                :faces="6"
                                color="'black"
                                firstColor="black"
                                backgroundColor="white"
                                frameColor="grey"
                        ></dice>
                      </v-flex>
                      <v-flex xs3 offset-xs3>
                        <dice
                                :angle="player.cul"
                                :faces="6"
                                color="'black"
                                firstColor="black"
                                backgroundColor="white"
                                frameColor="grey"
                        ></dice>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
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
