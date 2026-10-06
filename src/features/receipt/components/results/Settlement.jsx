import { IoMdArrowRoundBack } from "react-icons/io";
import { formatMoney } from "../../utils/money";

export default function Settlement({ transfers, people }) {
  const nameOf = (id) => people.find((p) => p.id === id)?.name ?? "?";

  if (transfers.length === 0) {
    return (
      <p className="rounded-lg bg-emerald-50 p-3 text-center text-emerald-600">
        ✓ Everyone is settled, nobody owes anything.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {transfers.map((t, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg border-2 border-indigo-200 bg-indigo-50 p-3"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold">{nameOf(t.fromId)}</span>
            <IoMdArrowRoundBack className="rotate-180 text-indigo-500" />
            <span className="font-semibold">{nameOf(t.toId)}</span>
          </div>
          <span className="font-semibold text-indigo-600">{formatMoney(t.amount)}</span>
        </div>
      ))}
    </div>
  );
}
