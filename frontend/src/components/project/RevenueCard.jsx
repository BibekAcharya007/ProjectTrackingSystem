export default function RevenueCard({ employeesCount }) {
  const revenue = employeesCount * 50000; // dummy

  return (
    <div className="content-box">
      <h3 className="section-title">Revenue</h3>
      <p><b>Total Employees:</b> {employeesCount}</p>
      <p><b>Revenue:</b> ₹ {revenue}</p>
    </div>
  );
}
