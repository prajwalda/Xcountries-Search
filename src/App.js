import "./index.css";
import {useState,useEffect} from "react"

export default function App() {

  const [data,setData] = useState([]);
  const [input,setInputValue] = useState("");
  const [filteredCountries,setFilteredCountries] = useState([]);

  useEffect(() => {
      const performApiCall = async () => {
          try {
              const response = await fetch('https://restcountries.com/v3.1/all');
              const result = await response.json();
              console.log(result.name);
              setData(result);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      performApiCall();
  }, []); 

  

  useEffect(()=>{
    const filteredCountries = data.filter((country) =>
    country.name.common.toLowerCase().includes(input.toLowerCase())
  );
    setFilteredCountries(filteredCountries);
  },[input,data])

  return (
    <div className="container">
      <div className="input">
        <input type="text" placeholder="Search for countries..." onChange={(e)=>setInputValue(e.target.value)}/>
      </div>

      <div className="App">
      {
        filteredCountries.map((country)=>(
          <div key={country.ssd} className="wrapper">
            <img src={country.flags.png} alt={`Flag of ${country.flags.alt}`}/>
            <h3>{country.name.common}</h3>
          </div>
         
        ))
      }
      </div>
    </div>
  );
}
