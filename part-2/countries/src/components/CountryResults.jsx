const CountryResults = ({ countries }) => {
    return (
        <ul>
            {countries.map((country) => {
                <li key={country.name.official}>{country.name.common}</li>;
            })}
        </ul>
    );
};

export default CountryResults;
