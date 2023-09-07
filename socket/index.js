const { userJoinEnglishVocabulary } = require("./user-socket");
const { englishVocabularyAnswerProcessor, englishVocabularyQuestionProcessor} = require("./examination-socket");
const db = require("../models");

const configureSockets = (io, socket) => {
    return {
        userJoinEnglishVocabularyHandler: userJoinEnglishVocabulary(io, socket),
        englishVocabularyAnswerProcessorHandler: englishVocabularyAnswerProcessor(io, socket)
    };
};

const onConnection = (io) => (socket) => {

    const {
        userJoinEnglishVocabularyHandler,
        englishVocabularyAnswerProcessorHandler,
    } = configureSockets(io, socket);

    socket.on("user-join-english-vocabulary", userJoinEnglishVocabularyHandler);
    socket.on("english-vocabulary-answer", englishVocabularyAnswerProcessorHandler);
};

const englishVocabularyQuestion = (io) => (socket) => {
   englishVocabularyQuestionProcessor(io, socket);
};

module.exports = { onConnection, englishVocabularyQuestion };