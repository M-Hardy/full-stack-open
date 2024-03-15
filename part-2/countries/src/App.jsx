import { useState, useEffect } from "react";
import countryService from "./services/countries.js";
import CountryResults from "./components/CountryResults";

const App = () => {
    const [allCountries, setAllCountries] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        countryService
            .getAll()
            .then((returnedCountries) => setAllCountries(returnedCountries));
    }, []);

    const handleInputChange = (event) => {
        const search = event.target.value.toLowerCase();
        if (search) {
            setSearchResults(
                allCountries.filter((country) =>
                    country.name.common.toLowerCase().includes(search)
                )
            );
        } else {
            setSearchResults([]);
        }
    };

    // If back-end data isn't fetched yet, don't render the app
    // trading immediate app render (~2 secs now) for immediate search
    // functionality
    // Alternative is immediate app render but search terms don't yield any
    // results within ~2 secs after render
    // Ideally: immediate page render, if search bar isn't empty display
    // results. This way, if we've typed in the search bar immediately,
    // the results will eventually display (when data is loaded). Need to
    // keep state of search value, and if it isn't "" display results
    // for result
    if (allCountries.length === 0) {
        return null;
    }
    return (
        <div>
            <div>
                find countries <input onChange={handleInputChange} />
            </div>
            <CountryResults results={searchResults} />
        </div>
    );
};
export default App;
