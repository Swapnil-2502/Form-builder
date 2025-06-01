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
import { setFields, updateStepFieldIds } from "../../slices/formBuilderSlice";
import SortableField from "./SortableField";
import { RootState } from "../../store";
import { useEffect } from "react";
import { saveToLocalStorage } from "../../utils/localStorage";


export default function FormBuilder(){
    const dispatch = useDispatch()

    const {fields, steps, currentStepIndex} = useSelector((state: RootState) => state.formBuilder);
    const currentStep = steps[currentStepIndex]

    const currentStepFields = fields.filter(field =>
        currentStep?.fieldIds.includes(field.id)
    );
    
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over } = event
        if(!over || active.id === over.id) return;

        const currentStep = steps[currentStepIndex];
        const oldIndex = currentStep.fieldIds.findIndex(id => id === active.id);
        const newIndex = currentStep.fieldIds.findIndex(id => id === over.id);

        if(oldIndex === -1 || newIndex === -1) return;

        const reorderedFieldIds = arrayMove(currentStep.fieldIds, oldIndex, newIndex);

        const updatedSteps = [...steps]
        updatedSteps[currentStepIndex] = {
            ...currentStep,
            fieldIds: reorderedFieldIds
        }

        const reorderedFields = [...fields];
        const fieldMap = new Map(fields.map(f => [f.id, f]));

        const reorderedStepFields = reorderedFieldIds.map(id => fieldMap.get(id)!);

        const nonStepFields = reorderedFields.filter(f => !currentStep.fieldIds.includes(f.id));
        const finalFields = [...nonStepFields, ...reorderedStepFields];

        dispatch(setFields(finalFields));  
        dispatch(updateStepFieldIds(updatedSteps));
    }

    useEffect(() => {
        saveToLocalStorage(fields, steps, currentStepIndex);
    }, [fields, steps, currentStepIndex]);

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={currentStepFields.map(field => field.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {currentStepFields.map(field => (
                        <SortableField key={field.id} field={field} />
                    ))}
                </SortableContext>

            </DndContext>
        </>
    )

}