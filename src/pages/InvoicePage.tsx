import { useMemo, useState } from "react";
import { Plus, Trash2, Printer, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  price: number;
}

type Status = "LUNAS" | "DP" | "BELUM_BAYAR";

const statusLabel: Record<Status, string> = {
  LUNAS: "LUNAS",
  DP: "DP / Uang Muka",
  BELUM_BAYAR: "Belum Bayar",
};

const statusClass: Record<Status, string> = {
  LUNAS: "bg-emerald-100 text-emerald-700 border-emerald-300",
  DP: "bg-amber-100 text-amber-700 border-amber-300",
  BELUM_BAYAR: "bg-rose-100 text-rose-700 border-rose-300",
};

const rupiah = (n: number) =>
  "Rp " + (isNaN(n) ? 0 : n).toLocaleString("id-ID");

const todayStr = () => new Date().toISOString().slice(0, 10);
const genInvoiceNo = () => {
  const d = new Date();
  const p = (x: number) => String(x).padStart(2, "0");
  return `KRV/${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}/${p(
    d.getHours()
  )}${p(d.getMinutes())}`;
};

export default function InvoicePage() {
  const [customer, setCustomer] = useState("");
  const [contact, setContact] = useState("");
  const [invoiceNo, setInvoiceNo] = useState(genInvoiceNo());
  const [date, setDate] = useState(todayStr());
  const [status, setStatus] = useState<Status>("DP");

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: crypto.randomUUID(), description: "Custom Lanyard Sublim", qty: 50, price: 8500 },
    { id: crypto.randomUUID(), description: "ID Card PVC + Tali", qty: 50, price: 12000 },
  ]);

  const [discount, setDiscount] = useState(0);
  const [dp, setDp] = useState(0);
  const [notes, setNotes] = useState("Terima kasih atas kepercayaan Anda kepada Kreva Studio.");

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.qty * i.price, 0),
    [items]
  );
  const totalNet = Math.max(0, subtotal - (discount || 0));
  const remaining = Math.max(0, totalNet - (dp || 0));

  const updateItem = (id: string, patch: Partial<InvoiceItem>) =>
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  const removeItem = (id: string) =>
    setItems((arr) => arr.filter((i) => i.id !== id));
  const addItem = () =>
    setItems((arr) => [
      ...arr,
      { id: crypto.randomUUID(), description: "", qty: 1, price: 0 },
    ]);

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 print:bg-white print:p-0">
      {/* PRINT STYLES */}
      <style>{`
        @media print {
          @page { size: A4; margin: 14mm; }
          body { background: white !important; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .invoice-sheet {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            border-radius: 0 !important;
          }
          .print-full { grid-template-columns: 1fr !important; }
        }
        .print-only { display: none; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header bar */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-[hsl(220,55%,20%)] text-white grid place-items-center font-bold">
              KS
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[hsl(220,55%,20%)]" style={{ fontFamily: "var(--font-heading)" }}>
                Invoice Generator
              </h1>
              <p className="text-sm text-slate-500">Kreva Studio — Digital Printing & Custom Merchandise</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setInvoiceNo(genInvoiceNo())}
              className="gap-2"
            >
              <FileText className="h-4 w-4" /> New No.
            </Button>
            <Button
              onClick={() => window.print()}
              className="gap-2 bg-[hsl(220,55%,20%)] hover:bg-[hsl(220,55%,15%)] text-white"
            >
              <Printer className="h-4 w-4" /> Print / Save PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 print-full">
          {/* INPUT FORM */}
          <aside className="no-print bg-white rounded-2xl shadow-sm border border-slate-200 p-5 h-fit lg:sticky lg:top-6 space-y-5">
            <section>
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                Info Invoice
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label>Nama Pelanggan</Label>
                  <Input value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Budi Santoso" />
                </div>
                <div className="col-span-2">
                  <Label>Kontak (HP/Email)</Label>
                  <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="0812-3456-7890" />
                </div>
                <div>
                  <Label>No. Invoice</Label>
                  <Input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
                </div>
                <div>
                  <Label>Tanggal</Label>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="col-span-2">
                  <Label>Status Pembayaran</Label>
                  <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LUNAS">LUNAS</SelectItem>
                      <SelectItem value="DP">DP / Uang Muka</SelectItem>
                      <SelectItem value="BELUM_BAYAR">Belum Bayar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Item Pesanan</h3>
                <Button size="sm" variant="outline" onClick={addItem} className="gap-1 h-8">
                  <Plus className="h-3.5 w-3.5" /> Tambah
                </Button>
              </div>
              <div className="space-y-3">
                {items.map((it, idx) => (
                  <div key={it.id} className="rounded-lg border border-slate-200 p-3 bg-slate-50/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-500">Item #{idx + 1}</span>
                      <button
                        onClick={() => removeItem(it.id)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                        aria-label="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <Input
                      className="mb-2"
                      placeholder="Deskripsi (Mug Sublim, ID Card, ...)"
                      value={it.description}
                      onChange={(e) => updateItem(it.id, { description: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Qty</Label>
                        <Input
                          type="number"
                          min={0}
                          value={it.qty}
                          onChange={(e) => updateItem(it.id, { qty: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Harga Satuan</Label>
                        <Input
                          type="number"
                          min={0}
                          value={it.price}
                          onChange={(e) => updateItem(it.id, { price: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-right text-sm font-medium text-[hsl(220,55%,20%)]">
                      Total: {rupiah(it.qty * it.price)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Pembayaran</h3>
              <div className="space-y-3">
                <div>
                  <Label>Diskon (Rp)</Label>
                  <Input type="number" min={0} value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
                </div>
                <div>
                  <Label>Uang Muka / DP (Rp)</Label>
                  <Input type="number" min={0} value={dp} onChange={(e) => setDp(Number(e.target.value))} />
                </div>
                <div>
                  <Label>Catatan</Label>
                  <Input value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
              </div>
            </section>
          </aside>

          {/* LIVE PREVIEW */}
          <main className="invoice-sheet bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Invoice header */}
            <div className="bg-[hsl(220,55%,20%)] text-white px-8 py-7 relative">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 rounded-lg bg-white text-[hsl(220,55%,20%)] grid place-items-center font-bold text-lg">
                      KS
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        KREVA STUDIO
                      </h2>
                      <p className="text-xs text-slate-300">Digital Printing & Custom Merchandise</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Jl. Merdeka No. 123, Jakarta · 0812-3456-7890 · hello@krevastudio.id
                  </p>
                </div>
                <div className="text-right">
                  <p className="uppercase tracking-[0.2em] text-xs text-slate-300 mb-1">Invoice</p>
                  <p className="text-2xl font-bold">{invoiceNo || "—"}</p>
                  <p className="text-xs text-slate-300 mt-1">
                    {new Date(date).toLocaleDateString("id-ID", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer + status */}
            <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-dashed border-slate-200">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">Ditagihkan kepada</p>
                <p className="text-lg font-semibold text-[hsl(220,55%,20%)]">{customer || "Nama Pelanggan"}</p>
                <p className="text-sm text-slate-500">{contact || "—"}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">Status Pembayaran</p>
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold border ${statusClass[status]}`}>
                  {statusLabel[status]}
                </span>
              </div>
            </div>

            {/* Items table */}
            <div className="px-8 py-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <th className="py-3 w-10">#</th>
                    <th className="py-3">Deskripsi</th>
                    <th className="py-3 text-center w-20">Qty</th>
                    <th className="py-3 text-right w-32">Harga</th>
                    <th className="py-3 text-right w-32">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 && (
                    <tr><td colSpan={5} className="py-6 text-center text-slate-400">Belum ada item</td></tr>
                  )}
                  {items.map((it, idx) => (
                    <tr key={it.id} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 text-slate-400">{idx + 1}</td>
                      <td className="py-3 font-medium text-slate-700">{it.description || "—"}</td>
                      <td className="py-3 text-center text-slate-600">{it.qty}</td>
                      <td className="py-3 text-right text-slate-600">{rupiah(it.price)}</td>
                      <td className="py-3 text-right font-semibold text-[hsl(220,55%,20%)]">{rupiah(it.qty * it.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals + payment info */}
            <div className="px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
                <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-3">Pembayaran via Transfer</p>
                <div className="space-y-1 text-sm">
                  <p className="text-slate-500">Bank <span className="text-slate-800 font-semibold">BCA</span></p>
                  <p className="text-slate-500">A/N <span className="text-slate-800 font-semibold">KREVA STUDIO</span></p>
                  <p className="text-slate-500">No. Rek <span className="text-slate-800 font-semibold tracking-wider">1234 3678 90</span></p>
                </div>
                {notes && (
                  <p className="mt-4 pt-3 border-t border-slate-200 text-xs italic text-slate-500">{notes}</p>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span><span>{rupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Diskon</span><span>− {rupiah(discount)}</span>
                </div>
                <div className="flex justify-between font-semibold text-[hsl(220,55%,20%)] pt-2 border-t border-slate-200">
                  <span>Total Net</span><span>{rupiah(totalNet)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Uang Muka (DP)</span><span>{rupiah(dp)}</span>
                </div>
                <div className="flex justify-between items-center mt-2 px-4 py-3 rounded-lg bg-[hsl(220,55%,20%)] text-white">
                  <span className="font-medium">Sisa Pelunasan</span>
                  <span className="text-lg font-bold">{rupiah(remaining)}</span>
                </div>
              </div>
            </div>

            {/* T&C */}
            <div className="px-8 py-6 bg-slate-50 border-t border-slate-200">
              <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">Syarat & Ketentuan</p>
              <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1">
                <li>Pesanan diproses setelah DP minimal 50%.</li>
                <li>Hasil cetak berdasarkan File Approve Final.</li>
                <li>Pelunasan sebelum pengambilan/pengiriman barang.</li>
                <li>Komplain maksimal 2x24 jam setelah barang diterima.</li>
              </ol>
            </div>

            {/* Signatures */}
            <div className="px-8 py-8 grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-12">Pelanggan,</p>
                <div className="border-t border-slate-300 pt-2 text-sm font-medium text-slate-700">
                  ( {customer || "..............."} )
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-2">Hormat Kami,</p>
                <p className="font-bold text-[hsl(220,55%,20%)]" style={{ fontFamily: "var(--font-heading)" }}>
                  Kreva Studio
                </p>
                <div className="h-8" />
                <div className="border-t border-slate-300 pt-2 text-sm font-medium text-slate-700">
                  ( Admin Kreva Studio )
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
