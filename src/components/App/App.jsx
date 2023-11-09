import React from "react";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import { fetchImages } from "api/fetchImages";
import { Button } from "components/Button/Button";
import { Body } from "./App.styled";
import { Dna } from "react-loader-spinner";
import { Notify } from "notiflix";




export class App extends React.Component {

    state = {
        searchName: '',
        images: [],
        page: 1,
        loading: false,
        error: null,  
        isLoadMoreShown: false,
    };

  async componentDidUpdate(prevProps, prevState) {
        document.title = "Image finder"
        const { searchName, page } = this.state;

        if (prevState.searchName !== searchName || prevState.page !== page) {
        try {
           
            this.setState({ loading: true, isLoadMoreShown: false });

            //массив найденных картинок
            const searchImages = await fetchImages(searchName, page);

          
            if (searchImages.length === 0) {
                Notify.failure(
                `Sorry, the images you requested: ${searchName} not found.`
                );
            }
            
            this.setState(({ images }) => {
                return {
                images: [...images, ...searchImages],
                };
            });
            
            if (searchImages.length >= 12) {
                    this.setState({ isLoadMoreShown: true });
            }
            
        } catch (error) {
                Notify.failure('Something went wrong');

        } finally {
                this.setState({ loading: false });
        }
        }
  }


  handleFormSubmit = searchName => {
        this.setState({
        searchName,
        images: [],
        page: 1,
        });
  };

  loadMoreSubmit = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
  };

  render (){
  const {images, loading, isLoadMoreShown } = this.state;
        return (
        <Body>
            <Searchbar onSubmit={this.handleFormSubmit}/>
            { !!images.length && (<ImageGallery images={images} />)}
            { loading && (
                <Dna
                visible={true}
                height="60"
                width="60"
                ariaLabel="dna-loading"
                wrapperStyle={{  margin: '0 auto' }}
                wrapperClass="dna-wrapper"
            />
            )}                        
            
            {isLoadMoreShown&&<Button onClick = {this.loadMoreSubmit}/>}
        </Body>
        );
    }
};