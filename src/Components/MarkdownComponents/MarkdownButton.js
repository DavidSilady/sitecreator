export const MyButton = ({color, content, href, onClick, target, icon, minWidth, style, classNames, minHeight="48px"}) => {
    return (
        <div style={style}>
            <a
                href={href}
                className={color + "-button button " + classNames}
                onClick={onClick}
                target={target}
                style={{minWidth: minWidth, minHeight: minHeight}}
                rel="noopener noreferrer">
                {icon ? <h4>{icon}</h4> : null}
                {content}
            </a>
        </div>
    )
}