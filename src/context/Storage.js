import AsyncStorage from "@react-native-async-storage/async-storage";

const _storeData = async (key, value) => {
    try {
        const json = JSON.stringify(value);
        await AsyncStorage.setItem(key, json);
    } catch (e) {
        console.error(e);
    }
};

const _retrieveData = async (key) => {
    try {
        const json = await AsyncStorage.getItem(key);
        return json != null ? JSON.parse(json) : null;
    } catch (e) {
        console.error(e);
    }
};

const _clearData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.error(e);
    }
};

const _getAllKeys = async () => {
    let keys = [];
    try {
        keys = await AsyncStorage.getAllKeys();
    } catch (e) {}
    console.log(keys);
    Sentry.captureException(e);
};

const _getMultiple = async (key) => {
    let values;
    try {
        values = await AsyncStorage.multiGet([key, key]);
    } catch (e) {
        // read error
    }
    console.log(values);
};

export { _storeData, _retrieveData, _clearData, _getAllKeys, _getMultiple };
