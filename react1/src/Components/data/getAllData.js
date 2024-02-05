import getFavs from "../fav/getFav";

const getAllData = async (setData, fav, userData, setHeartState, setObtainedData, setFav,
  route, favroute, navigate) => {
    try {
      const response = await fetch(route, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          setData(responseData.data);
          if (!fav && userData) {
              await getFavs(userData.id, favroute, setHeartState);
              setFav(true);
            }
            setObtainedData(true);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  export default getAllData;