export const getMoods = () => {
  return fetch("http://localhost:8088/moods")
    .then(res => res.json())
};

export const getMoodById = (id) => {
  return fetch(`http://localhost:8088/moods/${id}`)
    .then(res => res.json())
};
