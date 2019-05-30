import { StyleSheet } from 'react-native';
import colors from './constants/colors';

export default StyleSheet.create({

    inputContainerST: {
        height: 55,
        backgroundColor: '#ffffff',
        borderRadius: 8
    },

    inputContainerLG: {
        height: 55,
        backgroundColor: '#ffffff',
        borderRadius: 27.5,
        flexDirection: 'row'
    },

    inputContainerLS: {
        backgroundColor: '#ffffff',
        borderRadius: 6
    },

    textInput: {
        width: '100%',
        height: '100%',
        fontSize: 16,
        paddingLeft : 10
    },

    btnContainerST: {
        borderColor: '#ffffff',
        backgroundColor: '#29AAE3',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        opacity: 0.9,
    },

    textButton: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18
    },

    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text_f: {
        fontSize: 11,
        fontWeight: '300'
    },

    text_f1: {
        color: 'red',
        fontSize: 11
    },

    headerBar: {
        height: 55,
        backgroundColor: '#8395a7',
        borderRadius: 8,
        justifyContent: 'center',
        paddingLeft: 30
    },

    headerBtn: {
        height: 55,
        backgroundColor: '#8395a7',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    btnContainerLG: {
        borderColor: '#ffffff',
        backgroundColor: '#29AAE3',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 27.5,
        opacity: 0.9,
    },

    titleContainer: {
        height: 30,
        justifyContent: 'center',
    },

    profileContainer: {
        borderTopWidth: 1,
        borderColor: colors.BACKGROUND,
        flexDirection: 'row'
    },

    profileTextTitle: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    },

    height_2: { height: 2 },
    height_5: { height: 5 },
    height_10: { height: 10 },
    height_15: { height: 15 },
    height_20: { height: 20 },
    height_30: { height: 30 },
    height_100: { height: 100 },
    height_80: { height: 80 },
    height_120: { height: 120 },
    height_140: { height: 140 },
    height_180: { height: 180 },
    height_200: { height: 200 },

    flex_1: { flex: 1 },
    flex_3: { flex: 3 },

    padding_20: {
        padding: 20
    },

    fontSize_15: {
        fontSize: 15
    },

    flex_row: {
        flexDirection: 'row'
    },

    width_2: { width: 2},
    width_10: { width: 10 },
    width_15: { width: 15 },
    width_50: { width: 50 },
    width_100: { width: 100 },
    width_300: { width: 300 },


    padd_left_5 : { paddingLeft: 5 },
    padd_left_10 : { paddingLeft: 10 },
    padd_left_15 : { paddingLeft: 15 },

    padd_top_5 : { paddingTop: 5 },
    padd_top_10 : { paddingTop: 10 },

    marg_top_5 : { marginTop: 5 }, 
    marg_top_10 : { marginTop: 10 }, 
    marg_top_20 : { marginTop: 20 }, 


    marg_left_10 : { marginLeft: 10 }, 
    marg_left_15 : { marginLeft: 15 }, 



    
    text_right : { textAlign: 'right' }, 
})