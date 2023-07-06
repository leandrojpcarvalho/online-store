type PropsHeader = {
  handleOnChange: (param: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  inputValue: string;
};

function Header({ handleOnChange, handleClick, inputValue }: PropsHeader) {
  return (
    <header>
      <div className="container row">
        <input
          type="text"
          data-testid="query-input"
          onChange={ handleOnChange }
          value={ inputValue }
        />
        <button
          data-testid="query-button"
          onClick={ handleClick }
          className="search"
          aria-label="Search"
        >
          <img src="../src/assets/img/search.svg" alt="asfesds" />
        </button>
      </div>
      <img src="../src/assets/img/logo.svg" alt="" />
      <img src="../src/assets/img/cart.svg" alt="" />
    </header>
  );
}

export default Header;
