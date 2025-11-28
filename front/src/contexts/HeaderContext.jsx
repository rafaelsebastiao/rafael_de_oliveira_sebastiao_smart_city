import { createContext, useContext, useState } from 'react';

const FooterContext = createContext();

export function FooterProvider({ children }) {
    const [footerStyle, setFooterStyle] = useState({});
    
    console.log('FooterProvider criado'); // Debug
    
    return (
        <FooterContext.Provider value={{ 
            footerStyle, 
            setFooterStyle 
        }}>
            {children}
        </FooterContext.Provider>
    );
}

export const useFooter = () => {
    const context = useContext(FooterContext);
    
    if (!context) {
        throw new Error('useFooter must be used within a FooterProvider');
    }
    
    return context;
};