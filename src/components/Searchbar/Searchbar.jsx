import { Notify } from "notiflix";
import React from "react";
import PropTypes from "prop-types";
import { SearchbarWrap, Form, SearchFormBtn, SearchFormBtnLabel, SearchInput } from "./Searchbar.styled";

export default class Searchbar extends React.Component {

    state= {
        searchName: '',
    }


    onImputChange = (event) => {
        const searchName = event.target.value;
        this.setState({searchName});
    }


    onClickSearchBtn = (event) => {
        event.preventDefault();

        const searchName = this.state.searchName.trim().toLowerCase();


        if (searchName) {
            this.props.onSubmit(searchName); 
            this.setState({searchName: ''}); 
        } else {
            Notify.failure('Fill in the search field');
        }
    };


    render () {
    const {searchName} = this.state;
        
        return(
        <SearchbarWrap>
            <Form>
            <SearchFormBtn
                type="submit" 
                className="button" 
                onClick={this.onClickSearchBtn}
            >
                <SearchFormBtnLabel>
                    Search
                </SearchFormBtnLabel>
            </SearchFormBtn>

            <SearchInput
                className="input"
                name ="input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                maxLength='20'
                value={searchName}
                onChange={this.onImputChange}
            />
            </Form>
        </SearchbarWrap>
        )
    }
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
};