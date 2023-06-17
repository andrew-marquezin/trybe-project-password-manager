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
      {formInfo.password.trim().length > 8
        ? <p className="valid-password-check">Possuir 8 ou mais caracteres</p>
        : <p className="invalid-password-check">Possuir 8 ou mais caracteres</p>}
      {formInfo.password.trim().length < 16
        ? <p className="valid-password-check">Possuir até 16 caracteres</p>
        : <p className="invalid-password-check">Possuir até 16 caracteres</p>}
      {/[a-zA-Z\d]/.test(formInfo.password) && formInfo.password.trim().length > 0
        ? <p className="valid-password-check">Possuir letras e números</p>
        : <p className="invalid-password-check">Possuir letras e números</p>}
      {/[!@#$%^&*/\\.,><-]/.test(formInfo.password)
        ? <p className="valid-password-check">Possuir algum caractere especial</p>
        : <p className="invalid-password-check">Possuir algum caractere especial</p>}
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
