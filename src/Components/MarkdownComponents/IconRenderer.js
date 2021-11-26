import * as Icons from "react-icons/fa";

/* Your icon name from database data can now be passed as prop */
export const DynamicFaIcon = ({ children }) => {
    if (!children) {
        return null
    }

    const IconComponent = Icons[children];

    if (!IconComponent) { // Return a default one
        return <Icons.FaHeart />;
    }

    return (
        <IconComponent style={{verticalAlign: 'baseline'}}/>
        );
};