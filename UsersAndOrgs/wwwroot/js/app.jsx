import { Button, Container, Row, Col, TabContent, TabPane, Nav, NavLink, NavItem, Collapse } from 'reactstrap';
import classnames from 'classnames';

var NewUserForm = require("./newUserForm.jsx");
var Users = require("./users.jsx");
var NewOrganisationForm = require("./newOrganisationForm.jsx");
var Organisations = require("./organisations.jsx");

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgs: [],
            users: [],
            currentPage: '1',
            showUserCreate: false,
            showOrganisationCreate: false,
            bufer: {},
            organisatoinCreateFormMode: false,
            userCreteFormMode: false
        };

        this.touch = this.touch.bind(this);
        this.updateOrganisation = this.updateOrganisation.bind(this);
        this.updateUser = this.updateUser.bind(this);

    }

    updateUser(item) {
        console.log(item.id + " " + item.name);
        this.setState({
            showUserCreate: !this.state.showUserCreate
        });
        this.setState({bufer: item});
        this.setState({ userCreteFormMode: false });
    }

    updateOrganisation(item) {
        this.setState({
            showOrganisationCreate: !this.state.showOrganisationCreate        
        });
        this.setState({ bufer: item });
        this.setState({ organisatoinCreateFormMode: true });
    }

    touch(Page) {
        if (this.state.currentPage !== Page) {
            this.setState({
                currentPage: Page
            });
        }
    }

    showCreateForm(form) {
        if (form === "newUser") {
            this.setState({ userCreteFormMode: !this.state.userCreteFormMode });
            this.setState({ showUserCreate: !this.state.showUserCreate });
        }

        if (form === "newOrganisation") {
            this.setState({ organisatoinCreateFormMode: false });
            this.setState({ showOrganisationCreate: !this.state.showOrganisationCreate });
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Nav tabs >
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.currentPage === '1' })} onClick={()=> this.touch('1')}>
                                Пользователи
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink className={classnames({ active: this.state.currentPage === '2' })} onClick={() => this.touch('2')}>
                                Организации
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <TabContent activeTab={this.state.currentPage}>
                        <TabPane tabId="1">
                            <Button outline color="primary" onClick={() => this.showCreateForm('newUser')}>Добавить пользователя.</Button>
                            <Row>                               
                                <Collapse isOpen={this.state.showUserCreate}>
                                    <Col sm="8" md={{ size: 'auto', offset: 0 }}>
                                        <NewUserForm bufer={this.state.bufer} mode={this.state.userCreteFormMode}/>
                                    </Col>
                                </Collapse>
                            </Row>

                            <Row>
                                <Col sm="12" md={{ size: 13, offset: 0 }}>
                                    <Users updateUser={this.updateUser} />
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                   
                    <TabContent activeTab={this.state.currentPage}>
                        <TabPane tabId="2">
                            <Button outline color="primary" onClick={() => this.showCreateForm('newOrganisation')}>Добавить организацию.</Button>
                            <Row>                              
                                <Collapse isOpen={this.state.showOrganisationCreate}>
                                    <Col sm="12" md={{ size: 'auto', offset: 0 }}>
                                        <NewOrganisationForm bufer={this.state.bufer} mode={this.state.organisatoinCreateFormMode} />
                                    </Col>
                                </Collapse>
                            </Row>

                            <Row>
                                <Col sm="12" md={{ size: 13, offset: 0 }}>
                                    <Organisations updateOrganisation={this.updateOrganisation} />
                                </Col>
                            </Row>
                        </TabPane>                      
                    
                    </TabContent>                                       
                </Container>                

            </div>
            );
    }
}

ReactDOM.render(<Main/>, document.getElementById("app"));
