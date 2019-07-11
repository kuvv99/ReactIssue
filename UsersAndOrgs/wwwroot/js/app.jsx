import { Container, Row, Col, TabContent, TabPane, Nav, NavLink, NavItem } from 'reactstrap';
import classnames from 'classnames';


var Users = require("./users.jsx");
var Organisations = require("./organisations.jsx");

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: '1'           
        };

        this.touch = this.touch.bind(this);
    }

    touch(page) {

        if (this.state.currentPage !== page) {
            this.setState({
                currentPage: page
            });
        }
    }

    render() {

        return (
            <div>
                Here We are...
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
                            <Row>
                                <Col sm="12" md={{ size: 13, offset: 0 }}>
                                    <Users updateUser={this.updateUser} />
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                   
                    <TabContent activeTab={this.state.currentPage}>
                        <TabPane tabId="2">                          
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
