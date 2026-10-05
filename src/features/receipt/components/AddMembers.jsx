import { useState } from "react";

import { TbUsersGroup } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { FaArrowsDownToPeople } from "react-icons/fa6";



import EmptyContent from "../../../components/EmptyContent";
import InputWithIcon from "../../../components/InputWithIcon";

export default function AddMembers({ people, AddMember, DeleteMember }) {
    const [newMemberName, setNewMemberName] = useState("");

    function handleAddMember(e) {
        e.preventDefault();
        if (newMemberName.trim() !== "") {
            AddMember(newMemberName);
            setNewMemberName("");
        }
    }
    return (
        <div className="grid grid-cols-1 gap-4">
            <p className="text-lg">
                <TbUsersGroup className="inline-block mr-2 bg-indigo-100 text-indigo-700  p-1 rounded-md" />
                <span className="font-semibold">Add Members</span>
            </p>

            <form onSubmit={handleAddMember} className="flex items-center gap-2">
                <InputWithIcon
                    icon={<FaUserAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                    value={newMemberName}
                    onchange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Enter member name"
                />

                <button className="flex items-center gap-2 ml-2 rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600" type="submit">
                    <MdAdd className="inline-block mr-2" />
                    Add
                </button>
            </form>

            {people.length === 0 ? <EmptyContent><FaArrowsDownToPeople className="text-[70px]"/>Start adding members to the receipt.</EmptyContent> : <div className="flex gap-2 mt-4 flex-wrap">{people.map((person) => (
                <div key={person.id} className="flex items-center gap-2 bg-indigo-100 p-2 rounded-md border-2 border-indigo-300">
                    <span>{person.name}</span>
                    <button className="text-red-500 hover:text-red-700" onClick={() => DeleteMember(person.id)}>
                        <IoCloseCircle className="inline-block" />
                    </button>
                </div>
            ))}</div>}
        </div>
    )
}
