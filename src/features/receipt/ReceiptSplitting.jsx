import { useState } from "react";
import EmptyContent from "../../components/EmptyContent";
import Stepper from "./components/Stepper";

import AddMembers from "./components/AddMembers";
import AddExpenses from "./components/expenses/AddExpenses";
import Results from "./components/results/Results";


export default function ReceiptSplitting() {

  const [people, setPeople] = useState([]); //{id: ,name: }
  const [items, setItems] = useState([]); //{ id, name, price, sharedBy: [personId...], payments: [{ payerId, amount }] }

  const [step, setStep] = useState(1); // 1: add members, 2: add items, 3: show result

  function handleAddMember(name) {
    const newMember = {
      id: people.length + 1,
      name: name,
    };
    setPeople([...people, newMember]);
  }

  function handleDeleteMember(id) {
    setPeople(people.filter((p) => p.id !== id));
    // remove expenses involving this person so the totals stay correct
    setItems(
      items.filter(
        (item) => !item.sharedBy.includes(id) && !item.payments.some((p) => p.payerId === id)
      )
    );
  }

  function handleAddItem(item) {
    setItems([...items, { id: crypto.randomUUID(), ...item }]);
  }
  function handleDeleteItem(id) {
    setItems(items.filter((i) => i.id !== id));
  }


  const MIN_PEOPLE = 2;

  const canProceed =
    (step === 1 && people.length >= MIN_PEOPLE) ||
    (step === 2 && items.length >= 1);

  const hint =
    step === 1
      ? `Add at least ${MIN_PEOPLE} members to continue`
      : step === 2
        ? "Add at least one expense to continue"
        : "";


  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="md:w-[90%] lg:w-[80%] rounded-md border-2 border-gray-300 p-4 shadow-md grid grid-cols-1 gap-4">
        <Stepper currentStep={step} setStep={setStep} canProceed={canProceed} hint={hint}>

          {step === 1 && (
            <AddMembers people={people} AddMember={handleAddMember} DeleteMember={handleDeleteMember} />
          )}
          {step === 2 && (
            <AddExpenses people={people} items={items} AddItem={handleAddItem} DeleteItem={handleDeleteItem} />
          )}
          {step === 3 && (
            <Results people={people} items={items} />
          )}
        </Stepper>
      </div>
    </div>
  )
}
