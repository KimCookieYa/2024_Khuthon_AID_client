import {create} from 'zustand';
import {StaticImageData} from 'next/image';
import OuingOuingiImage from '../public/images/ouingouingi.jpeg';


interface IMisonyeoStore {
    name: string;
    image: StaticImageData;
    scriptList: string[];
    dokbackList: string[];
    characterAi: string;
    favorability: number;
    changeMisonyeo: (name: string, image: StaticImageData, characterAi: string, favorability: number) => void;
    changeFavorability: (count: number) => void;
    addScript: (script: string) => void;
    resetScript: () => void;
    addDokback: (script: string) => void;
    buttonOn: boolean;
    scene: number;
    isEnd: boolean;
    setIsEnd: (isEnd: boolean) => void;
    mood: number;
    changeMood: (count: number) => void;
}

export const useMisonyeoStore = create<IMisonyeoStore>((set) => ({
    name: '요르 포저',
    image: OuingOuingiImage,
    scriptList: [],
    dokbackList: [],
    characterAi: '',
    favorability: 20,
    changeMisonyeo: (name, image, characterAi, favorability) => set({name, image, characterAi, favorability}),
    changeFavorability: (count) => set(state => ({favorability: state.favorability + count})),
    addScript: (script) => {
        // 미소녀가 할 말을 추가하면 미소녀의 말풍선에 스크립트가 나타남. 4초 후에 삭제됨.
        set(state => ({scriptList: [...state.scriptList, script]}));
        setTimeout(() => {
            set(state => ({scriptList: state.scriptList.slice(1)}));
        }, 2000);
    },
    resetScript: () => set({scriptList: []}),
    addDokback: (script) => {
        // 미소녀가 할 말을 추가하면 미소녀의 말풍선에 스크립트가 나타남. 4초 후에 삭제됨.
        set(state => ({dokbackList: [...state.dokbackList, script]}));
        setTimeout(() => {
            set(state => ({dokbackList: state.dokbackList.slice(1)}));
        }, 2000);
    },
    buttonOn: true,
    scene: 0,
    mood: 0,
    changeMood: (count) => set(state => ({mood: count})),
    isEnd: false,
    setIsEnd: (isEnd) => set({isEnd}),
}));