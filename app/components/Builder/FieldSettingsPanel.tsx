import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../slices/formBuilderSlice";
import { RootState } from "../../store";
//import { useEffect, useRef } from "react";


export default function FieldSettingsPanel(){
    const dispatch = useDispatch();
    //const PanelRef = useRef<HTMLDivElement>(null);

    const selectedFieldId = useSelector((state: RootState)=>state.formBuilder.selectedFieldId)
    
    const field = useSelector((state: RootState) => state.formBuilder.fields.find((f)=> f.id === selectedFieldId))

    // useEffect(()=>{

    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (PanelRef.current && !  !PanelRef.current.contains(event.target as Node)){
    //             dispatch(selectField(null))
    //         }
    //     }

    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => document.removeEventListener("mousedown", handleClickOutside);

    // },[dispatch])

    if(!field) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value, type } = target;
        const updatedValue = type === "checkbox" ? (target as HTMLInputElement).checked : value;

        dispatch(updateField({ id: field.id, updated: { [name]: updatedValue } }));
        
    }

    return (
        <div className="p-4 border rounded shadow bg-white w-full sm:w-80">
            <h2 className="text-lg font-bold mb-4">Field Settings</h2>

            <label className="block mb-2">
                <span className="text-sm font-medium">Label</span>
                <input
                    type="text"
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

             <label className="block">
                <input
                type="checkbox"
                name="required"
                checked={field.required}
                onChange={handleChange}
                />
                <span className="ml-2 text-sm">Required</span>
            </label>
        </div>
    )
}