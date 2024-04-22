


const TestServices = () => {
    const data = [
      { ServiceId: 1, BusinessId: 101, Name: 'Service A', Description: 'Description A', DiscountId: 'D001', DiscountAmount: '', DiscountPercent: '10' },
      { ServiceId: 2, BusinessId: 102, Name: 'Service B', Description: 'Description B', DiscountId: 'D002', DiscountAmount: '5', DiscountPercent: ''  },
      // Add more data objects as needed
    ];
    return (
        <div>
          <h1>Test Services</h1>
          <table>
            <thead>
              <tr>
                <th>ServiceId</th>
                <th>BusinessId</th>
                <th>Name</th>
                <th>Description</th>
                <th>DiscountId</th>
                <th>Discount Amount</th>
                <th>Discount Percent</th>


              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.ServiceId}</td>
                  <td>{row.BusinessId}</td>
                  <td>{row.Name}</td>
                  <td>{row.Description}</td>
                  <td>{row.DiscountId}</td>
                  <td>{row.DiscountAmount}</td>
                  <td>{row.DiscountPercent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    
    export default TestServices;