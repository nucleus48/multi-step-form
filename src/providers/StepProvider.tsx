import { createContext, ReactNode, useContext, useState } from "react"

type FormContexValue = {
  step: number
  prevStep: () => void
  nextStep: () => void
  gotoPlans: () => void
}

const FormStepContext = createContext<FormContexValue|null>(null)

export default function StepProvider({children}:{children:ReactNode}) {
  const [step, setStep] = useState<number>(1)
  const value: FormContexValue = {
    step,
    prevStep: () => setStep(prev => prev - 1),
    nextStep: () => setStep(prev => prev + 1),
    gotoPlans: () => setStep(2)
  }
  return <FormStepContext.Provider value={value}>{children}</FormStepContext.Provider>
}

export function useFormStep() {
  return useContext(FormStepContext)!
}
