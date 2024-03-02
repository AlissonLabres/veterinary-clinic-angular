export const listUsersSuccess = {
  status: 200,
  json: [
    {
      user_id: 1,
      user_name: "John Due",
      user_email: "john@email.com",
      user_phone: "11555554444",
      user_animals: []
    },
    {
      user_id: 1,
      user_name: "Jane Due",
      user_email: "jane@email.com",
      user_phone: "11555554445",
      user_animals: []
    },
    {
      user_id: 1,
      user_name: "Jack Due",
      user_email: "jack@email.com",
      user_phone: "11555554446",
      user_animals: []
    },
  ]
}

export const listUsersError = {
  status: 500,
  json: { message: "Internal server error" }
}
