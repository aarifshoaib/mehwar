import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode, useCallback, useEffect, useRef, useState, useLayoutEffect } from 'react'
import LabelControl from '../ui/label.control'
import Textbox from '../ui/textboxes.control'
import MultiSelection from './multi-select.control';
import ModalSheet from './modal-sheet';
import FakeTextbox from '../ui/fake-textboxes.control';
import ChipsListControl from './chips-list.control';
import { IconButton } from '../ui/buttons';
import { lightenColor, theme } from '../theme';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import RadioButton from '../ui/radio';
import FakeDropMenu from './fake-drop-menu';
import { mainStyle } from '../main-style';
import ControlError from '../ui/control-error';

interface MultiSelectionProps {
    title?: string;
    selectedData?: any[];
    placeholder?: string;
    children: (item: any) => ReactNode;
    field: string;
    filterQuery?: any;
    form: any;
    titleField: string;
    filterField: string;
    keyField: string;
    updateForm: any;
    maxLimit: number;
    data: any[];
    snap: string[];
    sheetTitle: string;
    emptyMessage?: string;
    hasError?: any;
    updateSelectedData: any;
}


const MutliSelectControl = (props: MultiSelectionProps) => {
    const [localData, setLocalData] = useState(props.data);
    const [originalData, setOriginalData] = useState(props.data);
    const [localMaxLimit, setLocalMaxLimit] = useState();
    const ref = useRef<BottomSheetModal>(null);
    const [searchForm, setSearchForm] = useState({ search: '' });
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    useLayoutEffect(() => {
        if (props.updateForm) {
            props.updateForm({ ...props.form, [props.field]: props.selectedData })
        }
    }, [props.selectedData]);

    const clearSearch = useCallback(() => {
        setSearchForm({ search: '' });
        if (props.filterQuery) {
            setLocalData([]);
        } else {
            setLocalData(originalData);
        }
    }, [localData]);

    useEffect(() => {
        props.hasError[0] ? setShowError(true) : setShowError(false)
    }, [props.hasError[0]])


    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        if (localData && searchForm['search']?.length > 0 && !props.filterQuery) {
            const filteredData = originalData.filter((item) => item[props.filterField].toLowerCase().includes(searchForm['search'].toLowerCase()));
            setLocalData(filteredData);
            setLoading(false);
        }
        else if (searchForm['search']?.length > 0 && props.filterQuery) {
            props.filterQuery(searchForm['search'], signal);
        } else {
            if (!props.filterQuery) {
                setLocalData(originalData);
            }
            setLoading(false);
        }
        return () => {
            if (props.filterQuery) {
                setLocalData([]);
            }
            controller.abort();
        };
    }, [searchForm.search]);


    useEffect(() => {
        console.log('props.data', props.data);
        setLocalData(props.data);
        setLoading(false);
        return () => {
        };
    }, [props.data]);

    useEffect(() => {
    }, [localData]);


    // show the modal for multi selection
    const handlePresentModalPress = useCallback(() => {
        ref.current?.present();
    }, []);

    // on select radio
    const handleSelection = (item) => {
        if (!checkIndexSelected(item)) {
            if (props.selectedData.length < props.maxLimit) {
                props.updateSelectedData([...props.selectedData, item]);
            } else {
                Alert.alert('Error', `You can select only ${props.maxLimit}.`)
            }
        } else {
            props.updateSelectedData(props.selectedData.filter(function (x) {
                return x[props.keyField] !== item[props.keyField];
            }))
        }
    };


    // check if the item is selected
    const checkIndexSelected = (item) => {

        let fdata = [];

        if (props.selectedData && props.selectedData.length > 0) {
            fdata = props.selectedData.filter((x) => x[props.keyField] === item[props.keyField]);
        }
        if (fdata.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.searchWrapper}>
                <LabelControl title={props.title} isRequired={true}></LabelControl>
                <FakeDropMenu trigger={handlePresentModalPress} hasError={props.hasError[0]}>
                    {props.selectedData && props.selectedData.length > 0 && <ChipsListControl updateData={props.updateSelectedData} data={props.selectedData} titleField={props.titleField} keyField={props.keyField} trigger={handlePresentModalPress} />}
                    {!props.selectedData || props.selectedData.length === 0 && <Text style={mainStyle.controlPlaceholder}>{props.placeholder}</Text>}
                </FakeDropMenu>
                <ControlError showError={showError} error={props?.hasError[0]} />
            </View>
            <ModalSheet enablePanDownToClose={true} ref={ref} snap={props.snap}>
                <View style={styles.sheetWrapper}>
                    <View>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.sheetTitle}>{props.sheetTitle}</Text>
                        </View>
                        <View style={{ backgroundColor: theme.tint, padding: 15, borderRadius: theme.controlBorderRadius }}>
                            <Textbox value={searchForm.search || ''} field='search' form={searchForm} updateForm={setSearchForm} title={null} iconOptions={{ icon: 'search', size: 25, color: '#B7B7B7' }} placeholder={`${props.placeholder}`}>
                                {searchForm.search && <IconButton style={{ position: 'absolute', right: 5, top: 15 }} name='closecircle' size={20} color={theme.primary} type={'ant'} onclick={clearSearch} />}
                            </Textbox>
                            <ChipsListControl updateData={props.updateSelectedData} data={props.selectedData} titleField={props.titleField} keyField={props.keyField} trigger={handlePresentModalPress} />
                        </View>
                    </View>
                    <View style={styles.listWrapper}>
                        <ScrollView>
                            {localData && !loading && localData.length > 0 && localData.map((item, index) => {
                                return (
                                    <View key={`row-wrapper-${item[props.keyField]}-${index.toString()}`} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: lightenColor(theme.primary, .7) }}>
                                        <TouchableOpacity style={styles.radioContainer} onPress={() => handleSelection(item)}>
                                            <View style={styles.outerRadio} key={`selection-${item[props.keyField]}`}>
                                                {checkIndexSelected(item) && <View style={styles.innerRadio}></View>}
                                            </View>
                                        </TouchableOpacity>
                                        {props.children(item)}
                                    </View>
                                )
                            })}
                            {(loading && <Text style={styles.emptyMessage}>Loading... Please wait..</Text>)}
                            {(!localData || localData.length == 0) && !loading && <Text style={styles.emptyMessage}>{props.emptyMessage}</Text>}
                        </ScrollView>
                    </View>
                </View>
            </ModalSheet>
        </View>
    )
}

export default MutliSelectControl

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal:35
    },
    searchWrapper: {

    },
    listWrapper: {
        backgroundColor: theme.tint,
        borderRadius: theme.controlBorderRadius,
        flex: 1,
        marginTop: 20,
        paddingVertical: 10
    },
    sheetWrapper: {
        paddingHorizontal: 10,
        flex: 1,
        paddingBottom: 35
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
    },
    sheetTitle: {
        color: theme.primary,
        fontFamily: theme.fontSemiBold,
        fontSize: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center'
    },
    radioContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
    },
    outerRadio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.primaryDark,
        marginRight: 10,
    },
    innerRadio: {
        backgroundColor: theme.primaryDark,
        margin: 2,
        flex: 1,
        borderRadius: 50
    },
    emptyMessage: {
        flex: 1,
        padding: 15,
        textAlign: 'center',
        fontFamily: theme.fontFamily,
        fontSize: theme.pageTitleFontSize,
        color: theme.primary
    }
})