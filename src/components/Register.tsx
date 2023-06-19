type RegisteredCardProps = {
  url: string,
  serviceName: string,
  login: string,
  password: string,
  id: string,
  removeCard: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => void
};

function RegisteredCard({
  url, serviceName, login, password, id, removeCard,
}: RegisteredCardProps) {
  return (
    <div className="card">
      <div>
        <a href={ url }>
          { serviceName }
        </a>
        <button
          data-testid="remove-btn"
          onClick={ (e) => removeCard(e, id) }
        >
          Remover
        </button>
      </div>
      <div>
        <span>Login</span>
        <p>{ login }</p>
      </div>
      <div>
        <span>Senha</span>
        <p>{ password }</p>
      </div>
    </div>
  );
}

export default RegisteredCard;
