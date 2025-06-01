import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import FormBuilder from "../components/FormBuilder/FormBuilder";
import { addField, clearForm, togglePreviewMode } from "../slices/formBuilderSlice";
import FieldSettingsPanel from "../components/Builder/FieldSettingsPanel";
import { RootState } from "../store";
import toast from "react-hot-toast";

export default function BuilderRoute() {

    const dispatch = useDispatch();

    const handleAddText = () => {
        dispatch(
            addField({
                    id: nanoid(),
                    type: "Text",
                    label: "New Text Field",
                    required: false,
            })
        );
        toast("Field Added!",{
            icon: <span style={{ fontSize: "22px", fontWeight: "bold" }}>✅</span>,
        })
    };

    const isPreviewMode = useSelector((state: RootState) => state.formBuilder.isPreviewMode);

    const fields = useSelector((state: RootState) => state.formBuilder.fields);
    const handleExport = () => {
        const datastr = JSON.stringify(fields,null,2)
        const blob = new Blob([datastr],{type:"application/json"})
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "form-config.json";
        link.click();

        URL.revokeObjectURL(url);
    }

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
            <button
                onClick={() =>{
                    dispatch(clearForm())
                    toast("All Fields Deleted", {
                        icon: <span style={{ fontSize: "22px", fontWeight: "bold" }}>❌</span>,
                    });
                    } 
                }
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                >
                Clear All
            </button>
            <button
                onClick={handleExport}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-2"
                >
                Export JSON
            </button>

            
            <div className="flex flex-col sm:flex-row gap-4 p-4">
            <div className="flex-1">
                <FormBuilder />
            </div>
                <FieldSettingsPanel />
            </div>
            <button
                onClick={() => dispatch(togglePreviewMode())}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                {isPreviewMode ? "🔧 Exit Preview" : "👀 Preview Form"}
            </button>
        </div>
    )
}