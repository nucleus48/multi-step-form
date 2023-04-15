import React, { useState } from "react"
import { useFormInfo } from "../providers/FormProvider"
import { Footer } from "./Form"

export default function Plans() {
  const { plans } = useFormInfo().formInfo
  return (
    <>
      <div className="form">
        <h1>Select your plan</h1>
        <p>You have the option of monthly or yearly billing.</p>
        {["arcade", "advanced", "pro"].map((item, index) => (
          <Plan key={index} index={index} type={item} />
        ))}
        <ToggleDur />
      </div>
      <Footer validate={() => plans.some((plan) => plan.selected)} />
    </>
  )
}

function Plan({ index, type }: { index: number; type: string }) {
  const { formInfo, upateForm, suffix,mul } = useFormInfo()
  const { plans } = formInfo

  const handleClick = () =>
    upateForm({
      plans: plans.map((item) => {
        if (item.name === type) {
          return { ...item, selected: true }
        }
        return { ...item, selected: false }
      }),
    })

  return (
    <div
      onClick={handleClick}
      className={`plan ${plans[index].selected ? "selected" : ""}`}
    >
      <img src={`./images/icon-${type}.svg`} />
      <div>
        <h2>{type}</h2>
        <div>${plans[index].price * mul}/{suffix}</div>
      </div>
    </div>
  )
}

function ToggleDur() {
  const { upateForm, formInfo } = useFormInfo()
  const [value, setValue] = useState(formInfo.duration === "monthly" ? 0 : 1)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let num = parseInt(e.target.value)
    upateForm({ duration: num === 0 ? "monthly" : "yearly" })
    setValue(num)
  }

  return (
    <div className={"duration"}>
      <div>monthly</div>
      <input
        type="range"
        min={0}
        max={1}
        value={value}
        onChange={handleChange}
      />
      <div>yearly</div>
    </div>
  )
}
