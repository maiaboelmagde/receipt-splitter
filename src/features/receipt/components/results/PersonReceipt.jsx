import { formatMoney } from "../../utils/money";

export default function PersonReceipt({ receipt }) {
  const { person, lines, total, paid, balance } = receipt;

  return (
    <div className="rounded-xl border-2 border-gray-200 p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-indigo-600">{person.name}</h3>

      <div className="mt-3 space-y-1 text-sm">
        {lines.length === 0 ? (
          <p className="text-gray-400">No items</p>
        ) : (
          lines.map((line) => (
            <div key={line.itemId} className="flex justify-between">
              <span className="text-gray-600">
                {line.name}
                {line.sharedCount > 1 && (
                  <span className="ml-1 text-xs text-gray-400">(÷{line.sharedCount})</span>
                )}
              </span>
              <span>{formatMoney(line.amount)}</span>
            </div>
          ))
        )}
      </div>

      <hr className="my-3 border-dashed" />

      <div className="space-y-1 text-sm">
        <div className="flex justify-between font-semibold">
          <span>Total share</span>
          <span>{formatMoney(total)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Paid</span>
          <span>{formatMoney(paid)}</span>
        </div>
        <div
          className={`flex justify-between font-semibold ${
            balance > 0 ? "text-emerald-600" : balance < 0 ? "text-red-500" : "text-gray-400"
          }`}
        >
          <span>{balance > 0 ? "Gets back" : balance < 0 ? "Owes" : "Settled"}</span>
          <span>{balance !== 0 && formatMoney(Math.abs(balance))}</span>
        </div>
      </div>
    </div>
  );
}
