import { useState } from 'react'
import './Weather.css'
import  DisplayWeather  from './DisplayWeather'


// function ctof(c) {
//     return (c * 9/5) + 32
// }

// function ktoc(k) {
//     return k - 273.15
// }

// function ktof(k) {
//     return (0 - 273.15) * 9/5 + 32
// }

function Weather() {
    const [ zip, setZip] = useState('')
    const [ data, setData ] = useState(null)
    const [ unit, setUnit ] = useState('imperial')

    async function getWeather() {
        const apikey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
        const units = 'imperial'
        const path = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}`
        console.log(path)
        
        const res = await fetch(path) //stop !
        const json = await res.json() // stop!
        console.log(json)
        
        const { cod, message } = json
        if ( cod !== 200) {
            setData({ cod, message })
            return
        }

        const temp = json.main.temp
        const humidity = json.main.humidity
        const desc = json.weather[0].description
        
        setData({ temp, desc, humidity, cod, message })
    }

    return (
        <div className='Weather'>
            {data ? <DisplayWeather {...data} /> : null}
            <form onSubmit={ e => {
                e.preventDefault()
                getWeather()
            }}>
                <input
                    value={zip}
                    onChange={ e => setZip(e.target.value) }
                />
                <button type='submit'>submit</button>

                <label>
                    <input type="radio" name="unit" checked={unit === 'imperial'} onChange={ () => setUnit('imperial')} />
                    imperial
                </label>

                <label>
                    <input type="radio"  name="unit" checked={unit === 'metric'} onChange={ () => setUnit('metric')} />
                    metric
                </label>

                <label>
                    <input type="radio"  name="unit" checked={unit === 'standard'} onChange={ () => setUnit('standard')} />
                    standard
                </label>
                
            </form>    
        </div>
    )
}

export default Weather