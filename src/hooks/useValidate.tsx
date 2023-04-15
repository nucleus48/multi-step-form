import { useState } from "react"

const patterns: [name: RegExp, email: RegExp, number: RegExp] = [
  /[a-z]{5,}/i,
  /[a-z0-9]{5,}@[a-z]+/i,
  /\+?([0-9]){8,}/,
]

export default function useValidate(type: "name" | "email" | "number") {
  const [msg, setMsg] = useState("")
  const [cls, setCls] = useState("")
  const validators = patterns.map((pattern) => (value: string) => {
    const bool = pattern.test(value)
    if (value === "") {
      setMsg("this field is required")
    }
    else setMsg("")
    if (!bool || value === "") {
      setCls("invalid")
    }
    else setCls('valid')
    return bool
  })

  switch (type) {
    case "name":
      return [msg, cls, validators[0]] as const
    case "email":
      return [msg, cls, validators[1]] as const
    case "number":
      return [msg, cls, validators[2]] as const
    default:
      throw new TypeError("invalid validator type")
  }
}
