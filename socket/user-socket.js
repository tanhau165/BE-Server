const { addUserLocation } = require("./helpers");
const db = require("../models");

const userJoinEnglishVocabulary = (io, socket) => {
    return async function userJoinEnglishVocabularyHandler(payload) {
        socket.join("ENGLISH_VOCABULARY");
        socket.emit('userJoinResult', {
            socketId: socket.id,
            username: payload.username
        })
    };
};

module.exports = { userJoinEnglishVocabulary };