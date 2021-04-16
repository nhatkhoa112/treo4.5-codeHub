import 'bootstrap/dist/css/bootstrap.min.css';
import  { useState } from 'react';
import './App.css';
import {Pagination, Card,Container, Tab, Col,Row, Navbar, Nav, NavDropdown,Form, FormControl, Button  } from 'react-bootstrap';

function App() {
  const [repos, setRepos] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [searchTerm, setSearchTerm] = useState('');

console.log(pageNumber); 

  const onSearchCodeHub = async (e) => {
    e.preventDefault();
    const response = await fetch(`  https://api.github.com/search/repositories?q=${searchTerm}&page=${pageNumber}`);
    const json = await response.json();
    setRepos(json.items);
  }

  const onFindPage = (e,p) => {
    setPageNumber(p)
    onSearchCodeHub(e);
  }


  return (
    <div className="App">
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
              <Form onSubmit={onSearchCodeHub} inline>
                  <FormControl onChange={(e) => setSearchTerm(e.target.value)}  type="text" placeholder="Search" className="mr-sm-2" />
                  <Button onClick={onSearchCodeHub} variant="outline-success">Search</Button>
              </Form>
          </Navbar.Collapse>
      </Navbar>

    
      <Container className="mt-3 p-3 border">
        <Tab.Container  id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3} lg={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first">Repos</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second">Users</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9} lg={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <div>
                              {repos.map((r, index) => {
                                return <Card key={index}>
                                        <Card.Header>
                                          <a href="#">{r.full_name}</a>
                                          </Card.Header>
                                        <Card.Body>
                                          <Card.Text>
                                            "{r.html_url}"
                                          </Card.Text>
                                        </Card.Body>
                                      </Card>
                              })}
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <div>Users</div>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
        <div className="display">
          <Pagination>
            <Pagination.First />
            <Pagination.Prev onClick={(e) => onFindPage(e,pageNumber-1)}/>
            {pageNumber>1 &&  ( 
              <Pagination.Item onClick={(e) => onFindPage(e,pageNumber-1)}>
                {pageNumber -1}
              </Pagination.Item>)}
            <Pagination.Item active onClick={(e) => onFindPage(e,pageNumber)}>{pageNumber}</Pagination.Item>
            <Pagination.Item onClick={(e) => onFindPage(e,pageNumber+1)}>{pageNumber +1}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </div>


    </Container>
    </div>
  )
}

export default App;
