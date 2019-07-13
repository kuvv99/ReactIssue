import { Button, Table, Row, Collapse, Col } from 'reactstrap';

var NewOrganisationForm = require("./newOrganisationForm.jsx");

class Organisations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            // Organisations.
            orgs: [],

            //CreateFormMde: false -new user; true - update user.
            organisatoinCreateFormMode: false,
            showOrganisationCreate: false,

            // Bufer contain updatid organisation data.
            updatingItem: {},
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

        // show/hide form.
        this.setState({ showOrganisationCreate: !this.state.showOrganisationCreate });
    }

    // item - selected organisation into the table.
    updateOrganisation(item) {
        this.setState({

            // Show form.
            showOrganisationCreate: !this.state.showOrganisationCreate,

            // Form's mode is update.
            organisatoinCreateFormMode: true,

            // Updating item.
            updatingItem: item
        });
    }

    // remove selected organisation into the table by click.
    removeOrganisation(id) {
        if (confirm("Удалить организацию")) {
            fetch(location.protocol + '/Home/RemoveOrganisation?id=' + id)
                .then(res => res.json())
                .then(res => this.setState({ orgs: res }));
        }      
    }

    render() {
        const removeOrganisation = this.removeOrganisation;
        const updateOrganisation = this.updateOrganisation;

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