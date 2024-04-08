import CountryListItem from "./CountryListItem"
import CountryView from "./CountryView"

const CountryList = ({filter, countries}) => {
    if (countries.length === 0 || !filter) {
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
                        <div key={country.ccn3} >
                            <CountryListItem country={country} />
                        </div>
                    )
                })}
            </>
        )
    }

    if (filteredCountries.length == 1) {
        let country = filteredCountries[0]
        return (
            <>
                <CountryView country={country} isHidden={false} />
            </>
        )
    }
}

export default CountryList