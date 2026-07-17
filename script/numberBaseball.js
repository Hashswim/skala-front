// HTML에서 onclick="startNumberBaseballGame()"을 호출하면 이 상자 안의 코드가 비로소 실행됩니다.
function startNumberBaseballGame() {

    // 1. 게임이 시작될 때마다 새롭게 무작위 4자리의 비밀 숫자를 고릅니다.
    var computerNum = [];
    for (var i = 0; i < 4; i++) {
        computerNum.push(Math.floor(Math.random() * 10));
    }
    var life = 20;
    var gameRecords = [];

    while (life > 0) {
        // 2. 사용자에게 4자리 숫자를 입력받습니다.
        var userGuess = prompt("🎯 Number Baseball Game (Allowing duplicates) 🎯\n\n" +
            "Chances left: " + life + "\n" +
            "Enter a 4-digit number (e.g. 1234): ");

        // 사용자가 취소 버튼을 누르거나 창을 닫으면 게임을 즉시 종료하는 예외 처리 방어코드
        if (userGuess === null) {
            alert("Game cancelled.");
            break;
        }

        // 입력된 숫자가 4자리가 아니면 다시 입력받기
        if (userGuess.length !== 4 || !/^\d{4}$/.test(userGuess)) {
            alert("⚠️ Please enter a 4-digit number.");
            continue;
        }

        // 사용자의 추측을 검증하고 결과를 얻습니다.
        var result = checkNumberBaseballGuess(userGuess, gameRecords, computerNum);
        life--;

        // 결과 출력
        if (result.strike === 4) {
            alert("🎉 Congratulations! You got it right! 🎉\n" +
                "Answer: " + computerNum.join('') + "\n" +
                "Total attempts: " + (20 - life));
            break;
        } else {
            alert("Your guess: " + userGuess + "\n" +
                "Strike: " + result.strike + ", Ball: " + result.ball + "\n" +
                "Chances left: " + life);
        }
    }

    // 치트키 콘솔로그 (F12 콘솔 탭에서 확인 가능)
    console.log("Answer: " + computerNum);
}

function checkNumberBaseballGuess(userGuess, gameRecords, computerNum) {
    // 2. 사용자가 입력한 숫자를 배열로 변환합니다.
    var userGuessArray = userGuess.split('').map(Number);

    // 3. 스트라이크와 볼을 계산합니다.
    var strike = 0;
    var ball = 0;

    // 먼저 스트라이크(자리와 숫자가 모두 일치)를 확정하고,
    // 스트라이크가 아닌 자리의 숫자들만 볼 계산 대상으로 따로 모아둡니다.
    var remainingComputerDigits = [];
    var remainingGuessDigits = [];

    for (var i = 0; i < 4; i++) {
        if (userGuessArray[i] === computerNum[i]) {
            strike++;
        } else {
            remainingComputerDigits.push(computerNum[i]);
            remainingGuessDigits.push(userGuessArray[i]);
        }
    }

    // 남은 숫자들을 하나씩 대조하면서, 정답 쪽에서 짝을 찾으면 그 자리를 제거합니다.
    for (var j = 0; j < remainingGuessDigits.length; j++) {
        var matchIndex = remainingComputerDigits.indexOf(remainingGuessDigits[j]);
        if (matchIndex !== -1) {
            ball++;
            remainingComputerDigits.splice(matchIndex, 1);
        }
    }

    // 4. 결과를 기록하고 반환합니다.
    gameRecords.push({ guess: userGuess, strike: strike, ball: ball });
    return { strike: strike, ball: ball };
}