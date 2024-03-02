export const createUserError = {
  status: 500,
  json: {
    message: "Internal server error"
  }
}

export const createUserSuccess = {
  status: 201,
  json: {
    user_name: "John Doe",
    user_email: "email@email.com.br",
    user_phone: "11555554444",
    user_id: 1
  }
}

