import getRoutesAndNavigation from "./routes";
const updateData = async(formData, table, navigate) => {
    const { route, navigation } = getRoutesAndNavigation(table);
    try {
        const response = await fetch(route, {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
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

