import { useDispatch, useSelector } from "react-redux";
import { deleteField, selectField, updateField } from "../../slices/formBuilderSlice";
import { RootState } from "../../store";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
//import { useEffect, useRef } from "react";


export default function FieldSettingsPanel(){
    const dispatch = useDispatch();
    const labelInputRef = useRef<HTMLInputElement>(null);
    //const PanelRef = useRef<HTMLDivElement>(null);

    const selectedFieldId = useSelector((state: RootState)=>state.formBuilder.selectedFieldId)
    
    const field = useSelector((state: RootState) => state.formBuilder.fields.find((f)=> f.id === selectedFieldId))

    useEffect(()=>{
        if(labelInputRef.current){
            labelInputRef.current.focus()
        }
    },[field?.id])

    if(!field) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value, type } = target;
        const updatedValue = type === "checkbox" ? (target as HTMLInputElement).checked : value;

        dispatch(updateField({ id: field.id, updated: { [name]: updatedValue } }));
        
    }

  

    const handleDelete = () => {
        dispatch(deleteField(field.id))
        dispatch(selectField(null))
        //toast.success("Field Deleted")
        toast("Field deleted!", {
            icon: <span style={{ fontSize: "22px", fontWeight: "bold" }}>🗑️</span>,
        });
    }

    return (
        <div className="max-h-[80vh] overflow-y-auto p-4 bg-gray-200 rounded">
            <h2 className="text-lg font-bold mb-4">Field Settings</h2>

            <label className="block mb-2">
                <span className="text-sm font-medium">Label</span>
                <input
                    ref={labelInputRef}
                    type="Text"
                    name="label"
                    value={field.label}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            </label>

            <label className="block mb-2">
                <span className="text-sm font-medium">Type</span>
                <select
                    name="type"
                    value={field.type}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="Text">Text</option>
                    <option value="Email">Email</option>
                    <option value="Number">Number</option>
                </ select>
            </label>
            <label className="block mb-2">
                <span className="text-sm font-medium">Placeholder</span>
                <input
                    type="Text"
                    name="placeholder"
                    value={field.placeholder || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
            </label>
            <label className="block">
                <input
                type="checkbox"
                name="required"
                checked={field.required}
                onChange={handleChange}
                />
                <span className="ml-2 text-sm">Required</span>
            </label>
            
            <button onClick={handleDelete} className="mt-4 text-sm text-red-600 hover:underline">
                Delete Field
            </button>
        </div>
    )
}