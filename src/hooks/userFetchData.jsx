export const userFetchData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        throw new Error("Token de autenticación no encontrado");
    }

    const response = await fetch('https://sandbox.academiadevelopers.com/users/profiles/profile_data/', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`, 
        },
    });

    if (!response.ok) {
        throw new Error(`Error al obtener datos del perfil: ${response.statusText}`);
    }

    return await response.json();
};
