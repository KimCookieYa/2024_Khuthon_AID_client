export interface backgroundProps {
  aiText?: string, // 비서 말풍선에 전달되는 텍스트
  text?: string, // 주인공이나 시스템이 말하는 텍스트
  love: number, // 호감도
  mood: number, // 0: 일반, 1: 기쁨, 2: 슬픔, 3: 화남
}