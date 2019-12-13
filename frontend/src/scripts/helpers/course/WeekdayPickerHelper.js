export function parseWeekdays(serializedWeekdays) {
    const weekdaysMap = {
        0: "Sundays",
        1: "Mondays",
        2: "Tuesdays",
        3: "Wednesdays",
        4: "Thursdays",
        5: "Fridays",
        6: "Saturdays"
    };

    const days = serializedWeekdays.split('').reverse().map((flag, index) => {
        return flag === '1' ? weekdaysMap[index] : "";
    }).filter(Boolean);

    return days.join(", ");
}