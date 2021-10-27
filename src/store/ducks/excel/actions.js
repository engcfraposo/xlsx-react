import { action } from "typesafe-actions"
import { ExcelTypes } from "./types"

export const getExcel = (excel) => {
    return action(ExcelTypes.GET_EXCEL, excel)
}
