import { Button, Table, Collapse, Row, Col } from 'reactstrap';

var NewUserForm = require("./newUserForm.jsx");

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showUserCreate: false,
            formModeIsUpdate: false,
            updatingItem: {}
        };

        this.removeUser = this.removeUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentWillMount() {

        fetch(location.protocol + '/Home/GetUsersAndOrgs')
            .then(response => response.json())
            .then(users => this.setState({ users: users }));  
    }

    showCreateForm() {
        this.setState({ formModeIsUpdate: false });
            this.setState({ showUserCreate: !this.state.showUserCreate });
    }

    updateUser(item) {

        this.setState({

            // Show creating form.
            showUserCreate: !this.state.showUserCreate,

            // Form's mode is update.
            formModeIsUpdate: !this.state.formModeIsUpdate,

            // Updating item.
            updatingItem: item
        });
    }

    removeUser(id) {

        if (confirm("Удалить пользователя?")) {
            fetch(location.protocol + '/Home/RemoveUser?id=' + id)
                .then(res => res.json())
                .then(users => this.setState({ users: users }));
        }
    }

    render() {

        const removeUser = this.removeUser;
        const updateUser = this.updateUser;

        return (
            <div>
                <Button outline color="primary" onClick={() => this.componentWillMount()}>Обновить таблицу</Button>
                <Button outline color="primary" onClick={() => this.showCreateForm()}>Добавить пользователя.</Button>
                <Row>
                    <Collapse isOpen={this.state.showUserCreate}>
                        <Col sm="8" md={{ size: 'auto', offset: 0 }}>
                            <NewUserForm  mode = { this.state.formModeIsUpdate } item={this.state.updatingItem} />
                        </Col>
                    </Collapse>
                </Row>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Пользователь</th>
                                <th>Организация</th>
                                <th>E-Mail</th>
                                <th>Операции</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(function (item) {
                                    return (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.name + ' ' + item.surname}</td>
                                            <td>
                                                {
                                                    item.attachments.map(function (innerItem) {
                                                        return (
                                                            innerItem.organisation.shortName + ' '
                                                        );
                                                    })                                                                                 
                                                }
                                            </td>
                                            <td>{item.eMail}</td>
                                            <td>
                                                <Button outline color="primary" onClick={() => updateUser(item)}>Редактировать</Button>
                                                <Button outline color="secondary" onClick={() => removeUser(item.id)}>Удалить</Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
            </div>
        );
    }
}

module.exports = Users;