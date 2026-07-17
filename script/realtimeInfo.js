// 1. 방금 만든 weatherAPI.js 모듈에서 핵심 비동기 함수를 쏙 훔쳐옵니다.
import { getLiveWeather } from './weatherAPI.js';

const citySelect = document.querySelector('#city-select');
const weatherBox = document.querySelector('#weather-box');

citySelect.addEventListener('change', async function(event) {

    console.log("Selected option value:", event.target.value); // 디버깅용 로그

    const selectedValue = event.target.value;
    if (selectedValue === "none") {
        weatherBox.innerHTML = "<p>Please select a city.</p>";
        return;
    }

    const coords = selectedValue.split(',');
    const cityName = citySelect.options[citySelect.selectedIndex].text;

    weatherBox.innerHTML = "<p>Receiving live data via module... 📡</p>";

    // 2. 수입해온 비동기 모듈 함수를 실행해 결과만 딱 받아옵니다. (코드가 훨씬 간결해집니다!)
    const weatherInfo = await getLiveWeather(coords[0], coords[1]);

    if (weatherInfo) {
        weatherBox.innerHTML = `
            <div style="background-color: var(--color-secondary-bg); border-left: 5px solid var(--color-accent); padding: 15px; margin-top: 10px;">
                <h4>Modular Weather Feed: ${cityName}</h4>
                <p>🌡️ Temperature: ${weatherInfo.temp}°C</p>
                <p>💧 Humidity: ${weatherInfo.humidity}%</p>
            </div>
        `;
    } else {
        weatherBox.innerHTML = "<p>Failed to load data.</p>";
    }
});

// 3. 브라우저의 위치 정보(Geolocation)를 읽어 Live Info에 사용자의 현재 위치를 표시
const userLocationEl = document.querySelector('#user-location');

async function reverseGeocode(lat, lon) {
    // OpenStreetMap의 무료 Nominatim API로 위도/경도를 지명으로 역변환
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Reverse geocoding failed");

        const data = await response.json();
        const address = data.address || {};
        const city = address.city || address.town || address.village || address.county || "Unknown area";
        const country = address.country;

        return country ? `${city}, ${country}` : city;
    } catch (error) {
        console.error("Reverse geocoding error:", error);
        return null;
    }
}

async function getLocationByIP() {
    // 기기 GPS/Wi-Fi 위치를 못 구할 때 쓰는 대체 수단: IP 주소로는 국가 단위 정확도만 신뢰하고 국가만 조회
    try {
        const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
        if (!response.ok) throw new Error("IP geolocation failed");

        const data = await response.json();
        return data.country || null;
    } catch (error) {
        console.error("IP geolocation error:", error);
        return null;
    }
}

async function showLocationByIP() {
    const placeName = await getLocationByIP();
    userLocationEl.textContent = placeName
        ? `Current location: ${placeName} (IP-based) 📍`
        : "Current location: Unavailable 📍";
}

if (userLocationEl && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        async function (position) {
            const { latitude, longitude } = position.coords;
            const placeName = await reverseGeocode(latitude, longitude);

            userLocationEl.textContent = placeName
                ? `Current location: ${placeName} 📍`
                : `Current location: ${latitude.toFixed(2)}, ${longitude.toFixed(2)} 📍`;
        },
        function (error) {
            // 기기 위치 확인에 실패하면(권한 거부/위치 확인 불가/시간 초과 등) IP 기반 조회로 대체
            console.error("Geolocation error:", error.code, error.message);
            showLocationByIP();
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
    );
} else if (userLocationEl) {
    showLocationByIP();
}