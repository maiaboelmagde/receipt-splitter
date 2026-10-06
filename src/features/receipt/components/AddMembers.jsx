import { useState } from "react";

import { TbUsersGroup } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { FaArrowsDownToPeople } from "react-icons/fa6";

import EmptyContent from "../../../components/EmptyContent";
import InputWithIcon from "../../../components/InputWithIcon";

const MIN_PEOPLE = 2;

export default function AddMembers({ people, AddMember, DeleteMember }) {
    const [newMemberName, setNewMemberName] = useState("");
    const [error, setError] = useState("");

    function handleAddMember(e) {
        e.preventDefault();
        const name = newMemberName.trim();
        if (!name) return;

        const exists = people.some((p) => p.name.toLowerCase() === name.toLowerCase());
        if (exists) {
            setError("This name is already added");
            return;
        }

        AddMember(name);
        setNewMemberName("");
        setError("");
    }

    const remaining = Math.max(MIN_PEOPLE - people.length, 0);

    return (
        <div className="mt-6 grid grid-cols-1 gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-indigo-100 p-2 text-xl text-indigo-700">
                        <TbUsersGroup />
                    </span>
                    <div>
                        <p className="text-lg font-semibold leading-tight">Who's splitting the bill?</p>
                        <p className="text-sm text-gray-500">Add everyone who shares this receipt</p>
                    </div>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                        remaining === 0 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}
                >
                    {people.length} {people.length === 1 ? "member" : "members"}
                </span>
            </div>

            {/* Form */}
            <div>
                <form onSubmit={handleAddMember} className="flex items-center gap-2">
                    <InputWithIcon
                        icon={<FaUserAlt className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />}
                        value={newMemberName}
                        onchange={(e) => {
                            setNewMemberName(e.target.value);
                            setError("");
                        }}
                        placeholder="Enter member name"
                    />

                    <button
                        type="submit"
                        disabled={!newMemberName.trim()}
                        className="flex items-center gap-1 rounded-md bg-indigo-500 px-4 py-2 text-white shadow-sm hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <MdAdd className="text-lg" />
                        Add
                    </button>
                </form>
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            {/* Members */}
            {people.length === 0 ? (
                <EmptyContent>
                    <FaArrowsDownToPeople className="text-[70px]" />
                    Start adding members to the receipt.
                </EmptyContent>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {people.map((person) => (
                        <div
                            key={person.id}
                            className="flex items-center gap-2 rounded-full border-2 border-indigo-200 bg-indigo-50 py-1 pl-1 pr-3"
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold uppercase text-white">
                                {person.name.charAt(0)}
                            </span>
                            <span className="text-gray-700">{person.name}</span>
                            <button
                                type="button"
                                aria-label={`Remove ${person.name}`}
                                className="text-gray-400 hover:text-red-500"
                                onClick={() => DeleteMember(person.id)}
                            >
                                <IoCloseCircle className="text-lg" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Minimum members hint */}
            {people.length > 0 && remaining > 0 && (
                <p className="text-sm text-amber-600">
                    Add {remaining} more {remaining === 1 ? "member" : "members"} to continue
                </p>
            )}
        </div>
    );
}
