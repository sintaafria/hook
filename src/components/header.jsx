import React from "react";
import { Container, Navbar } from "react-bootstrap"

export default function Header(){
    return(
        <Navbar variant="dark" bg="dark">
            <Container>
                <Navbar.Brand>Berita Indonesia</Navbar.Brand>
            </Container>
        </Navbar>
    )
}