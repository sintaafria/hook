import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = props => {

    if (props.isLoading){
        return(
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    } else {
        return null;
    }
}

export default Loading;