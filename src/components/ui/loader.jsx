import { Loader2 } from "lucide-react"
import "./loader.css"
export function Loader({ size = "default" }) {

  return (
      <div className="flex justify-center items-center">
        <div className="banter-loader">
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
        </div>
      </div>
  )
}

