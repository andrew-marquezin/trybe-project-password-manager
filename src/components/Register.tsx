type RegisteredCardProps = {
  url: string,
  serviceName: string,
  login: string,
  password: string,
};

function RegisteredCard({ url, serviceName, login, password }: RegisteredCardProps) {
  return (
    <>
      <div>
        <a href={ url }>
          { serviceName }
        </a>
      </div>
      <div>
        <span>Login</span>
        <p>{ login }</p>
      </div>
      <div>
        <span>Password</span>
        <p>{ password }</p>
      </div>
    </>
  );
}

export default RegisteredCard;
