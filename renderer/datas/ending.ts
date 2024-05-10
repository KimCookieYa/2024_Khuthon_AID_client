interface Iending {
    isGirl: boolean;
    script: string;
    mood?: number;
}

export const endingData: Iending[] = [
    {
        isGirl: true,
        script: '동훈.. 나 할말이 있어',
        mood: 0
    },
    {
        isGirl: false,
        script: '뭔가 긴장한 듯한 모습이다.'
    },
    {
        isGirl: false,
        script: '설마.. 고백하는 건가?'
    },
    {
        isGirl: true,
        script: '동훈이 열심히 노력해준 덕분에 에너지를 절약할 수 있었어.',
        mood: 1
    },
    {
        isGirl: true,
        script: '노력하는 모습에 나 감동했어.',
        mood: 1
    },
    {
        isGirl: false,
        script: '그럼..'
    },
    {
        isGirl: true,
        script: '하지만…',
        mood: 0
    },
    {
        isGirl: true,
        script: '나도 컴퓨팅 자원을 절약하기 위해 사라져야해…',
        mood: 2
    },
    {
        isGirl: true,
        script: '내가 없어도 계속 절약해줄거라고 믿어.',
        mood: 2
    },
    {
        isGirl: true,
        script: '안녕.',
        mood: 2
    },
];