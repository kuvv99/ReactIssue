import { Button, Table, Row, Collapse, Col } from 'reactstrap';

var NewOrganisationForm = require("./newOrganisationForm.jsx");

class Organisations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgs: [],
            organisatoinCreateFormMode: false,
            showOrganisationCreate: false,
            updatingItem: {}
        };

        this.updateOrganisation = this.updateOrganisation.bind(this);
        this.removeOrganisation = this.removeOrganisation.bind(this);

    }

    componentWillMount() {    
        fetch(location.protocol + '/Home/GetOrganisations/')
            .then(res => res.json())
            .then(orgs => this.setState({ orgs: orgs }));
    }

    showCreateForm() {
        this.setState({ organisatoinCreateFormMode: false });
        this.setState({ showOrganisationCreate: !this.state.showOrganisationCreate });
    }

    updateOrganisation(item) {
        this.setState({
            showOrganisationCreate: !this.state.showOrganisationCreate
        });
        this.setState({
            organisatoinCreateFormMode: true
        });

        this.setState({
            updatingItem:item
        })

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
        var updateOrganisation = this.updateOrganisation;

        return (
            <div>
                <Button outline color="primary" onClick={() => this.componentWillMount()}>Обновить таблицу</Button>
                <Button outline color="primary" onClick={() => this.showCreateForm()}>Добавить организацию</Button>
                <Row>
                    <Collapse isOpen={this.state.showOrganisationCreate}>
                        <Col sm="12" md={{ size: 'auto', offset: 0 }}>
                            <NewOrganisationForm mode={this.state.organisatoinCreateFormMode} item={this.state.updatingItem} />
                        </Col>
                    </Collapse>
                </Row>

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