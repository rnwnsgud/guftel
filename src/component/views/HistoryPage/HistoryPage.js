import React from "react";

function HistoryPage(props) {
  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>History</h1>
      </div>
      <br />

      <table>
        <tbody>
          <tr>
            <th>Payment Id</th>
            <th>Episode</th>
            <th>Quantity</th>
            <th>Date of Purchase</th>
          </tr>
        </tbody>

        <tbody>
          {props.user.userData &&
            props.user.userData.history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.episode}</td>
                <td>{item.quantity}</td>
                <td>{item.dateOfPurchase}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPage;
