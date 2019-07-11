import { Button, Table } from 'reactstrap';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
        this.removeUser = this.removeUser.bind(this);

    }

    componentWillMount() {
        fetch(location.protocol + '/Home/GetUsersAndOrgs')
            .then(response => response.json())
            .then(users => this.setState({ users: users }));
   
    }

    removeUser(id) {
        if (confirm("Удалить пользователя?")) {
            fetch(location.protocol + '/Home/RemoveUser?id=' + id)
                .then(res => res.json())
                .then(users => this.setState({ users: users }));
        }
    }

    render() {
        var removeUser = this.removeUser;
        var updateUser = this.props.updateUser;
        return (
            <div>
                <div>
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
            </div>
        );
    }
}

module.exports = Users;