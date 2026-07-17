// ==========================================================================
// [수정버전] 버튼을 눌러야 시작하는 업다운 게임
// ==========================================================================

// HTML에서 onclick="startGame()"을 호출하면 이 상자 안의 코드가 비로소 실행됩니다.
function startGame() {

    // 1. 게임이 시작될 때마다 새롭게 무작위 비밀 숫자를 고릅니다.
    var computerNum = Math.floor(Math.random() * 50) + 1;
    var count = 0;

    // 치트키 콘솔로그 (F12 콘솔 탭에서 확인 가능)
    console.log("이번 판 컴퓨터의 비밀 숫자: " + computerNum);

    // 2. 본격적인 게임 무한 루프 시작
    while (true) {
        var userGuess = Number(prompt("Guess a number between 1 and 50 that the computer is thinking of!"));

        // 사용자가 취소 버튼을 누르거나 창을 닫으면 게임을 즉시 종료하는 예외 처리 방어코드
        if (userGuess === 0) {
            alert("Game cancelled.");
            break;
        }

        count = count + 1;

        if (userGuess === computerNum) {
            alert("🎉 Correct! Congratulations!\n👉 You got it in " + count + " tries.");
            break;

        } else if (userGuess > computerNum) {
            alert("🔽 Down! Try a smaller number. (Attempt " + count + ")");

        } else if (userGuess < computerNum) {
            alert("🔼 Up! Try a bigger number. (Attempt " + count + ")");

        } else {
            alert("⚠️ You didn't enter a valid number. Please try again.");
        }
    }
}