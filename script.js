const containerE1=document.querySelector(".container");
const searchE1=document.querySelector(".search-box button");
const weatherBoxE1=document.querySelector(".weather-box");
const weatherDetailsE1=document.querySelector(".weather-details");
const error404E1=document.querySelector(".not-found");
const cityhideE1=document.querySelector(".city-hide");
console.log(containerE1);
console.log(cityhideE1);

searchE1.addEventListener('click',()=>{
    const API_KEY='74c59fcaf12435e36687ce2dd389d60c';
    const city=document.querySelector(".search-box input").value;

    if(city=='')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json()).then(json=>{

        if(json.cod==404)
        {
            cityhideE1.textContent=city
            
            console.log("city not found");
            containerE1.style.height = '400px';
           weatherBoxE1.classList.remove('active');
           weatherDetailsE1.classList.remove('active');
           error404E1.classList.add('active');
           return;
        }
        
           
        console.log(json);

        const image=document.querySelector('.cloud-img');
        const temperature=document.querySelector('.weather-box .temperature');
        const description=document.querySelector('.weather-box .description');
        const humidity=document.querySelector('.weather-details .humidity span');
        const wind=document.querySelector('.weather-details .wind span');
        
        // console.log('elements',temperature,description,humidity,wind);

        if(cityhideE1.textContent==city){
            return;
        }
        else{
            cityhideE1.textContent=city;
        
            
            containerE1.style.height='555px';
           weatherBoxE1.classList.add('active');
           containerE1.classList.add('active');
           weatherDetailsE1.classList.add('active');
           cityhideE1.classList.add('active');
           error404E1.classList.remove('active');
           
           setTimeout(()=>{
                containerE1.classList.remove('active');
               },100);
           switch (json.weather[0].main) {
            case 'Clear':
                    image.src='clear.png';
                    break;
            case 'Rain':
                    image.src='rain.png';
                    break;
            case 'Snow':
                    image.src='snow.png';
                    break;
            case 'Clouds':
                 image.src='clouds.png';
                    break;
            case 'Mist':
                    image.src='mist.png';
                    break;
            case 'Haze':
                    image.src='haze.png';
                    break; 
            case 'Thunderstorm':
                    image.src ='thunderstorm.png';
                    break;       
        
            default:
                image.src='cloud.png';
           }
        
            temperature.innerHTML = `${parseInt(json.main.temp)} <span>&deg;C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        
        }
    });
});