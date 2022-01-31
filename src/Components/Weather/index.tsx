import React, {useState} from 'react';
import axios from "axios";
import {dayRender} from "../../utils/day";
import City from '../../utils/city.list.json'
import './style.sass'
import LogoWeather from './img/Cloudy.svg'
import Rain from './img/rain.svg'
import Cloud from './img/cloud.svg'
import Snow from './img/snow.svg'
import Storm from './img/storm.svg'
import Drizzle from './img/drizzle.svg'
import Sunny from './img/sunny.svg'
import Atmosphere from './img/atmosphere.svg'

const Weather = () => {
    let apiKey = '568253eb95c97ceb2d811b771566cdc4'
    interface ArrayDay {
        temp: number
        weather: Array<any>
        humidity: number
        wind_speed:number
    }
    const [newDate, setNewDate] = useState<Date>();
    const [valueWeather, setValueWeather] = useState<string>();
    const [day, setDay] = useState<ArrayDay>()
    const [informationWeather, setInformationWeather] = useState<Array<any>>();

    React.useEffect(()=> {
        let newResponseDate = new Date()
        setNewDate(newResponseDate)
    },[])

    const enterCity = (async (e: { key: string; }) => {
        let longitude:Object
        if (e.key === 'Enter') {
            City.forEach((value: { name: string | undefined; coord: object; })=>{
                if (value.name === valueWeather){
                    longitude = value.coord
                }
            })
        }
        let responseWeather = (await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${longitude?.lat}&lon=${longitude?.lon}&units=metric&appid=${apiKey}`)).data
        responseWeather.daily.forEach((v: { dt: number })=>{
            let revertDate:Date = new Date(v.dt * 1000)
            v.dt = Number(`${revertDate.getDate()}.${dayRender(revertDate)}`)
        })
        setInformationWeather(responseWeather.daily)
        setDay(responseWeather.current)
    })
    return (
        <div className='section'>
            <div className='main_menu'>
                <div className='main_menu-flex'>
                    <img src={LogoWeather}/>
                    <p>Weather</p>
                </div>
                <p>{newDate?.toLocaleString()}</p>
            </div>
            <div className='main_content'>
                <div className='main_content-background'>
                    <div className='main_content-flex'>
                        <p className='main_content-telsia'>{day? day.temp : '12'} &deg;</p>
                        {day?.weather.map((v: {main: string})=>
                            <p className="main_content-cloudy">{v.main}</p>
                        )}
                        <div>
                            <p>Humadity <span>{day ? day.humidity : '64'}%</span></p>
                            <p>Wind <span>{day ? day.wind_speed : '12'} k/m</span></p>
                        </div>
                    </div>
                    <input value={valueWeather}
                           onChange={(e)=>setValueWeather(e.target.value)}
                           onKeyDown={enterCity}
                           placeholder='Change a city'
                    />
                </div>
                <div className='main_content-weather'>
                    {informationWeather?.map((v: string | number | any)=>
                        <div className='main_content-component'>
                            <p className='main_title'>
                                {v.dt}
                            </p>
                            {v.weather.map((value: { main: any; })=>
                                <>
                                {value.main === 'Clouds' ?
                                    <img src={Cloud}/>
                                    :
                                    value.main === 'Rain' ?
                                        <img src={Rain}/>
                                    :
                                    value.main === 'Snow' ?
                                        <img src={Snow}/>
                                    :
                                    value.main === 'Thunderstorm' ?
                                        <img src={Storm}/>
                                    :
                                    value.main === 'Drizzle' ?
                                        <img src={Drizzle}/>
                                    :
                                    value.main === 'Clear' ?
                                        <img src={Sunny}/>
                                    :
                                    value.main === 'Atmosphere' ?
                                        <img src={Atmosphere}/>
                                    : ''
                                }
                                <p className='main_content_p'>
                                    {v.temp.max} &deg;
                                </p>
                                <p>
                                {value.main}
                                </p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Weather;