document.getElementById('downloadPdf').addEventListener('click', function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  // Title
  doc.setFontSize(16);
  doc.text('Clemz Academy School - Student Results', 14, 20);
  // Get table data
  const table = document.getElementById('resultsTable');
  const rows = table.getElementsByTagName('tr');
  // Starting position
  let yPosition = 30;
  // Define columns widths
  const colWidths = [20, 30, 20, 30, 20, 20, 25, 25];
  // Set header
  const headers = ['ID', 'Name', 'Class', 'Total', 'Average', 'Grade', 'Eff.', 'Psych.'];
  let x = 14;
  // Draw table headers
  doc.setFontSize(10);
  headers.forEach((header, index) => {
    doc.text(header, x, yPosition);
    x += colWidths[index];
  });
  yPosition += 10;
  // Loop through table rows and add data
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    x = 14;
    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].innerText;
      doc.text(cellText, x, yPosition);
      x += colWidths[j];
    }
    yPosition += 10;
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 20;
    }
  }
  // Save the PDF
  doc.save('StudentResults.pdf');
});