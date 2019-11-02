import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import MessageList from '../../components/chatbox/MessageList/index'

function mapStateToProps(state) {
    return {
        messages: state.online.messages,
        user: state.api.user,
    };
}

export default withRouter(connect(mapStateToProps, null)(MessageList));