export default {
    created() {

        var self = this;
        // Sub to available rooms
        this.$sails.socket.get('/room', function (rooms) {
            self.rooms = rooms;
            self.filteredRooms = self.rooms;
            self.loading = false;
        });

        this.$sails.socket.on('room', function (msg) {
            if (msg.verb === 'created') {
                self.rooms.push(msg.data);
            } else if (msg.verb === 'destroyed') {
                self.rooms = self.rooms.filter((r) => r.id !== msg.id);
            }
            self.filteredRooms = self.rooms.filter((r) => r.name.toUpperCase().includes(self.search.toUpperCase()));
        });

        /*this.$sails.socket.on('player', function (msg) {
            if (msg.verb === 'created') {
                self.rooms.find(r => r.id === msg.data.room.id).players.push(msg.data);
            } else if (msg.verb === 'destroyed') {
                self.rooms.find(r => r.id === msg.data.room.id).players = self.rooms.find(r => r.id === msg.data.room.id).players.filter((r) => r.id !== msg.id);
            }
            self.filteredRooms = self.rooms.filter((r) => r.name.toUpperCase().includes(self.search.toUpperCase()));
        });*/
    },

    destroyed() {
        //this.$sails.socket.disconnect();
    },


    data: () => ({
        rooms: [],
        filteredRooms: [],
        newRoomName: '',
        search: '',
        loading: true,
        serverError: false
    }),

    methods: {
        createRoom() {
            var self = this;

            this.$http.post('room', {
                name: this.newRoomName
            }).then((r) => {
                self.$router.push({ name: 'Room', params: { id: r.data.id }});
            });
        },
        filterRooms() {
            var self = this;
            if (self.search) {
                self.filteredRooms = self.rooms.filter((r) => r.name.toUpperCase().includes(self.search.toUpperCase()));
            } else {
                self.filteredRooms = self.rooms;
            }
        },
        resetFiltering() {
            var self = this;
            self.filteredRooms = self.rooms;
            self.search = '';
        }
    }
}
