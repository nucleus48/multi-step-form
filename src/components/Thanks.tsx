import { useEffect } from "react"
import { useFormInfo } from "../providers/FormProvider"

export default function Thanks() {
  const {formInfo} = useFormInfo()
  useEffect(() => {
    console.log(formInfo)
  })
  return (
    <div className="done">
      <img src="./images/icon-thank-you.svg" />
      <h1>Thank you!</h1>
      <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com</p>
    </div>
  )
}
