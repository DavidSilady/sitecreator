export function MarkdownFlex({children}) {
    return (
        <span style={{display: "flex", alignItems: "center", flexDirection: "row", flexWrap: "wrap"}}>
            {children}
        </span>
    )
}