import { useState } from "react";

import ItemsList from "./ItemsList";
import AddItems from "./AddItems";

export default function AddExpenses({ people, items, AddItem, DeleteItem }) {

    const nameOf = (id) => people.find((p) => p.id === id)?.name ?? "?";

    function handleSubmit(canAdd, name, sharedBy, paid, priceNum) {
        if (!canAdd) return;
        const payments = people
            .map((p) => ({ payerId: p.id, amount: parseFloat(paid[p.id]) || 0 }))
            .filter((p) => p.amount > 0);

        AddItem({ name: name.trim(), price: priceNum, sharedBy, payments });
    }

    return (
        <div className="mt-6">
            <p className="text-lg text-indigo-700 font-semibold">Add Expense</p>

            {/* Form */}
            <AddItems people={people} handleSubmit={handleSubmit} />

            {/* Items list */}
            <ItemsList items={items} nameOf={nameOf} DeleteItem={DeleteItem} />
        </div>
    );
}
