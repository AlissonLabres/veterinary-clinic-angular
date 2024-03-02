const getCurrentDate = () => {
  const date = new Date();
  const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return `${date.getFullYear()}-${month}-${day}T16:00`;
}

export const createBulletsSuccess = {
  status: 200,
  json: {
    bullets: [
      {
        id: 1,
        code: `${getCurrentDate()}`,
      }
    ]
  }
};

export const createScheduleSuccess = {
  status: 201,
  json: {
    schedule_id: 1,
    schedule_status: "SCHEDULED",
    type_service: "APPOINTMENT"
  }
};
