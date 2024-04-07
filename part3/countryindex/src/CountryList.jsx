
const CountryList = ({filter, countries}) => {
    if (countries.length === 0) {
        return null
    }

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    
    if (filteredCountries.length >= 10) {
        return (
            <>
                Too many matches, specify another filter
            </>
        )
    }

    if (filteredCountries.length > 1) {
        return (
            <>
                {filteredCountries.map(country => {
                    return (
                        <div key={country.ccn3}>
                            {country.name.common}
                        </div>
                    )
                })}
            </>
        )
    }

    if (filteredCountries.length == 1) {
        let country = filteredCountries[0]
        console.log(country.languages)
        return (
            <div>
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
            </div>
        )
    }
}

export default CountryList