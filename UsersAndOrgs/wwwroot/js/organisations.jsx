import { Button, Table } from 'reactstrap';

class Organisations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { orgs: [] };
        this.removeOrganisation = this.removeOrganisation.bind(this);

    }

    componentWillMount() {
     
        fetch(location.protocol + '/Home/GetOrganisations/')
            .then(res => res.json())
            .then(orgs => this.setState({ orgs: orgs }));
    }
    
    removeOrganisation(id) {
        if (confirm("Удалить организацию")) {
            fetch(location.protocol + '/Home/RemoveOrganisation?id=' + id)
                .then(res => res.json())
                .then(res => this.setState({ orgs: res }));
        }      
    }

    render() {
        var removeOrganisation = this.removeOrganisation;
        var updateOrganisation = this.props.updateOrganisation;
        return (
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Наименование</th>
                            <th>Краткое наименование</th>
                            <th>Адрес</th>
                            <th>Телефон</th>
                            <th>Операции</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orgs.map(function (item) {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.shortName}</td>
                                        <td>{item.adress}</td>
                                        <td>{item.telephone}</td>
                                        <td>
                                            <Button outline color="primary" onClick={() => updateOrganisation(item)}> Редактировать</Button>
                                            <Button outline color="primary" onClick={() => removeOrganisation(item.id)}> Удалить</Button>
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

module.exports = Organisations;