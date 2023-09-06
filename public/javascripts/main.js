const socket = io.connect('/');

function userJoinEnglishVocabulary() {
    socket.emit('user-join-english-vocabulary')
}

socket.on('english-vocabulary-processor', function (data) {
    console.log(data);
})