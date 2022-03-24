import React, { useState, useEffect } from "react";
// import moment from "moment";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DatePicker } from "react-datepicker";

// referennce: https://codesandbox.io/s/bqksq?file=/src/App.js
const PickDate = (props) => {
    // const [startDate, setStartDate] = useState(new Date("2014/02/08"));
    // const [endDate, setEndDate] = useState(new Date("2014/02/10"));
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: "selection",
        },
    ]);
    // const isShowCalendar = false;

    return (
        <div>
            <h1>Select Search Date Range</h1>
            <DateRange
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
            />
        </div>

        // <section>
        //     <DatePicker
        //         selected={startDate}
        //         onChange={(date) => setStartDate(date)}
        //         selectsStart
        //         startDate={startDate}
        //         endDate={endDate}
        //     />
        //     <DatePicker
        //         selected={endDate}
        //         onChange={(date) => setEndDate(date)}
        //         selectsEnd
        //         startDate={startDate}
        //         endDate={endDate}
        //         minDate={startDate}
        //     />
        // </section>
    );
};

export default PickDate;
