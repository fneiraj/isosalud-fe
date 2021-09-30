import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import globalStyles from '../../styles';

const PageBase = ({children, navigation}) => {

    return (
        <div>
            <span style={globalStyles.navigation}>
                {navigation}
            </span>

            <Paper style={globalStyles.paper}>
                <h3 style={globalStyles.title}>{}</h3>

                <Divider/>

                {children}

                <div style={globalStyles.clear}/>
            </Paper>
        </div>
    );
};

PageBase.propTypes = {
    title: PropTypes.string,
    navigation: PropTypes.string,
    children: PropTypes.element
};

export default PageBase;
