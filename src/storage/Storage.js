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

export { _storeData, _retrieveData, _clearData };
