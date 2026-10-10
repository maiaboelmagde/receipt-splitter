import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
      <div>
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
          Free · No sign-up
        </span>
        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
          Split the bill, <span className="text-indigo-500">not the friendship.</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Add your friends, add what everyone ordered, and see exactly who owes whom, even when
          items are shared and several people paid.
        </p>

        <Link
          to="/split"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-3 font-medium text-white shadow-md transition hover:bg-emerald-600"
        >
          Start splitting
          <IoMdArrowRoundBack className="rotate-180" />
        </Link>
      </div>

      {/* Preview card */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-lg md:rotate-2">
        <p className="text-sm text-gray-500">Bill total</p>
        <p className="text-3xl font-bold text-indigo-600">300.00</p>

        <div className="mt-4 space-y-2">
          {[
            ["Ahmed", "50.00"],
            ["Amany", "30.00"],
          ].map(([name, amount]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-lg border-2 border-indigo-200 bg-indigo-50 p-3 text-sm"
            >
              <span className="font-semibold">
                {name} <span className="text-indigo-400">→</span> Kamel
              </span>
              <span className="font-semibold text-indigo-600">{amount}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
