import {createStyles} from "@material-ui/core/styles";

const styles = (theme) => createStyles(
    {
        categoryHeader: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        categoryHeaderPrimary: {
            color: theme.palette.common.black,
        },
        item: {
            paddingTop: 1,
            paddingBottom: 1,
            borderLeft: '5px solid transparent',
            color: '#333333',
            '&:hover,&:focus': {
                backgroundColor: '#E5E5E5',
            },
        },
        itemHeader: {
            backgroundColor: '#009BE5',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            alignItems: 'center',
        },
        itemCategory: {
            backgroundColor: '#EDEDED',
            boxShadow: '0 -1px 0 #D6D6D6 inset',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            color: '#5B5B5B',
        },
        firebase: {
            fontSize: 18,
            color: theme.palette.common.white,
        },
        itemActiveItem: {
            color: '#009BE5',
            borderLeft: '5px solid #009EE3',
        },
        itemPrimary: {
            fontSize: 'inherit',
        },
        itemIcon: {
            minWidth: 'auto',
            marginRight: theme.spacing(2),
        },
        divider: {
            marginTop: theme.spacing(2),
            backgroundColor: "#D6D6D6"
        },
        drawer: {
            backgroundColor: '#EDEDED',
        }
    });

export default styles;