export function formatDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = monthNames[date.getMonth()]
    const day = date.getDate()
    const year = date.getYear()
        .toString()
        .slice(1)

    return `${month} ${day}, 20${year}`
}