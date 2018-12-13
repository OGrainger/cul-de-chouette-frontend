<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>

      <v-flex xs12 md6>
        <h2>Se connecter</h2>

        <v-form ref="form" lazy-validation>
          <v-text-field
                  v-model="username"
                  label="Nom"
                  required
          ></v-text-field>
          <v-text-field
                  v-model="password"
                  label="Mot de passe"
                  required
          ></v-text-field>
          <v-btn @click="submit">
            Connexion
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import HomeMixin from './Access.mixin'

    export default {
        mixins: [HomeMixin]
    }
</script>
