import {create} from 'zustand';


interface IUserInfoStore {
    nickname: string;
    email: string;
    setUserInfo: (nickname: string, email: string) => void;
}

export const useUserInfoStore = create<IUserInfoStore>((set) => ({
    nickname: '동훈',
    email: 'min49590@gmail.com',
    setUserInfo: (nickname, email) => set({nickname, email})
}));