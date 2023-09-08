const socket = io.connect('/');


// Check joined challenge
$(document).ready(function () {
    if (localStorage.getItem("challengeJoined")) {
        userJoinEnglishVocabulary();
        $('#select-challenge').css('display', 'none');
        $('#challenge-box').css('display', 'block');
    }
});

function userJoinEnglishVocabulary() {
    const userInfo = getUserInfo();
    if (userInfo) {
        socket.emit('user-join-english-vocabulary', userInfo);
        localStorage.setItem("challengeJoined", "ENGLISH_VOCABULARY");
    } else {
        $.ajax({
            url: '/user-info',
            success: function (data) {
                const { userInfo } = data;
                socket.emit('user-join-english-vocabulary', userInfo);
                localStorage.setItem("challengeJoined", "ENGLISH_VOCABULARY");
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
            }
        });
    }
}

socket.on("english-vocabulary-processor", function (data) {
    $('#textQuestion').html(`${data}`);
})

socket.on("userJoinResult", function (data) {
    localStorage.setItem("socketInfo", JSON.stringify(data));
});

function getUserInfo() {
    const userInfoAsStr = localStorage.getItem("userInfo");
    if (userInfoAsStr) {
        return JSON.parse(userInfoAsStr);
    }
    return undefined;
}