function checkGrade() {
    // 1. 과목명이 담긴 배열을 선언합니다.
    var subjects = ["HTML", "CSS", "JavsScript"];
    
    // 2. 점수들을 누적하여 더해줄 총점 변수를 0으로 초기화합니다.
    var total = 0;

    // 3. 배열의 길이(subjects.length = 3)만큼 반복문을 돌립니다.
    for (var i = 0; i < subjects.length; i++) {
        
        // prompt창을 띄워 현재 순서(i)의 과목 점수를 입력받습니다.
        // Number()로 감싸서 문자열을 숫자 데이터로 즉시 변환합니다.
        var score = Number(prompt("Please enter your " + subjects[i] + " score. (0 ~ 100)"));

        // 사용자가 취소 버튼을 눌렀을 때의 예외 처리
        if (isNaN(score)) {
            alert("Cancelling calculation because a valid number was not entered.");
            return; // 함수를 즉시 종료합니다.
        }

        // 입력받은 과목 점수를 총점에 누적하여 더합니다.
        total = total + score;
    }

    // 4. 반복문이 끝난 후, 총점을 과목 수(3)로 나누어 평균을 구합니다.
    var average = total / subjects.length;

    // 5. 조건문을 사용하여 평균 60점을 기준으로 합격/불합격을 나눕니다.
    var result = "";
    if (average >= 60) {
        result = "🎉 Pass! You've been selected as an honor student.";
    } else {
        result = "❌ Fail. Better luck next time!";
    }

    // 6. 줄바꿈 기호(\n)를 사용하여 최종 성적표를 깔끔하게 경고창으로 출력합니다.
    alert(
        "====== 📊 Grade Report ======\n" +
        "• Total: " + total + "\n" +
        "• Average: " + average.toFixed(1) + "\n" + // toFixed(1)은 소수점 첫째 자리까지만 출력하는 팁입니다.
        "---------------------------\n" +
        "• Result: " + result
    );
}