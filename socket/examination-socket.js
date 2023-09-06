const vocabularies = [
    {
        "go": "đi",
        "eat": "ăn",
    }
]
const WELL_COME_1 = "Chào mừng bạn đến với chương trình học từ vựng tiếng Anh";
const WELL_COME_2 = "Chào mừng bạn đến với chương trình học từ vựng tiếng Anh";
const WELL_COME_3 = "Chào mừng bạn đến với chương trình học từ vựng tiếng Anh";
let times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ];

const englishVocabularyProcessor = (io, socket) => {
    return async function englishVocabularyProcessorHandler(payload) {
        io.sockets.in('ENGLISH_VOCABULARY').emit('english-vocabulary-processor', []);
    };
};

module.exports = { englishVocabularyProcessor };