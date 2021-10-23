import {DynamicFaIcon} from "./IconRenderer";

export const MarkdownButton = ({children, color="white", url, icon="", minWidth, minHeight="48px"}) => {
    return (
        <div>
            <a
                href={url}
                className={color + "-button button "}
                style={{minWidth: minWidth, minHeight: minHeight}}
                rel="noopener noreferrer">
                {icon ? <h5><DynamicFaIcon>{icon}</DynamicFaIcon></h5> : null}
                {children}
            </a>
        </div>
    )
}