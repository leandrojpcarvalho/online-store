import { Link } from 'react-router-dom';
import { CartType } from '../types';
import { insertSvgCart } from '../utils/functions';

type PropsHeader = {
  handleOnChange: (param: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (e:string) => void;
  inputValue: string;
  cart: CartType[]
};

function Header({ handleOnChange, handleClick, inputValue, cart }: PropsHeader) {
  const setQuantityShopCart = () => {
    return cart
      .reduce((numberOfItems, currentItem) => (numberOfItems + currentItem.quantity), 0);
  };

  return (
    <header>
      <div className="container row">
        <Link
          className="returnbtn"
          onClick={ () => window.history.back() }
          to="/"
        >
          <img
            src="images/icons8-arrow-pointing-left-96.png"
            alt=""
          />
        </Link>
        <Link
          to="/"
          onClick={ () => handleClick('') }
          className="returnbtn"
        >
          <img
            src="images/icons8-casa.svg"
            alt=""
          />
        </Link>
        <input
          type="text"
          data-testid="query-input"
          onChange={ handleOnChange }
          value={ inputValue }
          placeholder="Digite o que você busca"
        />
        <button
          data-testid="query-button"
          onClick={ () => handleClick(inputValue) }
          className="search"
          aria-label="Search"
        >
          <img
            src="../src/assets/img/search.svg"
            alt="asfesds"
          />
        </button>
      </div>
      <img
        className="logoimage"
        src="../src/assets/img/logo.svg"
        alt=""
      />
      <Link
        to="/cart"
        data-testid="shopping-cart-button"
      >
        {insertSvgCart(setQuantityShopCart(), 'shopping-cart-size')}
      </Link>
    </header>
  );
}

export default Header;
