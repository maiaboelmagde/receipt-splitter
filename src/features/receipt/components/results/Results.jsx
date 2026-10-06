import { useMemo } from "react";
import { calculateSplit } from "../../utils/calculateSplit";
import { formatMoney } from "../../utils/money";
import PersonReceipt from "./PersonReceipt";
import Settlement from "./Settlement";

export default function Results({ people, items }) {
  const { receipts, transfers, grandTotal } = useMemo(
    () => calculateSplit(people, items),
    [people, items]
  );

  return (
    <div className="mt-6 space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-500">Bill total</p>
        <p className="text-3xl font-bold text-indigo-600">{formatMoney(grandTotal)}</p>
      </div>

      <section>
        <p className="mb-2 text-lg font-semibold text-indigo-700">Who pays whom</p>
        <Settlement transfers={transfers} people={people} />
      </section>

      <section>
        <p className="mb-2 text-lg font-semibold text-indigo-700">Receipts</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {receipts.map((r) => (
            <PersonReceipt key={r.person.id} receipt={r} />
          ))}
        </div>
      </section>
    </div>
  );
}
