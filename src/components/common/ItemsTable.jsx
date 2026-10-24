import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function ItemsTable({
  initialItems = [
    { id: 1, name: "Cement (UltraTech)", unit: "Bag (50kg)", qty: 500, rate: 380, gst: 18 },
    { id: 2, name: "RCC Pipe (4 inch)", unit: "Nos", qty: 50, rate: 120, gst: 18 },
    { id: 3, name: "Aggregate (Sand)", unit: "Ton", qty: 20, rate: 1200, gst: 18 }
  ],
  onChange = null,
  readOnly = false
}) {
  const [items, setItems] = useState(initialItems);

  const calculateTotals = (currentItems) => {
    let subtotal = 0;
    let totalGst = 0;
    currentItems.forEach(item => {
      const lineTaxable = (Number(item.qty) || 0) * (Number(item.rate) || 0);
      const lineGst = (lineTaxable * (Number(item.gst) || 0)) / 100;
      subtotal += lineTaxable;
      totalGst += lineGst;
    });
    return {
      subtotal,
      totalGst,
      grandTotal: subtotal + totalGst
    };
  };

  const totals = calculateTotals(items);

  const handleItemChange = (id, field, value) => {
    const updated = items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(updated);
    if (onChange) onChange(updated, calculateTotals(updated));
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: "TMT Steel Rod 12mm",
      unit: "Ton",
      qty: 5,
      rate: 62000,
      gst: 18
    };
    const updated = [...items, newItem];
    setItems(updated);
    if (onChange) onChange(updated, calculateTotals(updated));
  };

  const handleRemoveItem = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    if (onChange) onChange(updated, calculateTotals(updated));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-800">
          Line Items ({items.length})
        </h4>
        {!readOnly && (
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus size={13} />
            <span>Add Item</span>
          </button>
        )}
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold text-[10px] uppercase tracking-wider">
              <th className="py-2.5 px-3 w-8 text-center">#</th>
              <th className="py-2.5 px-3">Material / Service</th>
              <th className="py-2.5 px-3 w-28">Unit</th>
              <th className="py-2.5 px-3 w-24 text-right">Quantity</th>
              <th className="py-2.5 px-3 w-28 text-right">Rate (₹)</th>
              <th className="py-2.5 px-3 w-20 text-center">GST (%)</th>
              <th className="py-2.5 px-3 w-32 text-right">Amount (₹)</th>
              {!readOnly && <th className="py-2.5 px-2 w-10 text-center"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {items.map((item, idx) => {
              const lineTaxable = (Number(item.qty) || 0) * (Number(item.rate) || 0);
              return (
                <tr key={item.id} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 text-center text-slate-400 font-medium">{idx + 1}</td>
                  <td className="py-2.5 px-3">
                    {readOnly ? (
                      <span className="font-semibold text-slate-800">{item.name}</span>
                    ) : (
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    {readOnly ? (
                      <span className="text-slate-600">{item.unit}</span>
                    ) : (
                      <select
                        value={item.unit}
                        onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
                      >
                        <option value="Bag (50kg)">Bag (50kg)</option>
                        <option value="Ton">Ton</option>
                        <option value="Nos">Nos</option>
                        <option value="CFT">CFT</option>
                        <option value="Bucket">Bucket</option>
                        <option value="Meter">Meter</option>
                      </select>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {readOnly ? (
                      <span className="font-medium text-slate-700">{item.qty}</span>
                    ) : (
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                        className="w-20 px-2 py-1 border border-slate-200 rounded text-xs text-right text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {readOnly ? (
                      <span className="font-medium text-slate-700">{formatCurrencyINR(item.rate)}</span>
                    ) : (
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
                        className="w-24 px-2 py-1 border border-slate-200 rounded text-xs text-right text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {readOnly ? (
                      <span className="text-slate-600">{item.gst}%</span>
                    ) : (
                      <select
                        value={item.gst}
                        onChange={(e) => handleItemChange(item.id, 'gst', e.target.value)}
                        className="px-1.5 py-1 border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
                      >
                        <option value="0">0%</option>
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                      </select>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                    {formatCurrencyINR(lineTaxable)}
                  </td>
                  {!readOnly && (
                    <td className="py-2.5 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                        title="Delete line item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Order Summary box */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5 max-w-xs ml-auto text-xs">
        <div className="flex items-center justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-medium text-slate-800">{formatCurrencyINR(totals.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span>GST Total</span>
          <span className="font-medium text-slate-800">{formatCurrencyINR(totals.totalGst)}</span>
        </div>
        <div className="border-t border-slate-200 pt-1.5 flex items-center justify-between font-extrabold text-sm text-slate-900">
          <span>Total Amount (₹)</span>
          <span className="text-blue-600">{formatCurrencyINR(totals.grandTotal)}</span>
        </div>
      </div>
    </div>
  );
}
