import { useState } from 'react';
import RegisteredCard from './Register';

interface InfoWithID {
  url: string,
  login: string,
  serviceName: string,
  password: string,
  id: string,
}

function Form() {
  const [naoPreenchido, setNaoPreenchido] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [registeredPasswords, setRegisteredPasswords] = useState<InfoWithID[]>([]);
  const [formInfo, setFormInfo] = useState({
    serviceName: '',
    login: '',
    password: '',
    url: '',
  });
  const valid = 'valid-password-check';
  const invalid = 'invalid-password-check';

  function clearForm() {
    setFormInfo({
      serviceName: '',
      login: '',
      password: '',
      url: '',
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
    if (formInfo.login && formInfo.serviceName && validatePassword() && formInfo.url) {
      setNaoPreenchido(false);
    } else {
      setNaoPreenchido(true);
    }
  }

  function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setShowForm(!showForm);
    e.preventDefault();
    clearForm();
  }

  function validatePassword() {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*/\\.,><-])[a-zA-Z\d!@#$%^&*/\\.,><-]{8,16}$/;
    return (regex.test(formInfo.password));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validatePassword()) {
      const formInfoWithID = {
        ...formInfo,
        id: Date.now().toString(36) + Math.random().toString(36),
      };
      registeredPasswords.push(formInfoWithID);
      clearForm();
      setShowForm(false);
      return registeredPasswords;
    }
  }

  const handleRemoveCard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    setRegisteredPasswords(
      registeredPasswords.filter((element) => element.id !== id),
    );
    console.log(registeredPasswords);
  };

  const newBtn = (
    <div>
      <button onClick={ handleCancel }>Cadastrar nova senha</button>
    </div>
  );

  const form = (
    <form
      onSubmit={ handleSubmit }
    >
      <label>
        Nome do serviço
        <input
          required
          type="text"
          name="serviceName"
          value={ formInfo.serviceName }
          onChange={ handleChange }
        />
      </label>
      <label>
        Login
        <input
          required
          type="text"
          name="login"
          value={ formInfo.login }
          onChange={ handleChange }
        />
      </label>
      <label>
        Senha
        <input
          type="password"
          name="password"
          value={ formInfo.password }
          onChange={ handleChange }
        />
      </label>

      <div>
        <p
          className={ formInfo.password.trim().length > 8
            ? valid
            : invalid }
        >
          Possuir 8 ou mais caracteres
        </p>
        <p
          className={ formInfo.password.trim().length < 16
            ? valid
            : invalid }
        >
          Possuir até 16 caracteres
        </p>
        <p
          className={ /[a-zA-Z]/.test(formInfo.password) && /\d/.test(formInfo.password)
            ? valid
            : invalid }
        >
          Possuir letras e números
        </p>
        <p
          className={ /\W/.test(formInfo.password)
            ? valid
            : invalid }
        >
          Possuir algum caractere especial
        </p>
      </div>
      <label>
        URL
        <input
          required
          type="text"
          name="url"
          value={ formInfo.url }
          onChange={ handleChange }
        />
      </label>
      <button
        disabled={ naoPreenchido }
      >
        Cadastrar
      </button>
      <button onClick={ handleCancel }>Cancelar</button>
    </form>
  );

  return (
    <>
      {showForm ? form : newBtn}

      {!registeredPasswords.length
        ? <p>nenhuma senha cadastrada</p>
        : (registeredPasswords.map((register, index) => (
          <RegisteredCard
            key={ index }
            url={ register.url }
            login={ register.login }
            id={ register.id }
            serviceName={ register.serviceName }
            password={ register.password }
            removeCard={ handleRemoveCard }
          />)))}
    </>
  );
}

export default Form;
