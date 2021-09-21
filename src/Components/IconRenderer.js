import * as Icons from "react-icons/fa";

/* Your icon name from database data can now be passed as prop */
export const DynamicFaIcon = ({ children }) => {
    const IconComponent = Icons[children];

    if (!IconComponent) { // Return a default one
        return <Icons.FaBeer />;
    }

    return <IconComponent />;
};