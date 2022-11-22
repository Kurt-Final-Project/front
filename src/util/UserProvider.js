import React, { useContext, useState } from "react";
const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const token = localStorage.getItem("access_token");
    const [access_token, setToken] = useState(token);

    function loginUser(mytoken) {
        setToken(mytoken);
    }

    function logoutUser() {
        localStorage.removeItem("access_token");
    }

    return (
        <UserContext.Provider
            value={{
                access_token,
                loginUser,
                logoutUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
