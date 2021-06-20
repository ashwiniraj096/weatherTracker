const key = 'HAgeCo8aL6RdylA6BG3PrLhCcSqY11wW';
const cityform = document.querySelector('.change-location');
const weatherDetails = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img')


const getKey = async (data) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const params = `?apikey=${key}&q=${data}`
    const response = await fetch(base + params);
    const resultdata = await response.json();
    return resultdata[0];

}

const getWeather = async (data) => {
    const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${data}?apikey=${key}`);
    // console.log('getweather', data, 'res', await response.json())
    return await response.json();
}

const getCityDetails = async (value) => {
    const cityDetails = await getKey(value);
    const weatherInfo = await getWeather(cityDetails.Key);
    return { cityDetails, weatherInfo }
}

const updateUIWeather = data => {
    const { cityDetails, weatherInfo } = data;
    const html = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
          <div class="my-3">${weatherInfo[0].WeatherText}</div>
          <div class="my-3">
            <span>${weatherInfo[0].Temperature.Metric.Value}</span>
            <span>&deg; C</span>
    `;
    weatherDetails.innerHTML = html;

    const iconSrc = `img/icons/${weatherInfo[0].WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    const imgSrc = weatherInfo[0].IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', imgSrc);

    //if d-none present remove
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

cityform.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = cityform.city.value.trim();
    cityform.reset();
    getCityDetails(value).then(data => updateUIWeather(data)).catch(err => console.log(err));
});

//getKey('RAMANAGAR').then(data => getWeather(data.Key)).then(data => console.log(data)).catch(err => console.log(err));
