export interface InvoiceItem {
  id: string
  description: string
  quantity: number | string
  rate: number | string
  amount: number
}

export interface InvoiceData {
  invoiceNumber: string
  date: string
  fromName: string
  fromEmail: string
  toName: string
  toEmail: string
  items: InvoiceItem[]
  taxRate: number | string
  subtotal: number
  taxAmount: number
  total: number
}