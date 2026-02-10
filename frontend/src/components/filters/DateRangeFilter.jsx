export default function DateRangeFilter({ startDate, endDate, setStartDate, setEndDate, onFilter }) {
  return (
    <div className="content-box">
      <h3 className="section-title">Date Range Filter</h3>

      <label className="label">Start Date</label>
      <input
        type="date"
        className="input"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label className="label" style={{ marginTop: "10px" }}>End Date</label>
      <input
        type="date"
        className="input"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button className="btn" style={{ marginTop: "15px" }} onClick={onFilter}>
        Apply Filter
      </button>
    </div>
  );
}
