
const vocabularies = [
    {
        "word": "go",
        "mean": "đi",
    },
    {
        "word": "eat",
        "mean": "ăn",
    },
    {
        "word": "one",
        "mean": "một",
    },
    {
        "word": "two",
        "mean": "hai",
    },
    {
        "word": "three",
        "mean": "ba",
    },
    {
        "word": "four",
        "mean": "bốn",
    },
    {
        "word": "five",
        "mean": "năm",
    }
]

const answersOfUser = [];

let i = -1;
let message = "";
let word = '';
let mean = '';

const englishVocabularyQuestionProcessor = (io, socket) => {
    i++;
    switch (i) {
        case 0:
            const rdQs = randomQuestion();
            word = rdQs.word;
            mean = rdQs.mean;
            message = `${word} trong tiếng Anh nghĩa là gì ?`
            break;
        case 2:
            message = '10';
            break;
        case 3:
            message = '9';
            break;
        case 4:
            message = '8';
            break;
        case 5:
            message = '7';
            break;
        case 6:
            message = '6';
            break;
        case 7:
            message = '5';
            break;
        case 8:
            message = '4';
            break;
        case 9:
            message = '3';
            break;
        case 10:
            message = '2';
            break;
        case 11:
            message = '1';
            break;
        case 13:
            message = `${word} trong tiếng anh có nghĩa là ${mean}.`;
            break;
        case 15:
            const winner = calcWinner();
            if (winner) {
                message = `Xin chúc mừng bạn ${winner.username} đã trả lời nhanh nhất.`;
            } else {
                message = `Rất tiếc không ai trả lời được câu hỏi. `;
            }
            break;
        case 17:
            message = `Chúng ta đến với câu tiếp theo`;
            i = -1;
            break;
        default:
            break;
    }
    io.sockets.in('ENGLISH_VOCABULARY').emit('english-vocabulary-processor', message);
};

const englishVocabularyAnswerProcessor = (io, socket) => {
    return function englishVocabularyAnswerProcessorHandler(payload) {
        const { username, socketId, answer } = payload;
        answersOfUser.push(
            {
                username: username, socketId: socketId, answer: answer, time: Date.now()
            }
        )
    };
};

const randomQuestion = () => {
    const rndInt = Math.floor(Math.random() * 6) + 1
    const index = rndInt % vocabularies.length;
    return vocabularies.at(index)
}

const calcWinner = () => {
    return answersOfUser.sort(
        (prev, current) => {
            return prev.time > current.time ? prev : current
        }
    )[0];
}


module.exports = { englishVocabularyQuestionProcessor, englishVocabularyAnswerProcessor };