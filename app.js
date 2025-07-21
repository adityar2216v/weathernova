// WeatherNova - Modern, Animated JS
// --- Config ---
const API_KEY = 'cfe2a41a592f5be4d97a1e50fcf64899'; // <-- Replace with your OpenWeatherMap API key

// --- DOM Elements ---
const bg = document.getElementById('background-animated');
const themeSwitcher = document.getElementById('theme-switcher');
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const geoBtn = document.getElementById('geo-btn');
const autocompleteList = document.getElementById('autocomplete-list');
const weatherCard = document.getElementById('weather-card');
const weatherIcon = document.getElementById('weather-icon');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-desc');
const weatherHumidity = document.getElementById('weather-humidity');
const weatherWind = document.getElementById('weather-wind');
const weatherLocation = document.getElementById('weather-location');
const notification = document.getElementById('notification');
const notificationMsg = document.getElementById('notification-message');
const notificationClose = document.getElementById('notification-close');
const forecastList = document.getElementById('forecast-list');
const hourlyForecast = document.getElementById('hourly-forecast');
const favoritesList = document.getElementById('favorites-list');
const addFavInput = document.getElementById('add-fav-input');
const addFavBtn = document.getElementById('add-fav-btn');

// --- Live Animated Background System ---
class LiveBackground {
  constructor() {
    this.currentAnimation = null;
    this.particles = [];
    this.maxParticles = 50;
    this.skyCycleInterval = null;
    this.init();
  }

  init() {
    this.createBaseBackground();
    this.startParticleSystem();
    this.startSkyCycle();
  }

  createBaseBackground() {
    const svg = `
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="skyGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#4682B4;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#191970;stop-opacity:0.6" />
          </radialGradient>
          <radialGradient id="nightGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#16213e;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#0f3460;stop-opacity:0.8" />
          </radialGradient>
          <radialGradient id="sunsetGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#ff7e5f;stop-opacity:1" />
            <stop offset="30%" style="stop-color:#feb47b;stop-opacity:0.9" />
            <stop offset="70%" style="stop-color:#ff6b6b;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#4a90e2;stop-opacity:0.6" />
          </radialGradient>
        </defs>
        <rect id="sky-rect" width="100%" height="100%" fill="url(#skyGradient)"/>
        <g id="parallax-clouds"></g>
        <g id="particles"></g>
        <g id="weather-elements"></g>
      </svg>
    `;
    bg.innerHTML = svg;
    this.createParallaxClouds();
  }

  // --- Day/Night Sky Color Cycle ---
  startSkyCycle() {
    if (this.skyCycleInterval) clearInterval(this.skyCycleInterval);
    const skyRect = bg.querySelector('#sky-rect');
    let t = 0;
    this.skyCycleInterval = setInterval(() => {
      t += 0.01;
      // Simulate a 24-hour cycle in 2 minutes
      const hour = (t * 24) % 24;
      let fill;
      if (hour < 6 || hour > 20) fill = 'url(#nightGradient)';
      else if (hour < 8) fill = 'url(#sunsetGradient)';
      else if (hour < 18) fill = 'url(#skyGradient)';
      else fill = 'url(#sunsetGradient)';
      skyRect.setAttribute('fill', fill);
    }, 1000);
  }

  // --- Parallax Multi-Layer Clouds ---
  createParallaxClouds() {
    const clouds = bg.querySelector('#parallax-clouds');
    clouds.innerHTML = '';
    // 3 layers: far, mid, near
    for (let layer = 0; layer < 3; layer++) {
      for (let i = 0; i < 3; i++) {
        const cloud = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        const baseY = 15 + layer * 8 + Math.random() * 5;
        const baseX = 10 + i * 30 + Math.random() * 10;
        cloud.setAttribute('cx', baseX);
        cloud.setAttribute('cy', baseY);
        cloud.setAttribute('rx', 10 + layer * 3 + Math.random() * 3);
        cloud.setAttribute('ry', 5 + layer * 2 + Math.random() * 2);
        cloud.setAttribute('fill', `rgba(255,255,255,${0.18 + 0.12 * (2-layer)})`);
        cloud.setAttribute('opacity', 0.7 - layer * 0.15);
        // Animate clouds horizontally for parallax
        const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        anim.setAttribute('attributeName', 'cx');
        anim.setAttribute('values', `${baseX};${baseX + 20 - layer * 8};${baseX}`);
        anim.setAttribute('dur', `${18 - layer * 4 + Math.random() * 3}s`);
        anim.setAttribute('repeatCount', 'indefinite');
        cloud.appendChild(anim);
        clouds.appendChild(cloud);
      }
    }
  }

  startParticleSystem() {
    this.createParticles();
    this.animateParticles();
  }

  createParticles() {
    const particlesContainer = bg.querySelector('#particles');
    for (let i = 0; i < this.maxParticles; i++) {
      const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      particle.setAttribute('r', Math.random() * 0.3 + 0.1);
      particle.setAttribute('cx', Math.random() * 100);
      particle.setAttribute('cy', Math.random() * 100);
      particle.setAttribute('fill', 'rgba(255, 255, 255, 0.6)');
      
      const animateX = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animateX.setAttribute('attributeName', 'cx');
      animateX.setAttribute('values', `${Math.random() * 100};${Math.random() * 100}`);
      animateX.setAttribute('dur', `${Math.random() * 20 + 10}s`);
      animateX.setAttribute('repeatCount', 'indefinite');
      
      const animateY = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animateY.setAttribute('attributeName', 'cy');
      animateY.setAttribute('values', `${Math.random() * 100};${Math.random() * 100}`);
      animateY.setAttribute('dur', `${Math.random() * 15 + 8}s`);
      animateY.setAttribute('repeatCount', 'indefinite');
      
      particle.appendChild(animateX);
      particle.appendChild(animateY);
      particlesContainer.appendChild(particle);
    }
  }

  animateParticles() {
    const particles = bg.querySelectorAll('#particles circle');
    particles.forEach((particle, index) => {
      setTimeout(() => {
        particle.style.opacity = '0.8';
        particle.style.filter = 'blur(0.5px)';
      }, index * 100);
    });
  }

  setWeatherBackground(weatherType, isNight = false) {
    const weatherElements = bg.querySelector('#weather-elements');
    weatherElements.innerHTML = '';
    // Remove parallax clouds for clear night
    this.createParallaxClouds();
    switch (weatherType) {
      case 'clear':
        this.createSunOrMoon(isNight);
        break;
      case 'clouds':
        this.createClouds(isNight, true);
        break;
      case 'rain':
        this.createRain(isNight);
        break;
      case 'thunderstorm':
        this.createThunderstorm(isNight);
        break;
      case 'snow':
        this.createSnow(isNight);
        break;
      case 'mist':
        this.createMist(isNight);
        break;
      default:
        this.createDefaultBackground();
    }
  }

  // --- Realistic Sun/Moon with Glow & Rays ---
  createSunOrMoon(isNight) {
    const weatherElements = bg.querySelector('#weather-elements');
    if (isNight) {
      weatherElements.innerHTML = `
        <g>
          <circle cx="80" cy="20" r="8" fill="#f6e58d" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="85" cy="20" r="8" fill="#2d3748"/>
          <radialGradient id="moonGlow" cx="80" cy="20" r="16" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#fffbe6" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#f6e58d" stop-opacity="0"/>
          </radialGradient>
          <circle cx="80" cy="20" r="16" fill="url(#moonGlow)" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="4s" repeatCount="indefinite"/>
          </circle>
          <g id="stars"></g>
        </g>
      `;
      this.createStars();
    } else {
      weatherElements.innerHTML = `
        <g>
          <circle cx="80" cy="20" r="12" fill="#ffe066">
            <animate attributeName="r" values="12;14;12" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="80" cy="20" r="20" fill="none" stroke="#ffe066" stroke-width="0.5" opacity="0.2">
            <animate attributeName="r" values="20;25;20" dur="6s" repeatCount="indefinite"/>
          </circle>
          <g id="sun-rays"></g>
        </g>
      `;
      this.createSunRays();
    }
  }
  createSunRays() {
    const rays = bg.querySelector('#sun-rays');
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30);
      const ray = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      ray.setAttribute('x', 80);
      ray.setAttribute('y', 2);
      ray.setAttribute('width', 0.7);
      ray.setAttribute('height', 8);
      ray.setAttribute('fill', '#ffe066');
      ray.setAttribute('opacity', '0.5');
      ray.setAttribute('transform', `rotate(${angle} 80 20)`);
      const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      anim.setAttribute('attributeName', 'opacity');
      anim.setAttribute('values', '0.5;1;0.5');
      anim.setAttribute('dur', `${2 + Math.random() * 2}s`);
      anim.setAttribute('repeatCount', 'indefinite');
      ray.appendChild(anim);
      rays.appendChild(ray);
    }
  }

  // --- Enhanced Clouds (with parallax) ---
  createClouds(isNight, parallax = false) {
    const weatherElements = bg.querySelector('#weather-elements');
    const cloudColor = isNight ? '#4a5568' : '#ffffff';
    // Add extra clouds for realism
    let clouds = '';
    for (let i = 0; i < 5; i++) {
      const cx = 20 + i * 15 + Math.random() * 10;
      const cy = 25 + Math.random() * 10;
      const rx = 8 + Math.random() * 4;
      const ry = 4 + Math.random() * 2;
      clouds += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${cloudColor}" opacity="${0.5 + Math.random() * 0.3}">
        <animate attributeName="cx" values="${cx};${cx + 8};${cx}" dur="${8 + Math.random() * 4}s" repeatCount="indefinite"/>
      </ellipse>`;
    }
    weatherElements.innerHTML = clouds;
  }

  // --- Advanced Rain (wind, splash) ---
  createRain(isNight = false) {
    const weatherElements = bg.querySelector('#weather-elements');
    weatherElements.innerHTML = `
      <g id="rain-clouds"></g>
      <g id="raindrops"></g>
      <g id="splashes"></g>
    `;
    this.createClouds(isNight, true);
    this.createRaindrops();
    this.createRainSplashes();
  }
  createRaindrops() {
    const raindrops = bg.querySelector('#raindrops');
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 60 + 20;
      const angle = -10 + Math.random() * 20;
      const raindrop = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      raindrop.setAttribute('x', x);
      raindrop.setAttribute('y', y);
      raindrop.setAttribute('width', 0.5);
      raindrop.setAttribute('height', 6 + Math.random() * 3);
      raindrop.setAttribute('fill', '#60a5fa');
      raindrop.setAttribute('opacity', '0.7');
      raindrop.setAttribute('transform', `rotate(${angle} ${x} ${y})`);
      const fall = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      fall.setAttribute('attributeName', 'y');
      fall.setAttribute('values', `${y};${y + 30}`);
      fall.setAttribute('dur', `${0.8 + Math.random() * 0.7}s`);
      fall.setAttribute('repeatCount', 'indefinite');
      raindrop.appendChild(fall);
      raindrops.appendChild(raindrop);
    }
  }
  createRainSplashes() {
    const splashes = bg.querySelector('#splashes');
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 100;
      const splash = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      splash.setAttribute('cx', x);
      splash.setAttribute('cy', 95);
      splash.setAttribute('rx', 0.5);
      splash.setAttribute('ry', 0.2);
      splash.setAttribute('fill', '#60a5fa');
      splash.setAttribute('opacity', '0.5');
      const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      anim.setAttribute('attributeName', 'rx');
      anim.setAttribute('values', '0.5;2;0.5');
      anim.setAttribute('dur', `${0.7 + Math.random() * 0.5}s`);
      anim.setAttribute('repeatCount', 'indefinite');
      splash.appendChild(anim);
      splashes.appendChild(splash);
    }
  }

  // --- Advanced Thunderstorm (screen flash, dynamic lightning) ---
  createThunderstorm(isNight = false) {
    const weatherElements = bg.querySelector('#weather-elements');
    weatherElements.innerHTML = `
      <g id="storm-clouds"></g>
      <g id="lightning"></g>
      <g id="thunder-rain"></g>
    `;
    this.createClouds(isNight, true);
    this.createThunderRain();
    this.createLightning();
    this.screenFlash();
  }
  createLightning() {
    const lightning = bg.querySelector('#lightning');
    for (let i = 0; i < 2; i++) {
      const bolt = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      const x = 40 + Math.random() * 20;
      const points = `${x},20 ${x-5},40 ${x+5},45 ${x},65`;
      bolt.setAttribute('points', points);
      bolt.setAttribute('fill', 'none');
      bolt.setAttribute('stroke', '#facc15');
      bolt.setAttribute('stroke-width', '2');
      bolt.setAttribute('opacity', '0');
      const flash = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      flash.setAttribute('attributeName', 'opacity');
      flash.setAttribute('values', '0;1;0');
      flash.setAttribute('dur', `${0.3 + Math.random() * 0.5}s`);
      flash.setAttribute('repeatCount', 'indefinite');
      flash.setAttribute('begin', `${Math.random() * 2}s`);
      bolt.appendChild(flash);
      lightning.appendChild(bolt);
    }
  }
  screenFlash() {
    // Simulate a screen flash by overlaying a white rect
    let flash = document.getElementById('screen-flash');
    if (!flash) {
      flash = document.createElement('div');
      flash.id = 'screen-flash';
      flash.style.position = 'fixed';
      flash.style.top = '0';
      flash.style.left = '0';
      flash.style.width = '100vw';
      flash.style.height = '100vh';
      flash.style.background = 'white';
      flash.style.opacity = '0';
      flash.style.pointerEvents = 'none';
      flash.style.zIndex = '9999';
      document.body.appendChild(flash);
    }
    setInterval(() => {
      flash.style.transition = 'none';
      flash.style.opacity = '0.5';
      setTimeout(() => {
        flash.style.transition = 'opacity 0.5s';
        flash.style.opacity = '0';
      }, 80 + Math.random() * 120);
    }, 4000 + Math.random() * 4000);
  }
  createThunderRain() {
    const thunderRain = bg.querySelector('#thunder-rain');
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 60 + 20;
      const angle = -10 + Math.random() * 20;
      const raindrop = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      raindrop.setAttribute('x', x);
      raindrop.setAttribute('y', y);
      raindrop.setAttribute('width', 0.5);
      raindrop.setAttribute('height', 6 + Math.random() * 3);
      raindrop.setAttribute('fill', '#4a5568');
      raindrop.setAttribute('opacity', '0.8');
      raindrop.setAttribute('transform', `rotate(${angle} ${x} ${y})`);
      const fall = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      fall.setAttribute('attributeName', 'y');
      fall.setAttribute('values', `${y};${y + 30}`);
      fall.setAttribute('dur', `${0.7 + Math.random() * 0.6}s`);
      fall.setAttribute('repeatCount', 'indefinite');
      raindrop.appendChild(fall);
      thunderRain.appendChild(raindrop);
    }
  }

  // --- Advanced Snow (rotation, drift) ---
  createSnow(isNight = false) {
    const weatherElements = bg.querySelector('#weather-elements');
    weatherElements.innerHTML = `
      <g id="snow-clouds"></g>
      <g id="snowflakes"></g>
    `;
    this.createClouds(isNight, true);
    this.createSnowflakes();
  }
  createSnowflakes() {
    const snowflakes = bg.querySelector('#snowflakes');
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 60 + 10;
      const snowflake = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      snowflake.setAttribute('x', x);
      snowflake.setAttribute('y', y);
      snowflake.setAttribute('font-size', `${0.8 + Math.random() * 1.2}`);
      snowflake.setAttribute('fill', '#ffffff');
      snowflake.setAttribute('opacity', '0.8');
      snowflake.textContent = '❄';
      // Animate fall
      const fall = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      fall.setAttribute('attributeName', 'y');
      fall.setAttribute('values', `${y};${y + 40}`);
      fall.setAttribute('dur', `${6 + Math.random() * 5}s`);
      fall.setAttribute('repeatCount', 'indefinite');
      // Animate drift
      const sway = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      sway.setAttribute('attributeName', 'x');
      sway.setAttribute('values', `${x};${x + 8};${x}`);
      sway.setAttribute('dur', `${4 + Math.random() * 3}s`);
      sway.setAttribute('repeatCount', 'indefinite');
      // Animate rotation
      const rotate = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
      rotate.setAttribute('attributeName', 'transform');
      rotate.setAttribute('type', 'rotate');
      rotate.setAttribute('from', `0 ${x} ${y}`);
      rotate.setAttribute('to', `360 ${x} ${y}`);
      rotate.setAttribute('dur', `${5 + Math.random() * 3}s`);
      rotate.setAttribute('repeatCount', 'indefinite');
      snowflake.appendChild(fall);
      snowflake.appendChild(sway);
      snowflake.appendChild(rotate);
      snowflakes.appendChild(snowflake);
    }
  }

  // --- Advanced Mist/Fog (wind-driven layers) ---
  createMist(isNight = false) {
    const weatherElements = bg.querySelector('#weather-elements');
    weatherElements.innerHTML = `<g id="mist-layers"></g>`;
    this.createMistLayers();
  }
  createMistLayers() {
    const mistLayers = bg.querySelector('#mist-layers');
    for (let i = 0; i < 6; i++) {
      const y = 60 + i * 4 + Math.random() * 3;
      const mist = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      mist.setAttribute('x', Math.random() * 100);
      mist.setAttribute('y', y);
      mist.setAttribute('width', 30 + Math.random() * 30);
      mist.setAttribute('height', 2 + Math.random() * 2);
      mist.setAttribute('fill', '#a3a3a3');
      mist.setAttribute('opacity', `${0.12 + Math.random() * 0.18}`);
      // Animate drift
      const drift = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      drift.setAttribute('attributeName', 'x');
      drift.setAttribute('values', `-40;120;-40`);
      drift.setAttribute('dur', `${18 + Math.random() * 8}s`);
      drift.setAttribute('repeatCount', 'indefinite');
      mist.appendChild(drift);
      mistLayers.appendChild(mist);
    }
  }

  createDefaultBackground() {
    const weatherElements = bg.querySelector('#weather-elements');
    weatherElements.innerHTML = `
      <circle cx="80" cy="20" r="10" fill="#ffe066" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.6;0.8" dur="4s" repeatCount="indefinite"/>
      </circle>
    `;
  }
}

// Initialize live background
const liveBackground = new LiveBackground();

// --- Theme Switcher ---
const themes = ['light', 'dark', 'glass'];
function applyTheme(theme) {
  document.body.classList.remove('light-theme', 'dark-theme', 'glass-theme');
  if (theme === 'light') document.body.classList.add('light-theme');
  else if (theme === 'dark') document.body.classList.add('dark-theme');
  else if (theme === 'glass') document.body.classList.add('glass-theme');
  localStorage.setItem('weathernova_theme', theme);
}
function getTheme() {
  return localStorage.getItem('weathernova_theme') || 'glass';
}
themeSwitcher.addEventListener('click', () => {
  let current = getTheme();
  let idx = themes.indexOf(current);
  let next = themes[(idx + 1) % themes.length];
  applyTheme(next);
  themeSwitcher.textContent = next === 'dark' ? '🌑' : next === 'light' ? '🌞' : '🌓';
});
applyTheme(getTheme());
themeSwitcher.textContent = getTheme() === 'dark' ? '🌑' : getTheme() === 'light' ? '🌞' : '🌓';

// --- City Autocomplete (demo dataset) ---
const cityDataset = [
  'London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Berlin', 'Moscow', 'Beijing', 'Delhi', 'Cairo',
  'Los Angeles', 'Chicago', 'Toronto', 'Madrid', 'Rome', 'Bangkok', 'Dubai', 'Istanbul', 'Seoul', 'Mexico City',
  'Mumbai', 'Sao Paulo', 'Buenos Aires', 'Cape Town', 'Singapore', 'Hong Kong', 'San Francisco', 'Boston', 'Miami', 'Jakarta'
];
let autocompleteActive = -1;
cityInput.addEventListener('input', function() {
  const val = this.value.trim().toLowerCase();
  autocompleteList.innerHTML = '';
  if (!val) {
    autocompleteList.classList.add('hidden');
    return;
  }
  const matches = cityDataset.filter(city => city.toLowerCase().startsWith(val)).slice(0, 8);
  if (matches.length === 0) {
    autocompleteList.classList.add('hidden');
    return;
  }
  matches.forEach((city, idx) => {
    const li = document.createElement('li');
    li.textContent = city;
    li.className = '';
    li.onclick = () => {
      cityInput.value = city;
      autocompleteList.classList.add('hidden');
      fetchWeather(city);
    };
    autocompleteList.appendChild(li);
  });
  autocompleteList.classList.remove('hidden');
  autocompleteActive = -1;
});
cityInput.addEventListener('keydown', function(e) {
  const items = autocompleteList.querySelectorAll('li');
  if (autocompleteList.classList.contains('hidden') || items.length === 0) return;
  if (e.key === 'ArrowDown') {
    autocompleteActive = (autocompleteActive + 1) % items.length;
    items.forEach((li, idx) => li.classList.toggle('bg-indigo-200', idx === autocompleteActive));
    e.preventDefault();
  } else if (e.key === 'ArrowUp') {
    autocompleteActive = (autocompleteActive - 1 + items.length) % items.length;
    items.forEach((li, idx) => li.classList.toggle('bg-indigo-200', idx === autocompleteActive));
    e.preventDefault();
  } else if (e.key === 'Enter') {
    if (autocompleteActive >= 0 && autocompleteActive < items.length) {
      items[autocompleteActive].click();
      e.preventDefault();
    }
  }
});
document.addEventListener('click', e => {
  if (!autocompleteList.contains(e.target) && e.target !== cityInput) {
    autocompleteList.classList.add('hidden');
  }
});

// --- Geolocation ---
geoBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    showNotification('Geolocation not supported.');
    return;
  }
  showNotification('Getting your location...');
  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Location not found');
      const data = await res.json();
      cityInput.value = data.name;
      fetchWeather(data.name);
    } catch (err) {
      showNotification('Could not get weather for your location.');
    }
  }, err => {
    showNotification('Location access denied.');
  });
});

// --- Favorites Management ---
function getFavorites() {
  return JSON.parse(localStorage.getItem('weathernova_favorites') || '[]');
}
function setFavorites(favs) {
  localStorage.setItem('weathernova_favorites', JSON.stringify(favs));
}
function renderFavorites() {
  const favs = getFavorites();
  favoritesList.innerHTML = '';
  favs.forEach(city => {
    const btn = document.createElement('button');
    btn.textContent = city;
    btn.className = 'fav-btn';
    btn.onclick = () => fetchWeather(city);
    const removeBtn = document.createElement('span');
    removeBtn.textContent = '✖';
    removeBtn.className = 'remove';
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      removeFavorite(city);
    };
    btn.appendChild(removeBtn);
    favoritesList.appendChild(btn);
  });
}
function addFavorite(city) {
  let favs = getFavorites();
  city = city.trim();
  if (!city || favs.includes(city)) return;
  favs.push(city);
  setFavorites(favs);
  renderFavorites();
  showNotification(`Added ${city} to favorites!`);
}
function removeFavorite(city) {
  let favs = getFavorites();
  favs = favs.filter(c => c !== city);
  setFavorites(favs);
  renderFavorites();
  showNotification(`Removed ${city} from favorites.`);
}
addFavBtn.addEventListener('click', () => {
  const city = addFavInput.value.trim();
  if (city) {
    addFavorite(city);
    addFavInput.value = '';
  }
});
addFavInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const city = addFavInput.value.trim();
    if (city) {
      addFavorite(city);
      addFavInput.value = '';
    }
  }
});
renderFavorites();

// --- Notification Toasts ---
function showNotification(msg, type = 'info', dismissible = true) {
  notification.className = `notification notification-${type}`;
  notificationMsg.textContent = msg;
  notification.classList.remove('opacity-0');
  notification.classList.add('opacity-100');
  if (dismissible) {
    notificationClose.style.display = '';
    notificationClose.onclick = function() {
      notification.classList.add('opacity-0');
    };
  } else {
    notificationClose.style.display = 'none';
  }
  setTimeout(() => {
    notification.classList.add('opacity-0');
    notification.classList.remove('opacity-100');
  }, 4000);
}

// --- Animated SVG Weather Icons ---
function getWeatherSVG(type, isNight) {
  if (isNight) {
    return `<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="40" cy="24" r="18" fill="#f6e58d" opacity="0.8"/><circle cx="48" cy="24" r="18" fill="#2d3748"/><animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="12s" repeatCount="indefinite"/></svg>`;
  }
  switch (type) {
    case 'clear':
      return `<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="18" fill="#ffe066"><animate attributeName="r" values="18;22;18" dur="2s" repeatCount="indefinite"/></circle></svg>`;
    case 'clouds':
      return `<svg width="64" height="64" viewBox="0 0 64 64"><ellipse cx="32" cy="40" rx="20" ry="12" fill="#fff" opacity="0.7"><animate attributeName="cx" values="32;36;32" dur="3s" repeatCount="indefinite"/></ellipse></svg>`;
    case 'rain':
      return `<svg width="64" height="64" viewBox="0 0 64 64"><ellipse cx="32" cy="40" rx="20" ry="12" fill="#fff" opacity="0.7"/><line x1="24" y1="52" x2="24" y2="60" stroke="#60a5fa" stroke-width="3"><animate attributeName="y1" values="52;60;52" dur="1s" repeatCount="indefinite"/><animate attributeName="y2" values="60;68;60" dur="1s" repeatCount="indefinite"/></line><line x1="32" y1="54" x2="32" y2="62" stroke="#60a5fa" stroke-width="3"><animate attributeName="y1" values="54;62;54" dur="1.2s" repeatCount="indefinite"/><animate attributeName="y2" values="62;70;62" dur="1.2s" repeatCount="indefinite"/></line><line x1="40" y1="52" x2="40" y2="60" stroke="#60a5fa" stroke-width="3"><animate attributeName="y1" values="52;60;52" dur="0.8s" repeatCount="indefinite"/><animate attributeName="y2" values="60;68;60" dur="0.8s" repeatCount="indefinite"/></line></svg>`;
    case 'thunderstorm':
      return `<svg width="64" height="64" viewBox="0 0 64 64"><ellipse cx="32" cy="40" rx="20" ry="12" fill="#fff" opacity="0.7"/><polyline points="28,48 36,48 32,60" fill="none" stroke="#facc15" stroke-width="4"><animate attributeName="points" values="28,48 36,48 32,60;32,52 40,52 36,64;28,48 36,48 32,60" dur="1.2s" repeatCount="indefinite"/></polyline></svg>`;
    case 'snow':
      return `<svg width="64" height="64" viewBox="0 0 64 64"><ellipse cx="32" cy="40" rx="20" ry="12" fill="#fff" opacity="0.7"/><text x="32" y="58" text-anchor="middle" font-size="24" fill="#bae6fd">❄️</text></svg>`;
    case 'mist':
      return `<svg width="64" height="64" viewBox="0 0 64 64"><ellipse cx="32" cy="40" rx="20" ry="12" fill="#fff" opacity="0.7"/><rect x="16" y="54" width="32" height="4" fill="#a3a3a3" opacity="0.5"><animate attributeName="x" values="16;20;16" dur="2s" repeatCount="indefinite"/></rect></svg>`;
    default:
      return '';
  }
}
function setWeatherIcon(type, isNight, fallbackEmoji) {
  if (weatherIcon) {
    const svg = getWeatherSVG(type, isNight);
    if (svg) {
      weatherIcon.innerHTML = svg;
      weatherIcon.setAttribute('aria-label', type + ' icon');
    } else {
      weatherIcon.textContent = fallbackEmoji;
    }
  }
}

// --- Weather Fetching & UI ---
function getWeatherType(desc) {
  desc = desc.toLowerCase();
  if (desc.includes('clear')) return 'clear';
  if (desc.includes('cloud')) return 'clouds';
  if (desc.includes('rain')) return 'rain';
  if (desc.includes('thunder')) return 'thunderstorm';
  if (desc.includes('snow')) return 'snow';
  if (desc.includes('mist') || desc.includes('fog')) return 'mist';
  return 'default';
}
function getWeatherEmoji(desc, isNight) {
  const emojiMap = {
    'clear': '☀️',
    'clouds': '☁️',
    'rain': '🌧️',
    'thunderstorm': '⛈️',
    'snow': '❄️',
    'mist': '🌫️',
    'default': '🌡️',
    'night': '🌙'
  };
  desc = desc.toLowerCase();
  if (isNight) return emojiMap['night'];
  if (desc.includes('clear')) return emojiMap['clear'];
  if (desc.includes('cloud')) return emojiMap['clouds'];
  if (desc.includes('rain')) return emojiMap['rain'];
  if (desc.includes('thunder')) return emojiMap['thunderstorm'];
  if (desc.includes('snow')) return emojiMap['snow'];
  if (desc.includes('mist') || desc.includes('fog')) return emojiMap['mist'];
  return emojiMap['default'];
}
function showWeatherCard() {
  weatherCard.classList.remove('opacity-0');
  weatherCard.classList.add('opacity-100');
}
function hideWeatherCard() {
  weatherCard.classList.remove('opacity-100');
  weatherCard.classList.add('opacity-0');
}
async function fetchWeather(city) {
  hideWeatherCard();
  showNotification('Fetching weather...');
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    
    // Update live background based on weather
    const isNight = data.dt < data.sys.sunrise || data.dt > data.sys.sunset;
    const type = getWeatherType(data.weather[0].description);
    liveBackground.setWeatherBackground(type, isNight);
    
    // Animated SVG icon
    const emoji = getWeatherEmoji(data.weather[0].description, isNight);
    setWeatherIcon(type, isNight, emoji);
    weatherTemp.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDesc.textContent = data.weather[0].description.replace(/\b\w/g, l => l.toUpperCase());
    weatherHumidity.textContent = data.main.humidity;
    weatherWind.textContent = data.wind.speed;
    weatherLocation.textContent = `${data.name}, ${data.sys.country}`;
    showWeatherCard();
    showNotification(`Weather for ${data.name}, ${data.sys.country}`);
    fetchForecast(city);
  } catch (err) {
    showNotification(err.message || 'Failed to fetch weather');
    hideWeatherCard();
  }
}
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});
cityInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
  }
});

// --- 5-Day Forecast ---
async function fetchForecast(city) {
  forecastList.innerHTML = '';
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Forecast not found');
    const data = await res.json();
    // Group by day
    const days = {};
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
      if (!days[day]) days[day] = [];
      days[day].push(item);
    });
    let count = 0;
    for (const [day, items] of Object.entries(days)) {
      if (count++ >= 5) break;
      // Pick the midday forecast for icon
      const midday = items[Math.floor(items.length / 2)];
      const type = getWeatherType(midday.weather[0].description);
      const emoji = getWeatherEmoji(midday.weather[0].description, false);
      const temp = Math.round(midday.main.temp);
      const desc = midday.weather[0].description.replace(/\b\w/g, l => l.toUpperCase());
      forecastList.innerHTML += `
        <div class="forecast-card">
          <div class="icon" style="font-size:2.5rem;">${emoji}</div>
          <div class="day">${day}</div>
          <div class="temp">${temp}°C</div>
          <div class="desc">${desc}</div>
        </div>
      `;
    }
  } catch (err) {
    forecastList.innerHTML = `<div class="col-span-5 text-center text-red-200">No forecast available.</div>`;
  }
}

// --- Initial State ---
renderFavorites();
// Optionally, load weather for the first favorite or a default city
const favs = getFavorites();
if (favs.length > 0) {
  fetchWeather(favs[0]);
} else {
  fetchWeather('London');
} 