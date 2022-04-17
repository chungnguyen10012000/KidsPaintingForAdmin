
export function deleteScheduleItem(deleted) {
    const res = {
        "message": "Delele successful"
    }
    return deleted(res);
}