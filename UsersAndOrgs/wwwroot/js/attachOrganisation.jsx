import { Input, Label, Button } from 'reactstrap';

class AttachOrg extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            organisations: [],
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
        let amount = this.state.amount;
        amount.push("0");
        this.setState({ amount: amount });
    }

    lessOrganisationAttach() {
        let amount = this.state.amount;
        amount.pop();
        this.setState({ amount: amount });
    }

    render() {
        let onTypingNewUser = this.props.onTypingNewUser;
        let organisations = this.state.organisations;
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