import { Input, Label, Button } from 'reactstrap';

// Component is attach one or more organisation to user.

class AttachOrg extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            organisations: [],
            // Amount of organisations to attaching.
            amount: ["1"]
        };   

        this.moreOrganisatonAttach = this.moreOrganisatonAttach.bind(this);
        this.lessOrganisationAttach = this.lessOrganisationAttach.bind(this);
    }

    componentDidMount() {
        fetch(location.protocol + '/Home/GetOrganisations/')
            .then(res => res.json())
            .then(organisations => this.setState({ organisations: organisations }));
    }

    moreOrganisatonAttach() {

        // Current organisastaion's amount for attaching.
        let amount = this.state.amount;

        // Increase amount for one.
        amount.push("0");
        this.setState({ amount: amount });
    }

    lessOrganisationAttach() {

        // Current organisastaion's amount for attaching.
        let amount = this.state.amount;

        // Decrease amount for one.
        amount.pop();
        this.setState({ amount: amount });
    }

    render() {

        const onTypingNewUser = this.props.onTypingNewUser;
        const organisations = this.state.organisations;

            return (
                <div>
                    <Button outline color="primary" onClick={this.moreOrganisatonAttach}>Добавить еще организацию</Button>
                    <Button outline color="primary" onClick={this.lessOrganisationAttach}>Убрать</Button>
                    {                        
                        this.state.amount.map(function (item) {
                            return (
                                <div>
                                    <Label for="org">Организация </Label>
                                    <Input type="select" id="org" onChange={onTypingNewUser} placeholder="Выберите организацию" >
                                        {
                                            organisations.map(function (item) {
                                                return (
                                                    <option value={item.id}>
                                                        {item.fullName}
                                                    </option>
                                                );
                                            })
                                        }
                                    </Input>
                                </div>
                            );  
                        })
                    }
                </div>
            );         
    }
}

module.exports = AttachOrg;