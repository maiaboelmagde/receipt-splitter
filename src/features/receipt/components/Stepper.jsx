import { IoMdArrowRoundBack } from "react-icons/io";

const steps = [
    "People",
    "Expenses",
    "Results",
];

export default function Stepper({ currentStep, setStep, children }) {
    return (
        <>
            <div className=" flex ">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber <= currentStep;
                    const isCompleted = stepNumber < currentStep;

                    return (
                        <div key={step} className="flex flex-1 items-start ">
                            {index > 0 && (
                                <div className={`mt-6 h-px flex-1 ${currentStep - 1 >= index ? "bg-indigo-500" : "bg-gray-200"}`} />
                            )}
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl
                  ${isActive
                                            ? "bg-indigo-500 text-white"
                                            : "border-2 border-gray-200 bg-white text-gray-400"
                                        }`}
                                >
                                    {stepNumber}
                                </div>

                                <span
                                    className={`mt-2 text-sm ${isActive
                                        ? "text-indigo-500"
                                        : "text-gray-400"
                                        }`}
                                >
                                    {step}
                                </span>
                            </div>

                            {index < steps.length - 1 && (
                                <div className={`mt-6 h-px flex-1 ${currentStep - 1 > index ? "bg-indigo-500" : "bg-gray-200"}`} />
                            )}
                        </div>
                    );
                })}
            </div>
            {children}
            <div className="flex gap-2">
                <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 shadow-md mt-4 w-full" onClick={() => { setStep(currentStep + 1) }}>
                    Next <IoMdArrowRoundBack className="inline ml-2 rotate-180" />
                </button>
                {currentStep > 1 && (
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 shadow-md mt-4 w-full" onClick={() => { setStep(currentStep - 1) }}>
                        <IoMdArrowRoundBack className="inline mr-2" /> Back
                    </button>
                )}

            </div>
        </>
    );
}
