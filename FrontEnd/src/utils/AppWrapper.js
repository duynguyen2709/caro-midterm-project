import React from 'react';
import axios from 'axios';
import Loading from "../components/utils/Loading";
import Error from "../components/utils/Error";
import MainRoute from "../routers/MainRoute";

 export default class AppWrapper extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isError : false,
            isLoading: true
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}status`)
            .then(() => this.setState({
                isError: false,
                isLoading: false,
            }))
            .catch(() => {
                this.setState({
                    isError: true,
                    isLoading: false,
                })
            })
    }

     // eslint-disable-next-line no-unused-vars
    componentDidCatch(error, errorInfo) {
        this.setState({
            isError: true,
            isLoading: false,
        })
    }

    render() {
        const {isError, isLoading} = this.state;

        if (isError)
            return <Error />;

        if (isLoading)
            return <Loading />;

        return <MainRoute />
    }
}