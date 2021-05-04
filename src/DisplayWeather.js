import './DisplayWeather.css'



function DisplayWeather(props) {
    if ( props.cod !== 200 ) {
        return (
            <div className= "DisplayWeather" >
                <small className="Errormsg">Invalid</small>
            </div>
        )
    }
    return (
        <div className="DisplayWeather">
            <h1 className="Temp">{props.temp}</h1>
            <p className="Desc">{props.desc}</p>
            <small>humidity:{props.humidity}</small>
            <small>{props.cod} {props.message}</small>
        </div>
    )
}

export default DisplayWeather;