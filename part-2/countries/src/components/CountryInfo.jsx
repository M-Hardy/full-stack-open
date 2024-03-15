const CountryInfo = ({ countryData }) => {
    const languages = Object.values(countryData.languages);
    return (
        <div>
            <h1>{countryData.name.common}</h1>
            <div>capital {countryData.capital}</div>
            <div> area {countryData.area}</div>
            <ul>
                {languages.map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={countryData.flags.png} />
        </div>
    );
};

export default CountryInfo;
