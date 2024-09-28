export const listAnimalsSuccess = {
  status: 200,
  json: {
    animals: [
      {
        animal_id: 1,
        animal_name: 'Scott',
        animal_age: 5,
        animal_weight: 5,
        animal_type: 'CAT',
        animal_breed: 'N/A',
      },
    ],
  },
};

export const listAnimalsError = {
  status: 500,
  json: { message: 'Internal server error' },
};
