import { createContext, ReactNode, useContext, useReducer } from "react"

type Payed = {
  name: string
  selected: boolean
  price: number
}

type FormState = {
  user: { name: string; email: string; number: string }
  duration: "monthly" | "yearly"
  addOns: Payed[]
  plans: Payed[]
  discount: number
}

enum ACTIONS {
  UPDATEFORM,
}

type FormAction = {
  type: ACTIONS
  update: Partial<FormState>
}

type FormContextValue = {
  formInfo: FormState
  upateForm: (update: Partial<FormState>) => void
  mul: number
  suffix: string
}

const FormContext = createContext<FormContextValue | null>(null)

const initializer: FormState = {
  user: { name: "", email: "", number: "" },
  duration: "monthly",
  plans: [
    { name: "arcade", selected: false, price: 9 },
    { name: "advanced", selected: false, price: 12 },
    { name: "pro", selected: false, price: 15 },
  ],
  addOns: [
    { name: "online service", selected: false, price: 1 },
    { name: "large storage", selected: false, price: 2 },
    { name: "customizable profile", selected: false, price: 2 },
  ],
  discount: 16.5
}

export default function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initializer)

  const value: FormContextValue = {
    formInfo: state,
    upateForm: (update) => dispatch({ type: ACTIONS.UPDATEFORM, update }),
    mul: Math.floor(state.duration === "monthly" ? 1 : (12 * (100 - state.discount)) / 100),
    suffix: state.duration === "monthly" ? "mo" : "yr"
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case ACTIONS.UPDATEFORM:
      return { ...state, ...action.update }
    default:
      return state
  }
}

export function useFormInfo() {
  return useContext(FormContext)!
}
