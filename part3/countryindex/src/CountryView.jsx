const CountryView = ({country,isHidden}) => {
    if (isHidden) {
        return null
    }
    return (
        <>
            <h1>{country.name.common}</h1>
            Capital: {country.capital[0]} <br />
            Area: {country.area}

            <h2>Languages</h2>
            <ul>
                {Object.keys(country.languages).map(key => {
                    return (
                        <li key={key}>
                            {country.languages[key]}
                        </li>
                    )
                })}
            </ul>
            <img src={country.flags.svg} alt="Flag" width="256" />
        </>
    )
}

export default CountryView