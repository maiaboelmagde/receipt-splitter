import React from 'react'
import { MdContentPasteOff } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import EmptyContent from '../../../../components/EmptyContent';

export default function ItemsList({items, nameOf, DeleteItem}) {
    return (
        <div className="mt-4 space-y-2">
            {items.length === 0 ? (
                <EmptyContent>
                    <MdContentPasteOff className="text-[70px]" />
                    <p className="mt-2 text-center text-gray-500">No items added yet</p>
                </EmptyContent>
            ) : (
                <>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-start justify-between rounded-lg border-2 border-green-300 bg-green-100 p-3"
                        >
                            <div>
                                <p className="font-semibold">
                                    {item.name} — ${item.price}
                                </p>
                                <p className="text-xs text-gray-600">
                                    {
                                        console.log(`item.sharedBy: ${item.sharedBy}`)}
                                    {console.log(   `item :  ${JSON.stringify(item)}`)}
                                    Split: {item.sharedBy.map((id) => nameOf(id)).join(", ")}
                                    
                               </p>
                                <p className="text-xs text-gray-600">
                                    Paid: {item.payments.map((p) => `${nameOf(p.payerId)} ${p.amount}`).join(" · ")}
                                </p>
                            </div>
                            <button className="text-red-500 hover:text-red-700" onClick={() => DeleteItem(item.id)}>
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}
