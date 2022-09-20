import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import * as API from '../API/Api';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { Container } from './App.module';
import Loader from './Loader/Loader';

export default class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    largeImageURL: '',
    isLoading: false,
    error: null,
  };

  loadImages = async (query, page) => {
    this.setState({ isLoading: true });

    try {
      const images = await API.fetchImages(query, page);
      this.setState(prevState => ({
        items: [...prevState.items, ...images],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.loadImages(query, page);
    }
  }

  handleSearchSubmit = query => {
    this.setState({
      query,
      items: [],
      page: 1,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onOpenModal = largeImageURL => {
    this.setState({ largeImageURL });
  };

  onCloseModal = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const { items, isLoading, largeImageURL, error } = this.state;
    return (
      <Container>
        <Searchbar onSearch={this.handleSearchSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}

        {items.length > 0 && (
          <ImageGallery items={items} onClick={this.onOpenModal} />
        )}
        {isLoading && <Loader />}
        {items.length > 0 && <Button onLoadMore={this.onLoadMore} />}
        {largeImageURL && (
          <Modal onClose={this.onCloseModal} largeImageURL={largeImageURL} />
        )}
      </Container>
    );
  }
}
