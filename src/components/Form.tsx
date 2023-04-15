import { useEffect } from "react"
import { useFormInfo } from "../providers/FormProvider"
import { useFormStep } from "../providers/StepProvider"
import AddOns from "./AddOns"
import Finishing from "./Finishing"
import PersonalInfo from "./PersonalInfo"
import Plans from "./Plans"
import Thanks from "./Thanks"

export default function Form() {
  const {step} = useFormStep()
  const FormSteps: Record<number, JSX.Element> = {
    1: <PersonalInfo />,
    2: <Plans />,
    3: <AddOns />,
    4: <Finishing />,
    5: <Thanks />
  }
  return FormSteps[step]
}

export function Footer({ validate }: { validate: () => boolean }) {
  const { step, prevStep, nextStep } = useFormStep()

  useEffect(() => {
    if(step === 5) {
    postFormInfo()
    }
  }, [step])

  return (
    <div className="footer">
      {step > 1 && <div onClick={prevStep}>Go Back</div>}
      <div onClick={() => validate() && nextStep()}>
        {step < 4 ? "Next Step" : "Confirm"}
      </div>
    </div>
  )
}

function postFormInfo() {
  const formInfo = useFormInfo().formInfo

  fetch("http://localhost:300/user", {
    method: "POST",
    body: JSON.stringify(formInfo)
  })
  return true
}
