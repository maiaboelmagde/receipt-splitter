import { FaUsers, FaWallet, FaExchangeAlt, FaLock } from "react-icons/fa";

const features = [
  {
    icon: FaUsers,
    title: "Shared items",
    text: "Split an item between 2, 3 or everyone. The price is divided fairly.",
  },
  {
    icon: FaWallet,
    title: "Multiple payers",
    text: "One bill, several people paid? Enter each amount separately.",
  },
  {
    icon: FaExchangeAlt,
    title: "Fewest transfers",
    text: "We match who owes with who is owed, so there are fewer payments.",
  },
  {
    icon: FaLock,
    title: "Private",
    text: "Everything runs in your browser. Nothing is uploaded or saved on a server.",
  },
];

export default function Features() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-2xl font-bold">Why receipt-splitter?</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 rounded-xl border-2 border-gray-200 bg-white p-5">
              <span className="h-fit rounded-lg bg-emerald-100 p-3 text-emerald-600">
                <Icon />
              </span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
