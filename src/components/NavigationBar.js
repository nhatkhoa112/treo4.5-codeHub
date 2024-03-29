import { Navbar, Nav, NavDropdown,Form, FormControl, Button  } from 'react-bootstrap';

const NavigationBar = ({onSearchGithub, setSearchTerm}) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">CodeHub</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Form onSubmit={onSearchGithub} inline>
                    <FormControl onChange={(e) => setSearchTerm(e.target.value)}  type="text" placeholder="Search" className="mr-sm-2" />
                    <Button onClick={onSearchGithub} variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavigationBar;