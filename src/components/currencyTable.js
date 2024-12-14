function currencyTable({ rates }) {
    return (
      <table>
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
    );
  }
  
  export default currencyTable;
  