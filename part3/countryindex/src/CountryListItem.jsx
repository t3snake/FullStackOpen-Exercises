import { useState } from "react"
import CountryView from "./CountryView"

const CountryListItem = ({country}) => {
    const [isViewHidden, setIsViewHidden] = useState(true)
    const [buttonText, setButtonText] = useState("show")
    const toggleView = () => {
        if (isViewHidden) {
            setButtonText("hide")
        } else {
            setButtonText("show")
        }
        setIsViewHidden(!isViewHidden)  
    }
    return (
        <>
            {country.name.common} &nbsp;
            <button onClick={toggleView}>{buttonText}</button>
            <CountryView country={country} isHidden={isViewHidden} />
        </>
    )
}

export default CountryListItem