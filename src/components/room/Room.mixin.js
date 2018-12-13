export default {
    created() {

        this.roomId = this.$route.params.id;

        var self = this;
        // Sub to the room
        this.$sails.socket.get(`room-${this.roomId}`, function (data) {
            console.log(data);
        });

        this.$sails.socket.on('USER_CHANGE', function (msg) {
            console.log(msg);
        });
    },

    data: () => ({
        roomId: null,
        room: {},
        player: {},
        players: []
    }),

    methods: {
        hopIn() {
            var self = this;

            this.$http.post('room', {
                name: this.newRoomName
            }).then((r) => {
                self.$router.push({ name: 'Room', params: { id: r.data.id }});
            });
        }
    }
}
