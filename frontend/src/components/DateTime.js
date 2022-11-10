function DateBuilder (d) {

    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year= d.getFullYear();

    return (
        <div className="date">{day}, {date} {month} {year}</div>
    );
}

export default DateBuilder;