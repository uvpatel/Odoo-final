import { InvoiceData } from "@/types/invoice";
import { jsPDF } from "jspdf";

export const generatePDF = (invoice: InvoiceData) => {
  const doc = new jsPDF();
  let y = 30;

  // Title
  doc.setFontSize(24);
  doc.text("INVOICE", 20, y);
  doc.setFontSize(12);
  doc.text(`#${invoice.invoiceNumber}`, 150, y);
  y += 20;

  // Date
  doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 150, y);
  y += 20;

  // From/To
  doc.setFontSize(14);
  doc.text("From:", 20, y);
  doc.text("To:", 120, y);
  y += 10;

  doc.setFontSize(10);
  doc.text(invoice.fromName, 20, y);
  doc.text(invoice.toName, 120, y);
  y += 6;
  doc.text(invoice.fromEmail, 20, y);
  doc.text(invoice.toEmail, 120, y);
  y += 20;

  // Items header
  doc.setFontSize(10);
  doc.text("Description", 20, y);
  doc.text("Qty", 120, y);
  doc.text("Rate", 140, y);
  doc.text("Amount", 160, y);
  y += 5;
  doc.line(20, y, 190, y);
  y += 10;

  // Items
  invoice.items.forEach((item) => {
    doc.text(item.description, 20, y);
    doc.text(item.quantity.toString(), 120, y);
    doc.text(`$${Number(item.rate).toFixed(2)}`, 140, y);
    doc.text(`$${item.amount.toFixed(2)}`, 160, y);
    y += 8;
  });

  y += 10;
  doc.line(140, y, 190, y);
  y += 10;

  // Totals
  doc.text("Subtotal:", 140, y);
  doc.text(`$${invoice.subtotal.toFixed(2)}`, 160, y);
  y += 8;
  doc.text(`Tax (${invoice.taxRate}%):`, 140, y);
  doc.text(`$${invoice.taxAmount.toFixed(2)}`, 160, y);
  y += 8;
  doc.setFontSize(12);
  doc.text("Total:", 140, y);
  doc.text(`$${invoice.total.toFixed(2)}`, 160, y);

  // Generate blob URL untuk preview
  // const pdfBlob = doc.output("blob");
  // return URL.createObjectURL(pdfBlob);

  doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
};