import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

const steps = ["People", "Expenses", "Results"];

export default function Stepper({ currentStep, setStep, canProceed = true, hint, children }) {
    const isLastStep = currentStep === steps.length;

    return (
        <>
            {/* Steps header */}
            <div className="flex items-start">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber <= currentStep;
                    const isCompleted = stepNumber < currentStep;

                    return (
                        <div key={step} className="flex flex-1 items-start">
                            {index > 0 && (
                                <div className={`mt-6 h-0.5 flex-1 transition-colors ${isActive ? "bg-indigo-500" : "bg-gray-200"}`} />
                            )}

                            <div className="flex flex-col items-center px-2">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors
                                    ${isActive
                                            ? "bg-indigo-500 text-white"
                                            : "border-2 border-gray-200 bg-white text-gray-400"
                                        }`}
                                >
                                    {isCompleted ? <FaCheck /> : stepNumber}
                                </div>
                                <span className={`mt-2 text-sm ${isActive ? "text-indigo-500" : "text-gray-400"}`}>
                                    {step}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`mt-6 h-0.5 flex-1 transition-colors ${stepNumber<currentStep ? "bg-indigo-500" : "bg-gray-200"}`} />
                            )}
                        </div>
                    );
                })}
            </div>

            {children}

            {/* Why Next is disabled */}
            {!canProceed && hint && (
                <p className="mt-4 text-center text-sm text-amber-600">{hint}</p>
            )}

            {/* Navigation */}
            <div className="flex gap-2">
                {currentStep > 1 && (
                    <button
                        className="mt-4 w-full rounded-md bg-gray-500 px-4 py-2 text-white shadow-md hover:bg-gray-600"
                        onClick={() => setStep(currentStep - 1)}
                    >
                        <IoMdArrowRoundBack className="mr-2 inline" /> Back
                    </button>
                )}

                {!isLastStep && (
                    <button
                        disabled={!canProceed}
                        className="mt-4 w-full rounded-md bg-emerald-500 px-4 py-2 text-white shadow-md hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-emerald-500"
                        onClick={() => setStep(currentStep + 1)}
                    >
                        Next <IoMdArrowRoundBack className="ml-2 inline rotate-180" />
                    </button>
                )}
            </div>
        </>
    );
}
