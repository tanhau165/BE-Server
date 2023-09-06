const { userJoinEnglishVocabulary } = require("./user-socket");
const { englishVocabularyProcessor } = require("./examination-socket");
const db = require("../models");

const configureSockets = (io, socket) => {
    return {
        userJoinEnglishVocabularyHandler: userJoinEnglishVocabulary(io, socket),
        englishVocabularyProcessorHandler: englishVocabularyProcessor(io, socket),
    };
};

const onConnection = (io) => async (socket) => {

    const {
        userJoinEnglishVocabularyHandler,
        englishVocabularyProcessorHandler
    } = configureSockets(io, socket);

    setInterval(englishVocabularyProcessorHandler, 1000);

    socket.on("user-join-english-vocabulary", userJoinEnglishVocabularyHandler);
};

module.exports = { onConnection };