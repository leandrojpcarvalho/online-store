import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getProductById } from '../services/api';
import { LocalStorageTrybeComments, Product, PropTypes } from '../types';

function GetIdProduct() {
  const { productId } = useParams();
  return productId;
}

const INITIAL_STATE: Product = {
  id: '',
  price: '',
  thumbnail: '',
  title: '',
};

const INITIAL_STATE_FORM = {
  email: '',
  text: '',
  rating: '',
};

function ProductDetails({ handleClickLocalStorage }: PropTypes) {
  const [product, setProduct] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [form, setForm] = useState(INITIAL_STATE_FORM);
  const [toggleErrorMsg, setToggleErrorMsg] = useState(false);
  const productId = GetIdProduct();
  const { price, thumbnail, title } = product;

  useEffect(() => {
    const setProductState = async () => {
      if (!productId) throw new Error('novo Erro');
      const productObj = await getProductById(productId);
      setProduct(productObj);
      setIsLoading(false);
    };
    setProductState();
  }, [productId]);

  const setNewState = (event: React.FormEvent<HTMLInputElement>
  & React.ChangeEventHandler<HTMLInputElement>
  & React.TextareaHTMLAttributes<HTMLElement>
  & React.ChangeEventHandler<HTMLTextAreaElement>) => {
    const inputType = event.currentTarget.name;
    const inputValue = event.currentTarget.value;
    setForm({ ...form, [inputType]: inputValue });
  };

  const generateRadioInputs = () => {
    const arrInputs = new Array(5).fill(null);
    return arrInputs.map((element, index) => {
      return (
        <input
          key={ index }
          type="radio"
          name="rating"
          value={ `${index + 1}` }
          data-testid={ `${index + 1}-rating` }
          onChange={ setNewState }
        />
      );
    });
  };

  const handleOnClick = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (isValidData()) {
      setToggleErrorMsg(false);
      setForm(INITIAL_STATE_FORM);
      setCommentLocalStorage(product.id, form);
      return;
    }
    setToggleErrorMsg(true);
  };

  const setCommentLocalStorage = (prodId: string, data: LocalStorageTrybeComments) => {
    const newData = JSON.stringify([data]);
    let prevData = localStorage.getItem(prodId);
    if (!prevData) return localStorage.setItem(prodId, newData);
    prevData = JSON.parse(prevData);
    if (!prevData) return;
    const updateData = [...prevData, data];
    localStorage.setItem(prodId, JSON.stringify(updateData));
  };

  const isValidData = () => {
    const rate = Number(rating);
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const isValidEmail = regexEmail.test(email);
    const isValidRate = rate > 0 && rate <= 5;
    return (isValidEmail && isValidRate);
  };

  const { rating, email, text } = form;
  return isLoading ? (
    <div className="Informacoes carregando">
      <img
        src="https://www.blogson.com.br/wp-content/uploads/2017/10/loading-gif-transparent-10.gif"
        alt="loading"
      />
      <h3> carregando</h3>
    </div>
  ) : (
    <>
      <section className="product">
        <img
          src={ thumbnail }
          alt=""
          data-testid="product-detail-image"
        />
        <div className="details">
          <h2 data-testid="product-detail-name">{title}</h2>
          <h3 data-testid="product-detail-price">{price}</h3>
        </div>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => handleClickLocalStorage(product.id) }>
          Adicionar ao carrinho
        </button>
      </section>
      <section className="comments">
        <h3>Comentários</h3>
        <div className="evaluation column">
          <h4>Avaliação</h4>
          <form action="" className="grid form">
            <input
              data-testid="product-detail-email"
              type="email"
              name="email"
              value={ email }
              onChange={ setNewState }
              id="email"
              placeholder="name@prov.com"
            />
            <label htmlFor="rating" className="container-new" defaultValue={ 0 }>
              { ' ' }
              Avaliação
              {generateRadioInputs()}
            </label>
            <textarea
              name="text"
              id="comment"
              cols={ 30 }
              rows={ 10 }
              onChange={ setNewState }
              value={ text }
              placeholder="Faça o seu comentário!"
            />
            { toggleErrorMsg ? <p data-testid="error-msg">Campos inválidos</p> : '' }
            <button
              type="submit"
              data-testid="submit-review-btn"
              id="send-comment"
              onClick={ handleOnClick }
            >
              Adicionar comentário
            </button>
          </form>
        </div>
        <section className="other-comments">
          <div className="comment grid">
            <p> fulando@gmail.com</p>
            <p> rate 3</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
              illum! Error nam amet, vel impedit quod doloremque illum sed quae
              quibusdam recusandae, totam eaque, quis saepe voluptatum velit.
              Architecto, eum.
            </p>
          </div>
        </section>
      </section>
    </>
  );
}

export default ProductDetails;
