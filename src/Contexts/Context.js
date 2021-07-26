import React, { createContext } from "react";

export const Context = createContext() // Potrebne pre vyuzivanie Context API

export class ContextProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false, // Meanwhile page is waiting for server response value of this variable will be true and React will render loading screen (Loading Component)
            screenWidth: window.innerWidth // this variable will keep track of current width of website
        }
    }
    // This function will set the eventListener for resizing after this Component will be fully loaded
    componentDidMount() {
        window.addEventListener('resize', this.screenWidthChanged);
    }
    // When the Component won't be showing anymore this function will unset the eventListener for resizing
    componentWillUnmount() {
        window.removeEventListener('resize', this.screenWidthChanged);
    }
    // This function sets current width of website every time when eventListener for resizing triggers
    screenWidthChanged = () => this.setState({ screenWidth: window.innerWidth });

    render() {
        return(
            <Context.Provider
                value={{
                    ...this.state
                }}
            > {/* ...this.state give all variables from state to value */}
                {this.props.children} {/* All children of this Component can work with variables and function which are in value */}
            </Context.Provider>
        );
    }
}
