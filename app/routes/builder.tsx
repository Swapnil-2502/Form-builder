import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import FormBuilder from "../components/FormBuilder/FormBuilder";
import { addField } from "../slices/formBuilderSlice";

export default function BuilderRoute() {

    const dispatch = useDispatch();

    const handleAddText = () => {
        dispatch(
            addField({
                    id: nanoid(),
                    type: "text",
                    label: "New Text Field",
                    required: false,
            })
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-4">Form Builder</h1>

            {/* toolbar */}
            <button
                onClick={handleAddText}
                className="mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
                + Add Text Field
            </button>

            {/* drag-and-drop list */}
            <FormBuilder />
        </div>
    )
}