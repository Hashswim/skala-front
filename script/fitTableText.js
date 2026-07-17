// 고정 크기 셀 안에 내용이 넘치면 글자 크기를 줄여서 맞추는 스크립트 (myClass.html 전용)

function shrinkToFit(el, minSize) {
    let fontSize = parseFloat(getComputedStyle(el).fontSize);
    // scrollHeight(실제 내용 높이)가 clientHeight(고정된 셀 높이)보다 크면 아직 넘친다는 뜻.
    // 넘치지 않을 때까지 1px씩 줄여나가는 단순한 방식(최소 크기 아래로는 더 줄이지 않음).
    while (el.scrollHeight > el.clientHeight && fontSize > minSize) {
        fontSize -= 1;
        el.style.fontSize = fontSize + 'px';
    }
    return fontSize;
}

document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');
    if (!table) return;

    const MIN_FONT_SIZE = 9;

    // 1. 속성(축)을 나타내는 th들은 셀마다 제각각 줄어들지 않고 모두 같은 크기를 쓰도록,
    //    가장 작게 줄여야 하는 th 기준으로 크기를 통일한다. (모서리 셀은 별도 표기라 제외)
    const axisHeaders = Array.from(table.querySelectorAll('th')).filter(
        (th) => !th.classList.contains('corner-cell')
    );

    let uniformFontSize = Infinity;
    axisHeaders.forEach((th) => {
        const fitted = shrinkToFit(th, MIN_FONT_SIZE);
        uniformFontSize = Math.min(uniformFontSize, fitted);
        th.style.fontSize = ''; // 다시 재기 전에 원래대로 되돌림
    });
    axisHeaders.forEach((th) => {
        th.style.fontSize = uniformFontSize + 'px';
    });

    // 2. 실제 수업 내용이 담긴 td는 각 셀 내용량에 맞게 개별적으로 줄인다.
    const dataCells = table.querySelectorAll('tbody td');
    dataCells.forEach((td) => shrinkToFit(td, MIN_FONT_SIZE));
});
