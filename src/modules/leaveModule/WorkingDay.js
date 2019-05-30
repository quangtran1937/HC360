

export const StatusWorkSatDay = {
    None: 5, // Khong lam thu 7
    Mid: 6, // Lam nua ngay thu 7
    FullDay: 7 // Lam full ngay thu 7
}
class WorkingDay {
    constructor(statusWorkSatDay, holidays) {
        this.a = 0
        holidays = holidays || []
        this.statusWorkSatDay = statusWorkSatDay || StatusWorkSatDay.None
        this.holidays = {}
        this._milSecInday = 24 * 60 * 60 * 1000
        const me = this
        holidays.forEach(function (h) {
            me.holidays[h.DateText || '1'] = true
        })
    }
    static getDateString(date) {
        const calculatedDate = date.getDate()
        const calculatedMonth = date.getMonth() + 1
        const calculatedYear = date.getFullYear()
        return `${calculatedDate > 9 ? '' : '0'}${calculatedDate}/${
            calculatedMonth > 9 ? '' : '0'
            }${calculatedMonth}/${calculatedYear}`
    }
    isWorkingDate(date) {
        const d = date.getDay()
        if (d === 0) {
            return false
        }
        if (d === 6 && this.statusWorkSatDay === StatusWorkSatDay.None) {
            return false
        }
        if (this.holidays[WorkingDay.getDateString(date)]) {
            return false
        }
        return true
    }

    getEndDate(startDate, isMidDay, numberDay) {
        const date = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
        )

        // làm sạch dữ liệu
        let count = Math.floor(numberDay * 2) / 2
        // tìm ngày bắt đầu phải là ngày đi làm
        while (!this.isWorkingDate(date)) {
            date.setDate(date.getDate() + 1)
        }
        const kq = {
            endDate: date,
            isMidDay: isMidDay
        }
        while (count > 0.5) {
            // tăng 0.5 ngày
            if (kq.isMidDay) {
                do {
                    date.setDate(date.getDate() + 1)
                } while (!this.isWorkingDate(date))
                kq.isMidDay = false
            } else {
                // nếu là t7
                if (
                    date.getDay() === 6 &&
                    this.statusWorkSatDay === StatusWorkSatDay.Mid
                ) {
                    do {
                        date.setDate(date.getDate() + 1)
                    } while (!this.isWorkingDate(date))
                    kq.isMidDay = false
                }
                kq.isMidDay = true
            }
            count -= 0.5
        }
        kq.endDate = date
        return kq
    }
    getNumberDay(startDate, isMidStartDay, endDate, isMidEndDay) {
        // console.log(startDate, isMidStartDay);
        // console.log(endDate, isMidEndDay);
        let date = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate(),
            isMidStartDay ? 12 : 0,
            0,
            0,
            0
        )
        endDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
            isMidEndDay ? 23 : 11,
            0,
            0,
            0
        )
        // tìm ngày bắt đầu phải là ngày đi làm
        while (!this.isWorkingDate(date)) {
            date.setDate(date.getDate() + 1)
            isMidStartDay = false
        }
        if (date > endDate) {
            return -1
        }
        let number = 0
        if (
            isMidStartDay || // nữa ngày
            (date.getDay() === 6 &&
                this.statusWorkSatDay === StatusWorkSatDay.Mid &&
                isMidStartDay === false) // ngày thứ 7 (có làm nửa ngày)
        ) {
            number = 0.5
            do {
                date.setDate(date.getDate() + 1)
            } while (!this.isWorkingDate(date))
        }
        while (date <= endDate) {
            number +=
                date.getDay() === 6 && this.statusWorkSatDay === StatusWorkSatDay.Mid
                    ? 0.5
                    : 1
            do {
                date.setDate(date.getDate() + 1)
            } while (!this.isWorkingDate(date))
            date = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                0,
                0,
                0,
                0
            )
        }
        // nếu end không phải ngày làm việc => nghĩ đến hết ngày (PM)
        if (!this.isWorkingDate(endDate)) {
            isMidEndDay = true
        }
        if (
            isMidEndDay === false &&
            !(
                endDate.getDay() === 6 && this.statusWorkSatDay === StatusWorkSatDay.Mid
            )
        ) {
            number -= 0.5
        }
        return Math.max(0, number)
    }
}

export default WorkingDay;
