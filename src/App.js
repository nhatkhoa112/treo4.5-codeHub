import 'bootstrap/dist/css/bootstrap.min.css';
import  { useState, useEffect } from 'react';
import './App.css';
import {Container, Tab, Col,Row, Nav  } from 'react-bootstrap';
import PaginationBar from './components/PaginationBar';
import ReposList from './components/ReposList';
import NavigationBar from './components/NavigationBar';
import MarkdownRenderer from 'react-markdown-renderer';
import UserList from './components/UserList';


function App() {
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [searchTerm, setSearchTerm] = useState('');
  const [total,setTotal] = useState(0)
  const [readMe, setReadMe] = useState('')
  const [totalUsers,setTotalUsers] = useState(0)

  const totalRound = Math.floor(total/30)


  const onSearchGithub = async (e) => {
    e.preventDefault();  
    onSearchCodeHub();
    onSearchUser();
  }
  
  const onSearchCodeHub = async (p) => {
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
  
  const onSearchUser =  async (p) => {
    const response = await fetch(`  https://api.github.com/search/users?q=${searchTerm}&page=${pageNumber}`);
    const json = await response.json();
    setUsers(json.items);
    setTotalUsers(json.total_count);
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
      <NavigationBar onSearchGithub={onSearchGithub} setSearchTerm={setSearchTerm} />
      <Container className="mt-3 p-3 border">
        <Tab.Container  id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3} lg={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first">Repos {total}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second">Users {totalUsers}</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9} lg={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <ReposList repos={repos} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <div>
                              <UserList users={users} />
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
        <div className="display">
          <PaginationBar pageNumber={pageNumber} onSearchGithub={onSearchGithub} totalRound={totalRound}/>
        </div>
    </Container>
    </div>
  )
}

export default App;
