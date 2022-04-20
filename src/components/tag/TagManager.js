export const getTags = () => {
    return fetch("http://localhost:8088/tags")
      .then(res => res.json())
};

export const addEntriesTags = (entryTag) => {
    return fetch("http://localhost:8088/entriesTags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryTag)
        })
};
