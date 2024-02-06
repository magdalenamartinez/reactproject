import getRoutesAndNavigation from "./routes";
const updateData = async(formData, table, navigate, userData, updateUser) => {
    const { route, navigation } = getRoutesAndNavigation(table);
    try {
        const response = await fetch(route, {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
                    let updatedUserData;
                    if (responseData.dataNew === null || responseData.dataNew === '') {
                        updatedUserData = { ...userData, image: null };
                    } else {
                        updatedUserData = { ...userData, image: dataNew };
                    }
                    updateUser(updatedUserData);
                navigate(navigation);
            } else {
                document.getElementById("messageError").classList.remove('hidden');
            }
        }
            
        } catch (error) {
            document.getElementById("messageError").classList.remove('hidden');
            console.error("Se ha producido un error: ", error);
        }

}

export default updateData;

