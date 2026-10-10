import { useMemo, useState } from "react";
import { calculateSplit } from "../../utils/calculateSplit";
import { formatMoney } from "../../utils/money";
import PersonReceipt from "./PersonReceipt";
import Settlement from "./Settlement";
import { FaCheck, FaRegCopy } from "react-icons/fa";
import { MdRestartAlt } from "react-icons/md";

export default function Results({ people, items, onReset }) {
  const [copied, setCopied] = useState(false);

  const { receipts, transfers, grandTotal } = useMemo(
    () => calculateSplit(people, items),
    [people, items]
  );


  const nameOf = (id) => people.find((p) => p.id === id)?.name ?? "?";

  async function handleCopy() {
    const text = [
      `🧾 Bill total: ${formatMoney(grandTotal)}`,
      "",
      ...(transfers.length
        ? transfers.map((t) => `${nameOf(t.fromId)} → ${nameOf(t.toId)}: ${formatMoney(t.amount)}`)
        : ["Everyone is settled ✓"]),
    ].join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    if (window.confirm("Start over? This will clear all members and expenses.")) onReset();
  }

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


      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          onClick={handleCopy}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-500 px-4 py-2 text-white shadow-md hover:bg-indigo-600"
        >
          {copied ? <FaCheck /> : <FaRegCopy />}
          {copied ? "Copied!" : "Copy summary"}
        </button>
        <button
          onClick={handleReset}
          className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100"
        >
          <MdRestartAlt className="text-lg" />
          Start over
        </button>
      </div>
    </div>
  );
}
