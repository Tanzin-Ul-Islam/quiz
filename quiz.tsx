import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Keyboard, ScrollView, SafeAreaView, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
// import AppStyle from '../../assets/styles/AppStyle'

const fakeData = [
    {
        id: 0,
        text: "This is question 1",
        answer: ''
    },

    {
        id: 1,
        text: "This is question 2",
        answer: ''
    },
    {
        id: 2,
        text: "This is question 3",
        answer: ''
    },
    {
        id: 3,
        text: "This is question 4",
        answer: ''
    },

]

const ChatBox = () => {
    // const navigation = useNavigation(); 
    const [inputText, setInputText] = useState < any > ('');

    const handleBack = () => {
        // navigation.goBack()
        setTempArray(null)
    }

    // const handleInput = (text: any) => {
    //   if (text != '') {
    //     setInputText(text);
    //     return
    //   }
    //   else {
    //     setInputText('')
    //   }
    // }

    const [edit, setEdit] = useState(true);

    const [tempArray, setTempArray] = useState < any > ([]);

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [storeData, setStoreData] = useState < any > ([])

    const [question, setQuestion] = useState < string > ()
    const [updateItem, setUpdateItem] = useState < any > (null);
    const [isQuizComplete, setIsQuizComplete] = useState < boolean > (false);

    const editText = (item: any) => {
        if (item.answer != null) {
            setUpdateItem(item);
            setInputText(item?.answer)
        }
        else {
            return;
        }
    };
    const sendText = () => {
        const tempArray2 = [...tempArray];
        let lastItem = tempArray2[tempArray2.length - 1]
        lastItem.answer = inputText;
        tempArray2[tempArray2.length - 1] = lastItem
        if (fakeData.length - 1 >= tempArray2.length) {
            let newItemIndex = tempArray2.length
            tempArray2.push(fakeData[newItemIndex]);
        }
        setTempArray([...tempArray2]);
        setInputText('');
        if (fakeData.length == tempArray.length && tempArray[tempArray.length - 1].answer) {
            setIsQuizComplete(true);
        }
    };
    const updateText = () => {
        let item = { ...updateItem };
        item.answer = inputText;
        const index = tempArray.findIndex((el: any) => el.id === item.id);
        tempArray[index] = item;
        setTempArray(tempArray);
        setUpdateItem(null);
        setInputText('');
    };

    useEffect(() => {
        setTempArray([fakeData[0]]);
    }, [])


    return (
        <>
            {/* //top section  starts*/}
            <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={handleBack}>
                        {/* <Image
              style={styles.icon}
              source={require('../../assets/images/leftArrow.png')}
            /> */}
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Notizbuch</Text>
                    {/* <Image
            style={styles.icon}
            source={require('./assets/images/roundedArrow.png')}
          /> */}
                </View>
                {/* //top section  ends*/}
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View
                            style={{ flex: 1, paddingHorizontal: 30, paddingVertical: 30 }}>
                            {tempArray?.map((item: any, index: number) => (
                                <React.Fragment key={'qa' + index}>
                                    {/* // questions from api */}
                                    {item?.text && <View
                                        style={[
                                            styles.chatBoxContainer,
                                            { backgroundColor: '#E1F8EA' },
                                        ]}>
                                        <Text key={index} style={styles.chatBoxText}>
                                            {item?.text}
                                        </Text>
                                    </View>}
                                    {item?.answer &&
                                        <View style={{ position: 'relative', marginTop: 10, paddingVertical: 20 }}>
                                            <View
                                                style={[
                                                    styles.chatBoxContainer,
                                                    { backgroundColor: '#FDFFFD' },
                                                ]}>
                                                <TouchableOpacity onPress={() => editText(item)}>
                                                    <Text key={index} style={styles.chatBoxText}>{item?.answer}</Text>
                                                    <Image
                                                        style={styles.edit}
                                                        source={require('./assets/images/edit.png')} />
                                                </TouchableOpacity>
                                            </View>

                                        </View>}
                                </React.Fragment>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {
                    !isQuizComplete ?
                        <>
                            {
                                !updateItem ?
                                    <View style={styles.btnContainer}>
                                        <TextInput
                                            style={styles.btnBorder}
                                            // placeholder="Click here…"
                                            onChangeText={text => setInputText(text)}
                                            value={inputText}
                                        />
                                        <TouchableOpacity onPress={sendText}>
                                            <Image
                                                style={styles.sendIcon}
                                                source={require('./assets/images/send.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    : <></>
                            }
                        </> : <></>
                }

                {
                    updateItem &&
                    <View style={styles.btnContainer}>
                        <TextInput
                            style={styles.btnBorder}
                            // placeholder="Click here…"
                            onChangeText={text => setInputText(text)}
                            value={inputText}
                        />
                        <TouchableOpacity onPress={updateText}>
                            <Image
                                style={styles.sendIcon}
                                source={require('./assets/images/send.png')}
                            />
                        </TouchableOpacity>
                    </View>

                }

                {
                    isQuizComplete &&
                    <Button title="Submit" onPress={() => { console.log("Submitted!") }} />
                }


                {tempArray.length === 0 && <View >
                    <TouchableOpacity
                        style={[]}
                    >
                        <Text
                            style={[{ fontSize: 13 }]}>
                            Nachricht senden
                        </Text>
                    </TouchableOpacity>
                </View>}
            </SafeAreaView>
        </>
    );
}

export default ChatBox

const styles = StyleSheet.create({
    textOne: {
        color: '#303331', fontWeight: '500', fontSize: 18, textAlign: 'center', padding: 20
    },
    icon: {
        width: 28, height: 28
    },
    sendIcon: {
        width: 24, height: 24, position: 'absolute', right: 10, bottom: 15
    },
    headerContainer: {
        flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 10,
    },
    pageTitle: {
        color: '#090120', fontWeight: '500', fontSize: 18
    },
    btnContainer: {
        flex: 1, paddingHorizontal: 30, justifyContent: 'flex-end', paddingBottom: 100, position: 'relative'
    },
    btnTxt: {
        color: '#090120', fontSize: 16, fontWeight: '500', textAlign: 'center',
    },
    btnBorder: {
        borderColor: '#5EA07A', borderWidth: 2, paddingHorizontal: 20, borderRadius: 12, height: 60, backgroundColor: 'white'
    },
    edit: {
        width: 20, height: 20, position: 'absolute', right: 20, top: 110
    },
    chatBoxContainer: {
        borderColor: '#AAD2B1', borderWidth: 2, borderRadius: 30, height: 171, position: 'relative'
    },
    chatBoxText: {
        paddingHorizontal: 20, paddingTop: 20, color: '#090120', fontSize: 18, fontWeight: '400'
    },


})