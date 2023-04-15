import { useFormInfo } from "../providers/FormProvider"
import { useFormStep } from "../providers/StepProvider"
import { Footer } from "./Form"

export default function Finishing() {
  const {mul,suffix,formInfo} = useFormInfo()
  const { addOns, plans, duration} = formInfo
  const {gotoPlans} = useFormStep()

  return (
    <>
      <div className="form">
        <h1>Finishing up</h1>
        <p>Double-check everything looks OK before cofirming.</p>
        <div className="picked">
          <div>
            {plans.map(
              (item, index) =>
                item.selected && (
                  <div key={index}>
                    <div>
                      <div>
                        {item.name}({duration})
                      </div>
                      <span onClick={gotoPlans}>Change</span>
                    </div>
                    <div>${item.price * mul}/{suffix}</div>
                  </div>
                )
            )}
          </div>
          <div>
            {addOns.map(
              (item, index) =>
                item.selected && (
                  <div key={index}>
                    <div>{item.name}</div>
                    <div>+${item.price * mul}/{suffix}</div>
                  </div>
                )
            )}
          </div>
        </div>
        <div>
          Total (per {duration.slice(0, -2)})
          <span>
            +${(plans.reduce((c, n) => (n.selected ? n.price + c : c), 0) +
              addOns.reduce((c, n) => (n.selected ? n.price + c : c), 0)) * mul}/{suffix}
          </span>
        </div>
      </div>
      <Footer validate={() => true} />
    </>
  )
}
