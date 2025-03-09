"\"use client"

import { CheckCircle } from "lucide-react"

export function SuccessToast({ message, type }) {
  let bgColor, textColor, iconColor
  switch (type) {
    case "success":
      bgColor = "bg-green-100"
      textColor = "text-green-700"
      iconColor = "text-green-500"
      break
    case "delete":
      bgColor = "bg-red-100"
      textColor = "text-red-700"
      iconColor = "text-red-500"
      break
    default:
      bgColor = "bg-gray-100"
      textColor = "text-gray-700"
      iconColor = "text-gray-500"
  }

  return (
    <div className={`${bgColor} ${textColor} fixed bottom-4 right-4 rounded-md p-4 shadow-lg flex items-center`}>
      <CheckCircle className={`h-5 w-5 mr-2 ${iconColor}`} />
      <span>{message}</span>
    </div>
  )
}

