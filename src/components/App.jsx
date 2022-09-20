import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import * as API from '../API/Api';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { Container } from './App.module';
export default class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    largeImageURL: '',
  };

  addImages = async (query, page) => {
    const images = await API.fetchImages(query, page);
    this.setState(prevState => ({
      items: [...prevState.items, ...images],
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.addImages(query, page);
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
    const { items, largeImageURL } = this.state;
    return (
      <Container>
        <Searchbar onSearch={this.handleSearchSubmit} />
        {items.length > 0 && (
          <ImageGallery items={items} onClick={this.onOpenModal} />
        )}
        {items.length > 0 && <Button onLoadMore={this.onLoadMore} />}
        {largeImageURL && (
          <Modal onClose={this.onCloseModal} largeImageURL={largeImageURL} />
        )}
      </Container>
    );
  }
}
