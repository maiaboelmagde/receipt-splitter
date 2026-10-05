import { useState } from "react";
import EmptyContent from "../../components/EmptyContent";
import Stepper from "./components/Stepper";

import AddMembers from "./components/AddMembers";
import AddExpenses from "./components/AddExpenses";

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
    const newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
  }

  function handleAddItem(item) {
  setItems([...items, { id: crypto.randomUUID(), ...item }]);
}
function handleDeleteItem(id) {
  setItems(items.filter((i) => i.id !== id));
}

  return (
    <div className="flex h-screen items-center justify-center">
        <div className="w-[70%] rounded-md border-2 border-gray-300 p-4 shadow-md grid grid-cols-1 gap-4">
          <Stepper currentStep={step} setStep={setStep} >
          
          {step === 1 && (
            <AddMembers people={people} AddMember={handleAddMember} DeleteMember={handleDeleteMember} />
          )}
          {step === 2 && (
              <AddExpenses people={people} items={items} AddItem={handleAddItem} DeleteItem={handleDeleteItem} />
          )}
          {step === 3 && (
            <div className="text-center">
             Result Part
            </div>
          )}
          </Stepper>
        </div>
      </div>
  )
}
