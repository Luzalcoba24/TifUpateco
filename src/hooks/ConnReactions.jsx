export const fetchReactions = async () => {
    const token = localStorage.getItem("authToken");
    const response = await fetch("https://sandbox.academiadevelopers.com/infosphere/reactions/", {
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
        },
    });
    if (!response.ok) {
        throw new Error("Error al obtener las reacciones");
    }
    const data = await response.json();
    return data.results;
};
