
export const useGetUserInfo = () => {
    const { userName, userPhoto, userID, isAuth } = JSON.parse(localStorage.getItem("auth"));

    return { userName, userPhoto, userID, isAuth };
}

