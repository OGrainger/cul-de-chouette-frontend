export default {
    created() {

        this.roomId = this.$route.params.id;

        let self = this;
        // Sub to the room
        this.$sails.socket.get(`/room/${this.roomId}/sub`, function (data, r) {
            if (r.statusCode === 404 || !data) {
                self.$router.push({name: 'Home'});
            }

            if (!data.players) {
                data.players = [];
            }
            self.room = data;
        });

        this.$sails.socket.on(`room`, function (msg) {
            console.log(msg);
        });
        this.$sails.socket.on(`NEW_PLAYER`, function (r) {
            self.room.players.push(r);
        });
        this.$sails.socket.on(`UPDATED_ROOM`, function (r) {
            self.room = r;
        });
    },

    destroyed() {
        if (this.hasChooseUsername) {
            this.$sails.socket.delete(`/room/${this.roomId}/player/${this.player.id}`);
        }
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
        player: {
            username: ''
        },
    }),

    methods: {
        hopIn() {
            var self = this;
            self.$sails.socket.post(`/room/${this.roomId}/newPlayer`, {
                username: self.username,
                room: self.room.id
            }, (r) => {
                self.player = r;
                self.hasChooseUsername = true;
            });
        }
    }
}
