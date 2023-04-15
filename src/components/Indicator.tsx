import { useFormStep } from "../providers/StepProvider"

export default function Indicator() {
  const {step} = useFormStep()

  return (
    <div className="indicator">{[1,2,3,4].map(item => <div key={item} className={item === step || (step === 5 && item === 4)? "active" : ""}>{item}</div>)}</div>
  )
}
