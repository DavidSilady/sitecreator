import {DynamicFaIcon} from "./IconRenderer";

export const MarkdownButton = ({children, color="white", url, icon="", minWidth="48px", minHeight="48px"}) => {
    return (
        <div>
            <a
                href={url}
                className={color + "-button button "}
                style={{minWidth: minWidth, minHeight: minHeight}}
                rel="noopener noreferrer">
                {icon ? <DynamicFaIcon>{icon}</DynamicFaIcon> : null}
                {children}
            </a>
        </div>
    )
}