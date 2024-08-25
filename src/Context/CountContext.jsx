
import { createContext, useState } from "react";

export let CountContext = createContext(0)

export default function CountContextProvider(props) {

    const [CartCount, setCartCount] = useState(0)

    return <><CountContext.Provider value={{ CartCount ,setCartCount}}>
        {props.children}
    </CountContext.Provider>
    </>
}