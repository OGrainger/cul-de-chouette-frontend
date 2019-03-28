export default {
    created() {

        window.addEventListener('beforeunload', this.handler);

        this.roomId = this.$route.params.id;

        let self = this;
        // Sub to the room
        this.$sails.socket.get(`/room/${this.roomId}/sub`, function (data, r) {
            if (r.statusCode === 404 || !data) {
                self.$router.push({name: 'Home'});
            }
            if (data.status === 'ARCHIVED') {
                self.$router.push({name: 'Home'});
            }

            if (!data.players) {
                data.players = [];
            }
            self.room = data;

        });

        this.$sails.socket.on(`NEW_PLAYER`, function (r) {
            self.room.players.push(r);
        });
        this.$sails.socket.on(`PLAYER_LEFT`, function (r) {
            self.room.players = self.room.players.filter(p => p.id !== r.playerDeleted.id);
            if (r.newPlayersTurn) {
                self.room.players.find(p => p.id === r.newPlayersTurn.id).isPlayersTurn = true;
                if (r.newPlayersTurn.order === 1) {
                    self.room.turn = self.room.turn + 1;
                }
            }
        });

        this.$sails.socket.on(`PLAYER_WON`, function (r) {
            self.$notify({
                text: `${r.player.username} gagne la partie !`
            });
            self.$router.push({name: 'Home'});
        });
        this.$sails.socket.on(`PLAYER_ACTION`, function (r) {
            if (r.action === 'THROW_CHOUETTES') {
                self.room.players.find(p => p.id === r.player.id).chouette1 = r.payload.chouette1;
                self.room.players.find(p => p.id === r.player.id).chouette2 = r.payload.chouette2;
            } else if (r.action === 'THROW_CUL') {
                self.room.players.find(p => p.id === r.player.id).isPlayersTurn = false;
                self.room.players.find(p => p.id === r.player.id).score = r.payload.score;
                self.room.players.find(p => p.id === r.player.id).cul = r.payload.cul;
                self.room.players.find(p => p.id === r.payload.newPlayersTurn.id).isPlayersTurn = true;
                if (r.payload.newPlayersTurn.order === 1) {
                    self.room.turnCount = Number(self.room.turnCount) + 1;
                }
            }
        });
    },

    beforeRouteLeave(to, from, next) {
        this.leave();
        next();
    },

    data: () => ({
        username: '',
        hasChooseUsername: false,
        roomId: null,
        room: {
            name: '',
            turn: 0,
            players: []
        },
        me: {
            username: ''
        },
        eventRaised: false
    }),

    methods: {
        hopIn() {
            var self = this;
            self.$sails.socket.post(`/room/${this.roomId}/newPlayer`, {
                username: self.username,
                room: self.room.id
            }, (r) => {
                self.me = r;
                self.hasChooseUsername = true;
            });
        },

        throwChouettes() {
            var self = this;
            self.$sails.socket.post(`/room/${this.roomId}/player/${this.me.id}/action`, {
                action: 'THROW_CHOUETTES'
            }, (r) => {
                self.me.chouette1 = r.chouette1;
                self.me.chouette2 = r.chouette2;
            });
        },

        throwCul() {
            let self = this;
            self.$sails.socket.post(`/room/${this.roomId}/player/${this.me.id}/action`, {
                action: 'THROW_CUL'
            }, (r) => {
                if (r) {
                    this.$notify({
                        title: 'Combinaison',
                        text: r.combinaison
                    });
                }
                self.me.chouette1 = 0;
                self.me.chouette2 = 0;
            });


        },

        handler: function handler() {
            this.leave();
        },

        leave() {
            if (this.hasChooseUsername && !this.eventRaised) {
                this.eventRaised = true;
                this.$sails.socket.delete(`/room/${this.roomId}/player/${this.me.id}`, {});
            }
        }
    }
}
