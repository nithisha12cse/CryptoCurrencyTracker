import  { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
 const {coinId} = useParams();
  const [coinData, setCoinData] = useState();
  const [timeRange, setTimeRange] = useState('7');
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);
console.log(coinId)
const fetchCoinData = async() => {
const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Fktx88GQx6mwkv6xCjhYfW6w'}
};

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
  .then(response => response.json())
  .then(response => setCoinData(response))
  .catch(err => console.error(err));}

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Fktx88GQx6mwkv6xCjhYfW6w'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=${timeRange}`, options)
      .then(response => response.json())
      .then(response => setHistoricalData(response))
      .catch(err => console.error(err));
  }
  useEffect(() => {
    fetchHistoricalData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
      
  
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">

          <LineChart historicalData={historicalData} />
        </div>
        <br></br>
        <div className="dateop">
      <select value={timeRange} onChange={e => setTimeRange(e.target.value)}>
  
        <option value="7">1 week</option>
        <option value="30">1 month</option>
        <option value="365">1 year</option>
       
      </select>

    </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Cap</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;