import Form from "./components/Form"
import Indicator from "./components/Indicator"
import FormProvider from "./providers/FormProvider"
import StepProvider from "./providers/StepProvider"

export default function App() {
  return (
    <div className="container">
      <StepProvider>
        <Indicator />
        <FormProvider>
          <Form />
        </FormProvider>
      </StepProvider>
    </div>
  )
}
