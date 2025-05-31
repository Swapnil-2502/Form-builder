import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { FormField, reorderFields } from "../../slices/formBuilderSlice";
import SortableField from "./SortableField";
import { RootState } from "../../store";


export default function FormBuilder(){
    const dispatch = useDispatch()

    const fields = useSelector((state: RootState) => state.formBuilder.fields);
    console.log("Fields->",fields)
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over } = event
        if(!over || active.id === over.id) return;

        const oldIndex = fields.findIndex((field: FormField) => field.id === active.id);
        const newIndex = fields.findIndex((field: FormField) => field.id === over.id);

        const reordered = arrayMove(fields, oldIndex, newIndex);
        dispatch(reorderFields(reordered));
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={fields.map(field => field.id)}
                strategy={verticalListSortingStrategy}
            >
                {fields.map(field => (
                    <SortableField key={field.id} field={field} />
                ))}
            </SortableContext>

        </DndContext>
    )

}