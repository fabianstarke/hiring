import { createContext, useState } from 'react'

interface FromAndLimitContextProps {
    fromAndLimit: {
        from: number;
        limit: number;
        max: number;
    };
    setFromAndLimit: (fromAndLimit: {
        from: number;
        limit: number;
        max: number;
    }) => void;
}
export const FromAndLimitContext = createContext<FromAndLimitContextProps>({} as FromAndLimitContextProps)

export const CountryProvider = (children: any) => {

    const [fromAndLimit, setFromAndLimit] = useState<{
        from: number;
        limit: number;
        max: number;
    }>({ from: 0, limit: 50, max: 500 })

    return (
       <FromAndLimitContext.Provider value={{ fromAndLimit, setFromAndLimit}}>
              {children}
         </FromAndLimitContext.Provider>
)}