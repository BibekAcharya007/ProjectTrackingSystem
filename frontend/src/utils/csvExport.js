export const exportToCSV = (employees, filename = "employees.csv") => {
  if (!employees || employees.length === 0) {
    alert("No employees to export!");
    return;
  }

  const headers = Object.keys(employees[0]);
  const csvRows = [];

  csvRows.push(headers.join(","));

  for (const emp of employees) {
    const values = headers.map((h) => `"${emp[h] ?? ""}"`);
    csvRows.push(values.join(","));
  }

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  window.URL.revokeObjectURL(url);
};
