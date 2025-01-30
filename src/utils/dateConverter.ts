export const jsonToDate = (jsonDate: string): Date => {
    return new Date(jsonDate);
};

export const formatDateToString = (date: Date | string): string => {
    let dateTarget : Date
    if(typeof date === "string") {
        dateTarget = new Date(date)
    } else {
        dateTarget = date
    }

    return dateTarget.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
};

export const formatDuration = (seconds: number): string => {
    if (seconds <= 0) return "0 s";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return [
        hours > 0 ? `${hours} h` : "",
        minutes > 0 ? `${minutes} m` : "",
        remainingSeconds > 0 ? `${remainingSeconds} s` : ""
    ].filter(Boolean).join(" ");
};