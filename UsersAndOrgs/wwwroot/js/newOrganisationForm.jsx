import { Button, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';

class NewOrganisationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameIsValid:false,
            shortName: "",
            shortNameIsValid:false,
            adress: "",
            adressIsValid:false,
            telephone: "",
            telephoneIsValid:false
        };

        this.onTypingNewOrganisation = this.onTypingNewOrganisation.bind(this);
        this.createOrganisation = this.createOrganisation.bind(this);
    }

    onTypingNewOrganisation(e) {
       
        if (e.target.id === "name") {
            let length = e.target.value.length;
            this.setState({ id: this.props.bufer.id });
            this.setState({ name: e.target.value });
            (length > 2 && length < 32) ?
                this.setState({ nameIsValid: true })
                : this.setState({ nameIsValid: false });

            console.log((length > 2 && length < 32) + " " +this.state.nameIsValid);
        }

        if (e.target.id === "shortName") {
            let length = e.target.value.length;
            this.setState({ shortName: e.target.value });
            (length > 2 && length < 32) ?
                this.setState({ shortNameIsValid: true })
                : this.setState({ shortNameIsValid: false });
        }

        if (e.target.id === "adress") {
            let length = e.target.value.length;
            this.setState({ adress: e.target.value });
            (length > 2 && length < 32) ?
                this.setState({ adressIsValid: true })
                : this.setState({ adressIsValid: false });
        }

        if (e.target.id === "telephone") {
            let length = e.target.value.length;
            this.setState({ telephone: e.target.value });
            (length > 2 && length < 32) ?
                this.setState({ telephoneIsValid: true })
                : this.setState({ telephoneIsValid: false });
        }
    }

    createOrganisation() {
        (this.state.nameIsValid && this.state.shortNameIsValid && this.state.adressIsValid && this.state.telephoneIsValid) ?
            fetch(location.protocol + '/Home/addOrganisation', {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.name,
                    shortName: this.state.shortName,
                    adress: this.state.adress,
                    telephone: this.state.telephone
                }),
                headers: { "Content-Type": "application/json" }
            })
            :
            alert("Форма заполнена неверно");
    }

    updateOrganisation() {
        (this.state.nameIsValid && this.state.shortNameIsValid && this.state.adressIsValid && this.state.telephoneIsValid) ?
        fetch(location.protocol + '/Home/updateOrganisation?id=' + this.props.bufer.id, {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                shortName:this.state.shortName,
                adress: this.state.adress,
                telephone: this.state.telephone
            }),
            headers: {"Content-Type":"application/json"}
            }) :
            alert("Форма заполнена неверно");
    }

    render() {
        let nameBorderColor = this.state.nameIsValid ? "green" : "red";
        let shortNameBorderColor = this.state.shortNameIsValid ? "green" : "red";
        let adressBorderColor = this.state.adressIsValid ? "green" : "red";
        let telephoneBorderColor = this.state.telephoneIsValid ? "green" : "red";
      
            return (
                <div>
                    <Form>
                        <FormGroup>
                            <Label for="name">Наименование организации</Label>
                            <Input type="text" id="name" value={this.state.Name} onChange={this.onTypingNewOrganisation} style={{ borderColor: nameBorderColor }} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="shortName">Краткое наименование</Label>
                            <Input type="text" id="shortName" value={this.state.shortName} style={{ borderColor: shortNameBorderColor }}onChange={this.onTypingNewOrganisation} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="adress">Адрес</Label>
                            <Input type="text" id="adress" value={this.state.adress} style={{ borderColor: adressBorderColor }}onChange={this.onTypingNewOrganisation} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="telephone">Телефон</Label>
                            <Input type="text" id="telephone" value={this.state.telephone} style={{ borderColor:telephoneBorderColor }} onChange={this.onTypingNewOrganisation} />
                        </FormGroup>

                        <Button onClick={() => this.updateOrganisation()} disabled={!this.props.mode}> Обновить организацию</Button>
                        <Button onClick={() => this.createOrganisation()} disabled={this.props.mode}> Создать организацию</Button>
                    </Form>
                </div>
            );
    }
}

module.exports = NewOrganisationForm;