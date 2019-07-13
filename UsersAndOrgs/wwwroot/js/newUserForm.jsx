import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

var AttachOrg = require("./attachOrganisation.jsx");

class NewUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameIsValid:false,
            secondName: "",
            secondNameIsValid:true,
            surname: "",
            surnameIsValid: false,
            orgsIds: [],
            eMail: "",
            eMailIsValid:false
        };

        this.onTypingNewUser = this.onTypingNewUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    componentWillReceiveProps() {

        // When updates selcted user auto filling form.
        if (this.props.mode) {
           
            this.setState({
                name: this.props.item.name,
                nameIsValid: true,
                secondName: this.props.item.secondName,
                secondNameIsValid: true,
                surname: this.props.item.surname,
                surnameIsValid: true,
                eMail: this.props.item.eMail,
                eMailIsValid: true
            });
        }
    }

    // Any filed must have length more 3 words and less 32.
    onTypingNewUser(e) {
        
        if (e.target.id === "Name") {
            let length = e.target.value.length;
            this.setState({ name: e.target.value });
            (length > 2 && length < 32) ?
                this.setState({ nameIsValid: true })
                : this.setState({ nameIsValid: false });
        }          

        if (e.target.id === "secondName") {
            let length = e.target.value.length;
            this.setState({ secondName: e.target.value });
            
            (length < 32) ?
                this.setState({ secondNameIsValid: true })
                : this.setState({ secondNameIsValid: false });
        }         

        if (e.target.id === "surname") {
            let length = e.target.value.length;
            this.setState({ surname: e.target.value });
            (length > 2 && length < 32) ?
                this.setState({ surnameIsValid: true })
                : this.setState({ surnameIsValid: false });
        }           

        if (e.target.id === "eMail") {
            let length = e.target.value.length;
            this.setState({ eMail: e.target.value });
            (length > 2 && length < 32) ?
                this.setState({ eMailIsValid: true })
                : this.setState({ eMailIsValid: false });
        }

        if (e.target.id === "org") {
            let res = this.state.orgsIds;
            if (!res.includes(e.target.value)) {
                res.push(e.target.value);
            }          
            this.setState({ orgsIds: res });
        }
           
    }

    addUser() {

        // If form filling is valid then create user.
        (this.state.nameIsValid === true && this.state.secondNameIsValid === true && this.state.surnameIsValid === true && this.state.eMailIsValid === true) ?
            fetch(location.protocol + '/Home/addUser', {
                method: "POST",
                body: JSON.stringify({
                    name: this.state.name,
                    secondName: this.state.secondName,
                    surname: this.state.surname,
                    orgsIds: this.state.orgsIds,
                    eMail: this.state.eMail
                }),
                headers: { "Content-Type": "application/json" }
            })
            :
            alert("Форма зполнена неверно");
    }

    updateUser() {

        (this.state.nameIsValid === true && this.state.secondNameIsValid === true && this.state.surnameIsValid === true && this.state.eMailIsValid === true) ?
            fetch(location.protocol + '/Home/updateUser?id=' + this.props.item.id, {
                method: "POST",
                body: JSON.stringify({
                    name: this.state.name,
                    secondName: this.state.secondName,
                    surname: this.state.surname,
                    orgsIds: this.state.orgsIds,
                    eMail: this.state.eMail
                }),
                headers: { "Content-Type": "application/json" }
            })
            :
            alert("Форме заполнена неверно");
    }

    render() {

        const nameBorderColor = this.state.nameIsValid ? "green" : "red";
        const secondNameBorderColor = this.state.secondNameIsValid ? "green" : "red";
        const surnameBorderColor = this.state.surnameIsValid ? "green" : "red";
        const eMailBorderColor = this.state.eMailIsValid ? "green" : "red";

        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="userName">Имя</Label>
                        <Input type="text" id="Name" value={this.state.name} onChange={this.onTypingNewUser} style={{ borderColor: nameBorderColor }} placeholder="Введите имя" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="secondName">Отчество</Label>
                        <Input type="text" id="secondName" value={this.state.secondName} onChange={this.onTypingNewUser} style={{ borderColor: secondNameBorderColor }} placeholder="Введите отчество" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="surname">Фамилия</Label>
                        <Input type="text" id="surname" value={this.state.surname} onChange={this.onTypingNewUser} style={{ borderColor: surnameBorderColor }} placeholder="Введите фамилию" />
                    </FormGroup>

                    <FormGroup>
                        < AttachOrg onTypingNewUser={this.onTypingNewUser} currentAmount={this.state.orgsIds} />                                            
                    </FormGroup>

                    <FormGroup>
                        <Label for="eMail">E-Mail</Label>
                        <Input type="text" id="eMail" value={this.state.eMail} onChange={this.onTypingNewUser} style={{ borderColor: eMailBorderColor }}placeholder="Введите eMail" />
                    </FormGroup>

                    <Button outline color="primary" onClick={this.updateUser} disabled={!this.props.mode} >Изменить пользователя </Button>
                    <Button outline color="primary" onClick={this.addUser} disabled={this.props.mode} >Добавить пользователя </Button>
                </Form>
            </div>
        );         
    }
}

module.exports = NewUserForm;