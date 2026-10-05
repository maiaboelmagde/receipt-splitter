import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import EmptyContent from "../../../components/EmptyContent";

export default function AddExpenses({ people, items, AddItem, DeleteItem }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sharedBy, setSharedBy] = useState([]); // person ids
  const [paid, setPaid] = useState({}); // { personId: "amount" }

  const priceNum = parseFloat(price) || 0;
  const paidTotal = people.reduce((s, p) => s + (parseFloat(paid[p.id]) || 0), 0);
  const remaining = priceNum - paidTotal;
  const isBalanced = Math.abs(remaining) < 0.005;
  const canAdd = name.trim() && priceNum > 0 && sharedBy.length > 0 && isBalanced;

  const nameOf = (id) => people.find((p) => p.id === id)?.name ?? "?";

  const toggleShared = (id) =>
    setSharedBy((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const allSelected = people.length > 0 && sharedBy.length === people.length;

  function handleSubmit() {
    if (!canAdd) return;
    const payments = people
      .map((p) => ({ payerId: p.id, amount: parseFloat(paid[p.id]) || 0 }))
      .filter((p) => p.amount > 0);

    AddItem({ name: name.trim(), price: priceNum, sharedBy, payments });
    setName("");
    setPrice("");
    setSharedBy([]);
    setPaid({});
  }

  return (
    <div className="mt-6">
      <p className="text-lg text-indigo-700 font-semibold">Add Expense</p>

      {/* Form */}
      <div className="mt-3 rounded-xl border-2 border-gray-200 p-4 space-y-5">
        {/* Name + price */}
        <div className="grid grid-cols-3 gap-3">
          <input
            className="col-span-2 rounded-md border-2 border-gray-200 px-3 py-2 focus:border-indigo-500 outline-none"
            placeholder="Item name (e.g. Pizza)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            min="0"
            className="rounded-md border-2 border-gray-200 px-3 py-2 focus:border-indigo-500 outline-none"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Shared by */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Split between</p>
            <button
              className="text-sm text-indigo-500 hover:underline"
              onClick={() => setSharedBy(allSelected ? [] : people.map((p) => p.id))}
            >
              {allSelected ? "Clear" : "Everyone"}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {people.map((p) => {
              const on = sharedBy.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggleShared(p.id)}
                  className={`rounded-full px-4 py-1 text-sm border-2 transition ${
                    on
                      ? "bg-indigo-500 border-indigo-500 text-white"
                      : "bg-white border-gray-200 text-gray-500 hover:border-indigo-300"
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
          {sharedBy.length > 1 && priceNum > 0 && (
            <p className="mt-2 text-xs text-gray-400">
              ≈ {(priceNum / sharedBy.length).toFixed(2)} each
            </p>
          )}
        </div>

        {/* Who paid */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Who paid?</p>
          <div className="space-y-2">
            {people.map((p) => (
              <div key={p.id} className="flex items-center gap-2">
                <span className="w-1/3 truncate text-gray-700">{p.name}</span>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  className="flex-1 rounded-md border-2 border-gray-200 px-3 py-1.5 focus:border-emerald-500 outline-none"
                  value={paid[p.id] ?? ""}
                  onChange={(e) => setPaid({ ...paid, [p.id]: e.target.value })}
                />
                <button
                  className="text-sm text-emerald-600 hover:underline whitespace-nowrap"
                  onClick={() => setPaid({ [p.id]: priceNum || "" })}
                >
                  Paid all
                </button>
              </div>
            ))}
          </div>

          {priceNum > 0 && (
            <p className={`mt-2 text-sm ${isBalanced ? "text-emerald-600" : "text-red-500"}`}>
              {isBalanced
                ? "✓ Payments match the price"
                : remaining > 0
                ? `${remaining.toFixed(2)} still unpaid`
                : `Payments exceed the price by ${Math.abs(remaining).toFixed(2)}`}
            </p>
          )}
        </div>

        <button
          disabled={!canAdd}
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-1 rounded-md bg-indigo-500 px-4 py-2 text-white shadow-md hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <IoMdAdd /> Add item
        </button>
      </div>

      {/* Items list */}
      {items.length === 0 ? (
        <EmptyContent />
      ) : (
        <div className="mt-4 space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between rounded-lg border-2 border-green-300 bg-green-100 p-3"
            >
              <div>
                <p className="font-semibold">
                  {item.name} — ${item.price}
                </p>
                <p className="text-xs text-gray-600">
                  Split: {item.sharedBy.map(nameOf).join(", ")}
                </p>
                <p className="text-xs text-gray-600">
                  Paid: {item.payments.map((p) => `${nameOf(p.payerId)} ${p.amount}`).join(" · ")}
                </p>
              </div>
              <button className="text-red-500 hover:text-red-700" onClick={() => DeleteItem(item.id)}>
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}