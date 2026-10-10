import { TbUsersGroup } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaReceipt } from "react-icons/fa";

const steps = [
  { icon: TbUsersGroup, title: "Add people", text: "Enter the names of everyone at the table." },
  {
    icon: MdOutlineShoppingCart,
    title: "Add expenses",
    text: "For each item set the price, who shares it, and who paid.",
  },
  { icon: FaReceipt, title: "Get the result", text: "See each receipt and who pays whom." },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-2xl font-bold">How it works</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className="rounded-xl border-2 border-gray-200 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-xl text-white">
                <Icon />
              </div>
              <p className="mt-4 text-sm font-medium text-indigo-500">Step {index + 1}</p>
              <h3 className="mt-1 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
