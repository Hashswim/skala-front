document.addEventListener('DOMContentLoaded', function () {
    //ID로 title 요소 가져오기
    var title = document.querySelector('#wave-title');
    if (!title) return;

    //from method: String을 한글자 씩 분리해서 Array에 저장
    // == list("{String value}")
    var characters = Array.from(title.textContent);
    title.textContent = '';

    characters.forEach(function (char, index) {
        var span = document.createElement('span');
        span.className = 'wave-letter'; // CSS에서 정의한 wave-letter 클래스
        span.textContent = char === ' ' ? ' ' : char; // 공백 문자는 HTML에서 &nbsp;로 처리
        span.style.animationDelay = (index * 0.08) + 's'; //0.08s 씩 글자마다 순서대로 지연실행
        title.appendChild(span);
    });
});
