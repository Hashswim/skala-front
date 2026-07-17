// signUp.html의 form은 method="get"이라, 제출하면 입력했던 값들이 이 페이지 URL에
// ?userId=...&userNickname=... 형태의 쿼리스트링으로 그대로 넘어온다.
// URLSearchParams로 그 값을 읽어서, 방문자가 실제로 입력한 내용으로 환영 문구와 요약을 채운다.
const params = new URLSearchParams(window.location.search);

const userId = params.get('userId');
const userNickname = params.get('userNickname');
const userName = params.get('userName');
const userPhone = params.get('userPhone');
const userEmail = params.get('userEmail');
const emailDomain = params.get('emailDomain');
const userBirth = params.get('userBirth');
const gender = params.get('gender');
const interests = params.getAll('interest');
const joinPath = params.get('joinPath');
const intro = params.get('intro');

// select의 value(코드값)를 화면에 보여줄 사람이 읽기 좋은 문구로 바꿔주는 매핑 테이블
const interestLabels = {
    frontend: 'Web Frontend (Vue.js/HTML)',
    uiux: 'UI/UX Design Standards',
    backend: 'Backend & Database',
    devops: 'Cloud & Infrastructure'
};

const joinPathLabels = {
    friend: 'Friend',
    online: 'Online Advertisement',
    socialMedia: 'Social Media',
    etc: 'Other'
};

const genderLabels = {
    male: 'Male',
    female: 'Female',
    none: 'Prefer not to say'
};

const welcomeHeading = document.getElementById('welcome-heading');
const welcomeMessage = document.getElementById('welcome-message');
const summaryList = document.getElementById('summary-list');

// 회원가입 폼을 거치지 않고 이 페이지로 직접 들어온 경우(닉네임 값이 없음)를 구분해서 처리
if (userNickname) {
    welcomeHeading.textContent = `🎉 Welcome, ${userNickname}!`;
    welcomeMessage.textContent = `We're excited to have you join SKALA-FRONT, ${userName || userNickname}!`;

    // "직접 입력"이 아닐 때만 아이디@도메인 형태로 합쳐서 보여줌
    const email = userEmail
        ? (emailDomain && emailDomain !== 'direct' ? `${userEmail}@${emailDomain}` : userEmail)
        : null;

    // [라벨, 값] 쌍의 목록. 값이 없는 항목(선택 입력이라 비워뒀던 항목)은 아래에서 걸러냄
    const summaryItems = [
        ['🆔 ID', userId],
        ['📛 Name', userName],
        ['📞 Phone', userPhone],
        ['📧 E-mail', email],
        ['🎂 Birthdate', userBirth],
        ['⚧ Gender', genderLabels[gender] || gender],
        ['💡 Interests', interests.map((value) => interestLabels[value] || value).join(', ')],
        ['🚪 Sign-up Source', joinPathLabels[joinPath] || joinPath],
        ['📝 Introduction', intro]
    ];

    summaryItems.forEach(([label, value]) => {
        if (!value) return;

        const dt = document.createElement('dt');
        dt.textContent = label;

        const dd = document.createElement('dd');
        dd.textContent = value; // textContent만 사용해서 입력값이 그대로 HTML로 해석되는 것을 방지 (XSS 방지)

        summaryList.appendChild(dt);
        summaryList.appendChild(dd);
    });
} else {
    // 쿼리스트링이 없으면 요약 목록 자체를 지워서 빈 박스가 보이지 않게 함
    summaryList.remove();
}
