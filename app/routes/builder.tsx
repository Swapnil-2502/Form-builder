import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import FormBuilder from "../components/FormBuilder/FormBuilder";
import { addField, clearForm, togglePreviewMode, importFields, loadTemplate } from "../slices/formBuilderSlice";
import FieldSettingsPanel from "../components/Builder/FieldSettingsPanel";
import { RootState } from "../store";
import toast from "react-hot-toast";
import { contactUsTemplate } from "../template/contactUsTemplate"
// import { useEffect } from "react";
// import { saveToLocalStorage } from "../utils/localStorage";
import StepNavigation from "../components/Builder/StepNavigation";

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
        // const currentStepId = steps[currentStepIndex].id;
        // dispatch(linkFieldToStep({ fieldId: newId, stepId: currentStepId }));
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

    const handleImportClick = () => {
        const json = window.prompt("Paste form JSON here:");
        if(!json) return 

        try{
            const parsed = JSON.parse(json);
            if (!Array.isArray(parsed)) throw new Error("Invalid format");
            
            dispatch(importFields(parsed));
            toast("Form imported successfully!", { icon: <span style={{ fontSize: "22px", fontWeight: "bold" }}>✅</span> });
        }
        catch(error){
            console.log(error)
            toast("Invalid JSON. Please try again.", { icon: <span style={{ fontSize: "22px", fontWeight: "bold" }}>❌</span> });
        }
    }

    // useEffect(()=>{
    //     saveToLocalStorage(fields)
    // },[fields])

    return (
        <div className="bg-white text-black dark:bg-gray-900  p-4">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Form Builder</h1>

            <div className="flex flex-wrap gap-2">
                 <button
                onClick={handleAddText}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
                <button
                    className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={handleImportClick}
                    >
                    Import JSON
                </button>
                <button
                    className="ml-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                    onClick={() => {
                        dispatch(loadTemplate(contactUsTemplate))
                        toast("ContactUs Template Loaded", {
                            icon: <span style={{ fontSize: "22px", fontWeight: "bold" }}>📄</span>,
                        })}
                        }
                    >
                    ContactUs Template
                </button>
                
            </div>
            <button
                    onClick={() => dispatch(togglePreviewMode())}
                    className="mt-4 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                    {isPreviewMode ? "🔧 Exit Preview" : "👀 Preview Form"}
            </button>

            <div className="flex flex-col md:flex-row gap-4 mt-2">
                <div className="w-full md:w-2/3">
                    <StepNavigation />
                </div>
                <div className="w-full md:w-2/3">
                    <FormBuilder />
                </div>
                <div className="w-full md:w-1/3">
                    <FieldSettingsPanel />
                </div>
                
            </div>
            
        </div>
    )
}