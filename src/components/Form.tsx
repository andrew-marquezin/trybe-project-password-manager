import { useState } from 'react';

function Form() {
  const [showForm, setShowForm] = useState(false);

  function handleCancel() {
    setShowForm(!showForm);
  }

  const newBtn = (
    <div>
      <button onClick={ handleCancel }>Cadastrar nova senha</button>
    </div>
  );

  const form = (
    <form>
      <label htmlFor="service-name-inpt">Nome do serviço</label>
      <input type="text" name="nome-do-serviço" id="service-name-inpt" />
      <label htmlFor="login-inpt">Login</label>
      <input type="text" name="login" id="login-inpt" />
      <label htmlFor="password-inpt">Senha</label>
      <input type="password" name="senha" id="password-inpt" />
      <label htmlFor="url-inpt">URL</label>
      <input type="text" name="url" id="url-inpt" />
      <button type="submit">Cadastrar</button>
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
