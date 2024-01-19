import { DateRange, isDateRange } from "react-day-picker"
import { format } from "date-fns"

import instance from ".."
import { ApodType } from "@/types/ApodType"
import { error } from "console"

type ParamsType = {
    date?: string,
    start_date?: string,
    end_date?: string
}

export const apodService = {
    async getPicture(date: Date | DateRange | undefined) {
        const params: ParamsType = {}
        if(isDateRange(date) && date.from && date.to){
            params.start_date = format(new Date(date.from), "yyyy-MM-dd")
            params.end_date = format(new Date(date.to), "yyyy-MM-dd")
        }
        else if(!isDateRange(date) && date){
            params.date = format(new Date(date), "yyyy-MM-dd")
        }
        return instance.get<ApodType>("", {
            params: {...params}
        })
        .then(res => res.data)
    }
}