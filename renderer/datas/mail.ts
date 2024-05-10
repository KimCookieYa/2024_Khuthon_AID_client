interface IMail {
    Mail_ID: number;
    보낸사람: Array<string>; // '보낸 사람'을 '보낸사람'으로 이름 변경하여 쉬운 접근 가능
    태그: string[];
}

export const mailData: IMail[] = [
    {
        Mail_ID: 6781,
        보낸사람: ["Instagram", "no-reply@mail.instagram.com"],
        태그: ["instagram", "광고"],
    },
    {
        Mail_ID: 5333,
        보낸사람: ["Todoist", "no-reply@todoist.com"],
        태그: ["석현하님의", "생산성", "통계", "완료한"],
    },
    {
        Mail_ID: 6736,
        보낸사람: ["Skyscanner", "no-reply@sender.skyscanner.com"],
        태그: ["항공편항공편", "숙박", "와인"],
    },
    {
        Mail_ID: 6738,
        보낸사람: ["Facebook", "groupupdates@facebookmail.com"],
        태그: ["meta로부터", "이와", "같은", "이메일을", "받지"],
    },
    {
        Mail_ID: 206,
        보낸사람: ["YouTube", "noreply@youtube.com"],
        태그: ["google", "통해", "올라옵니다", "소식에", "대한"],
    },
    {
        Mail_ID: 2890,
        보낸사람: ["YouTube", "noreply@youtube.com"],
        태그: ["new", "videos", "mld", "momoland"],
    },
];
