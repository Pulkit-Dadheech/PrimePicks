export function setLocalStorageData(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data));
}

export function getLocalStorageData(name: string) {
    const data=localStorage.getItem(name);
    if(data){
        return JSON.parse(data);
    }
    return data;
}