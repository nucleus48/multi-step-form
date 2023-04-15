import { useEffect, useState } from "react"
import useValidate from "../hooks/useValidate"
import { useFormInfo } from "../providers/FormProvider"
import { Footer } from "./Form"

type InputBoxProps = {
  type: "name" | "email" | "number"
  index: number
  getValue: (value: string, index: number) => void
  getValidator: (value: (value: string) => boolean, index: number) => void
}

export default function PersonalInfo() {
  const [validators, setValidators] = useState<((value: string) => boolean)[]>(
    []
  )
  const [values, setValues] = useState<string[]>([])
  const getValue = (value: string, index: number) =>
    setValues((prevValues) => {
      let newValues = [...prevValues]
      newValues[index] = value
      return newValues
    })
  const getValidator = (value: (value: string) => boolean, index: number) =>
    setValidators((prev) => {
      let newValidators = [...prev]
      newValidators[index] = value
      return newValidators
    })
  const types = ["name", "email", "number"] as const

  return (
    <>
      <div className="form">
        <h1>Personal info</h1>
        <p>Please provide your name, email address, and phone number.</p>
        {types.map((item, index) => (
          <InputBox
            key={item}
            type={item}
            index={index}
            getValue={getValue}
            getValidator={getValidator}
          />
        ))}
      </div>
      <Footer
        validate={() =>
          validators.map((valid, index) => valid(values[index])).every(Boolean)
        }
      />
    </>
  )
}

function InputBox({ type, index, getValue, getValidator }: InputBoxProps) {
  const [msg, cls, validate] = useValidate(type)
  const { upateForm, formInfo } = useFormInfo()
  const info = formInfo.user[type]
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    getValue(e.target.value, index)
    upateForm({ user: { ...formInfo.user, [type]: e.target.value } })
  }
  const placeholders = [
    "e.g. Nucleus Erumagborie",
    "e.g. nucleuserumagborie@gmail.com",
    "e.g. +2347049695246",
  ]

  useEffect(() => {
    getValidator(validate, index)
    getValue(info, index)
  }, [])

  return (
    <div className="input-box">
      <div>
        <label htmlFor={type}>
          {type === "number" && "phone"} {type}
        </label>
        <div>{msg}</div>
      </div>
      <input
        type={type}
        value={info}
        name={type}
        onChange={handleChange}
        className={cls}
        placeholder={placeholders[index]}
      />
    </div>
  )
}
