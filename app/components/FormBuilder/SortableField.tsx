import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FormField } from "../../slices/formBuilderSlice";



type Props = {
    field: FormField
}

export default function SortableField({field}: Props){
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: field.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

  return (
     <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 border rounded mb-2 bg-white shadow cursor-move"
     >
      <div className="font-medium">{field.label || "Untitled Field"}</div>
      <small className="text-gray-500">{field.type}</small>
    </div>
  )
}
