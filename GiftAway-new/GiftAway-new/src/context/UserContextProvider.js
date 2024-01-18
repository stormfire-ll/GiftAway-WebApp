import React, { useState } from "react";
import userContext from "./UserContext";




const userContextProvider = ({ children }) => {
    const [consumerId, removeConsumerId] = useState(null)

    return (
        <userContext.Provider value={{ consumerId, removeConsumerId }}>{children}</userContext.Provider>
    )
}

export default userContextProvider