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
                if (formData.get('modifiedFields').includes('image')) {
                    let updatedUserData;
                    if (responseData.image === null || responseData.image === '') {
                        updatedUserData = { ...userData, image: null };
                    } else {
                        updatedUserData = { ...userData, image: responseData.image };
                    }
                    updateUser(updatedUserData);
                }
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

