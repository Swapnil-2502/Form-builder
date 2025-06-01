import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FormField, selectField } from "../../slices/formBuilderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";



type Props = {
    field: FormField
}

export default function SortableField({field}: Props){
    const dispatch = useDispatch();
    const selectedFieldId = useSelector((state: RootState) => state.formBuilder.selectedFieldId);
    const isPreviewMode = useSelector((state: RootState) => state.formBuilder.isPreviewMode);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: field.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        
    };

    const handleClick = () => {
        dispatch(selectField(field.id))
    }

    if (isPreviewMode) {
        return (
            <div className="p-4 border rounded mb-2 bg-gray-50">
            <label className="block font-medium mb-1">{field.label || "Untitled Field"}</label>
            {field.type === "Text" && <input type="Text" placeholder={field.placeholder || ""} className="w-full border px-2 py-1 rounded" />}
            {field.type === "Email" && <input type="Email" placeholder={field.placeholder || ""} className="w-full border px-2 py-1 rounded" />}
            {field.type === "Number" && <input type="Number" placeholder={field.placeholder || ""} className="w-full border px-2 py-1 rounded" />}
            {field.type === "checkbox" && <input type="checkbox" />}
            </div>
        );
    }

    //const isSelected = selectedFieldId === field.id;

  return (
     <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
            handleClick();
            }
        }}
        role="button"
        tabIndex={0}
      className={`p-4 border rounded mb-2 shadow cursor-pointer 
      ${selectedFieldId === field.id ? "bg-blue-100 border-blue-500" : "bg-white"}`}
     >
        <div {...attributes} {...listeners} className="flex justify-between items-center">
            <div className="font-medium">{field.label || "Untitled Field"}</div>
        </div>
        <div>
            <small className="text-gray-500">{field.type}</small>
        </div>
    </div>
  )
}
