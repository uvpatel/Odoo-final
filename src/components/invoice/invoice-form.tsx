import BasicDetails from "./basic-details";
import ContactDetails from "./contact-details";
import ItemsList from "./items-list";
import TaxAndTotals from "@/components/invoice/tax-and-totals";

export default function InvoiceForm() {
  return (
    <div className="space-y-6">
      <BasicDetails />
      <ContactDetails />
      <ItemsList />
      <TaxAndTotals />
    </div>
  );
}