import 'bootstrap/dist/css/bootstrap.min.css';
import  { useState, useEffect } from 'react';
import './App.css';
import {Container, Tab, Col,Row, Navbar, Nav, NavDropdown,Form, FormControl, Button  } from 'react-bootstrap';
import PaginationBar from './components/PaginationBar';
import ReposList from './components/ReposList';
import MarkdownRenderer from 'react-markdown-renderer';


function App() {
  const [repos, setRepos] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [searchTerm, setSearchTerm] = useState('');
  const [total,setTotal] = useState(0)
  const [readMe, setReadMe] = useState('')

  const totalRound = Math.floor(total/30)
  const onSearchCodeHub = async (e,p) => {
    e.preventDefault();
    const response = await fetch(`  https://api.github.com/search/repositories?q=${searchTerm}&page=${pageNumber}`);
    const json = await response.json();
    setRepos(json.items);
    setTotal(json.total_count);
    if(p>1){
      setPageNumber(p)
    } else{
      setPageNumber(1)
    }
  }


  const fetchReadMe = async () => {
    const url = `https://api.github.com/repos${window.location.pathname}/readme`;
    const response = await fetch(url);
    const json = await response.json(); 
    const decodedBase64 = atob(json.content);
    setReadMe(decodedBase64)
  }

  useEffect(()=> {
    fetchReadMe();
  },[])

  if(window.location.pathname.length >1) {
    return  (
    <Container>
      <MarkdownRenderer markdown={readMe}/>
    </Container>
    );
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
                          <ReposList repos={repos} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <div>Users</div>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
        <div className="display">
          <PaginationBar pageNumber={pageNumber} onSearchCodeHub={onSearchCodeHub} totalRound={totalRound}/>
        </div>


    </Container>
    </div>
  )
}

export default App;
