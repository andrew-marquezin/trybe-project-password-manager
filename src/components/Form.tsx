import { useState } from 'react';

function Form() {
  const [naoPreenchido, setNaoPreenchido] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formInfo, setFormInfo] = useState({
    serviceName: '',
    login: '',
    password: '',
    url: '',
  });

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
    setFormInfo({
      serviceName: '',
      login: '',
      password: '',
      url: '',
    });
  }

  function validatePassword() {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*/\\.,><-])[a-zA-Z\d!@#$%^&*/\\.,><-]{8,16}$/;
    return (regex.test(formInfo.password));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validatePassword()) {
      console.log('🍌');
    } else {
      console.log('not 🍌');
    }
  }

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
          name="serviceName"
          value={ formInfo.serviceName }
          onChange={ handleChange }
        />
      </label>
      <label>
        Login
        <input
          required
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
      <label>
        URL
        <input
          required
          name="url"
          value={ formInfo.url }
          onChange={ handleChange }
        />
      </label>
      <button disabled={ naoPreenchido }>Cadastrar</button>
      <button onClick={ handleCancel }>Cancelar</button>
    </form>
  );

  return (
    <div>
      {showForm ? form : newBtn}
    </div>
  );
}

export default Form;
