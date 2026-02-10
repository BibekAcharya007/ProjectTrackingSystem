export default function ManagerInfoCard({ manager }) {
  if (!manager) return null;

  return (
    <div className="content-box">
      <h3 className="section-title">Manager Details</h3>
      <p><b>Name:</b> {manager.name}</p>
      <p><b>Email:</b> {manager.email}</p>
    </div>
  );
}
