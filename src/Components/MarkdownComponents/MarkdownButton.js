import {DynamicFaIcon} from "./IconRenderer";

export const MarkdownButton = ({children, color="white", url, icon="", minWidth, minHeight="48px"}) => {
    return (
        <div>
            <a
                href={url}
                className={color + "-button button "}
                style={{minWidth: minWidth, minHeight: minHeight}}
                rel="noopener noreferrer">
                {icon ? <h4><DynamicFaIcon>{icon}</DynamicFaIcon></h4> : null}
                {children}
            </a>
        </div>
    )
}

export const ExecMDButton = ({children, color="white", onClick=()=>{}, icon="", minWidth, minHeight="48px"}) => {
    return (
        <div>
            <a
                onClick={onClick}
                className={color + "-button button "}
                style={{minWidth: minWidth, minHeight: minHeight}}
                rel="noopener noreferrer">
                {icon ? <h3><DynamicFaIcon>{icon}</DynamicFaIcon></h3> : null}
                {children}
            </a>
        </div>
    )
}