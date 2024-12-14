import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [rates, setRates] = useState([]);
  const currencyList = ["CAD", "EUR", "IDR", "JPY", "CHF", "GBP"];
  const apiKey = "dae431073d7b40b0a5607c320e67c849";

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(
        `https://api.currencyfreaks.com/latest?apikey=${apiKey}&base=USD`
      );
      console.log("API Response:", response.data);
  
      const updatedRates = currencyList.map((currency) => {
        const rate = response.data.rates[currency];
        console.log(`Raw Rate for ${currency}:`, rate);
      
        if (!rate) {
          console.warn(`Rate for ${currency} is missing!`);
          return null;
        }
      
        const numericRate = parseFloat(rate);
        console.log(`Parsed Rate for ${currency}:`, numericRate);
      
        return {
          currency,
          exchangeRate: numericRate.toFixed(4),
          weBuy: (numericRate * 1.05).toFixed(4),
          weSell: (numericRate * 0.95).toFixed(4),
        };
      });
      
  
      setRates(updatedRates); 
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };
  

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Currency Rates</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.currency}>
              <td>{rate.currency}</td>
              <td>{rate.weBuy}</td>
              <td>{rate.exchangeRate}</td>
              <td>{rate.weSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#D25F1C",
    minHeight: "100vh",
    color: "white",
    fontFamily: "Arial, sans-serif",
    paddingTop: "20px",
  },
  heading: { marginBottom: "20px" },
  table: {
    margin: "0 auto",
    borderCollapse: "collapse",
    width: "80%",
    backgroundColor: "#fff",
    color: "#000",
  },
  footer: {
    marginTop: "20px",
  },
};

export default App;
