import {create} from 'zustand';


interface IBackStore {
    battery: boolean;
    setBattery: (state: boolean) => void;
}

export const useBackStore = create<IBackStore>((set) => ({
    battery: false,
    setBattery: (battery) => set({battery})
}));