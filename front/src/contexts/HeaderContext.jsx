import { createContext, useContext, useState } from 'react';

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
    const [headerStyle, setHeaderStyle] = useState({});
        
    return (
        <HeaderContext.Provider value={{ 
            headerStyle, 
            setHeaderStyle 
        }}>
            {children}
        </HeaderContext.Provider>
    );
}

export const useHeader = () => {
    const context = useContext(HeaderContext);
    
    if (!context) {
        throw new Error('useHeader must be used within a HeaderProvider');
    }
    
    return context;
};