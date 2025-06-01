import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addStep, goToNextStep, goToPreviousStep, setCurrentStepIndex } from "../../slices/formBuilderSlice";


export default function StepNavigation(){
    const dispatch = useDispatch();
    const {steps, currentStepIndex} = useSelector((state: RootState)=> state.formBuilder)

    const handleStepClick = (index: number) => {
        dispatch(setCurrentStepIndex(index))
    }

    const handleAddStep = () => {
        dispatch(addStep())
    }

    return (
        <>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
                {steps.map((step,index) => (
                    <button 
                        key = {step.id}
                        onClick={() => handleStepClick(index)}
                        className={`px-4 py-2 rounded border ${
                        index === currentStepIndex
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    >
                        {step.title}
                    </button>
                ))}
                <button
                    onClick={handleAddStep}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    + Add Step
                </button>
            </div>
            <div className="flex space-x-4 mt-4">
                <button
                    onClick={() => dispatch(goToPreviousStep())}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded disabled:opacity-50"
                    disabled={currentStepIndex === 0}
                >
                    Previous
                </button>

                <button
                    onClick={() => dispatch(goToNextStep())}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={currentStepIndex === steps.length - 1}
                >
                    Next
                </button>
            </div>
        </>
        
    )
}