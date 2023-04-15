import { useFormInfo } from "../providers/FormProvider"
import { Footer } from "./Form"

export default function AddOns() {
  return (
    <>
      <div className="form">
        <h1>Pick add-ons</h1>
        <p>Add-ons help enhance your gaming experience.</p>
        {[0, 1, 2].map((index) => (
          <Add key={index} index={index} />
        ))}
      </div>
      <Footer validate={() => true} />
    </>
  )
}

function Add({ index }: { index: number }) {
  const { formInfo, upateForm,suffix,mul } = useFormInfo()
  const { addOns } = formInfo
  const des = [
    "Access to multiplayer games",
    "Extra 1TB of cloud storage",
    "Custom theme on your profile",
  ]
  const handleClick = () =>
    upateForm({
      addOns: addOns.map((item, pos) => {
        if (pos === index) {
          return { ...item, selected: !item.selected }
        }
        return item
      }),
    })

  return (
    <div
      className={`addon ${addOns[index].selected ? "selected" : ""}`}
      onClick={handleClick}
    >
      <div className={`checkbox ${addOns[index].selected && "checked"}`}>
        {addOns[index].selected && <img src="./images/icon-checkmark.svg" />}
      </div>
      <div>
        <h3>{addOns[index].name}</h3>
        <div>{des[index]}</div>
      </div>
      <div>
        +${addOns[index].price * mul}/{suffix}
      </div>
    </div>
  )
}
