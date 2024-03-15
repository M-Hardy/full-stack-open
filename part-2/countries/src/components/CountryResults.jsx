import CountryInfo from "./CountryInfo";

const CountryResults = ({ results }) => {
    if (results.length === 1) {
        return <CountryInfo countryData={results[0]} />;
    } else if (results.length > 10) {
        return <div>Too many matches, specify another filter</div>;
    } else {
        return (
            <div>
                {results.map((country) => (
                    <div key={country.name.official}>{country.name.common}</div>
                ))}
            </div>
        );
    }
};

export default CountryResults;
