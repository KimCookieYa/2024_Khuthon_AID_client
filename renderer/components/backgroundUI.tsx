import React, {useEffect, useState}  from 'react'
import Link from 'next/link'
import Image from 'next/image'
import bgimg from '../public/images/anime-school-background-0akglzygbxchtz5t.jpg'
import chimg0 from '../public/images/normal.png'
import chimg1 from '../public/images/happy.png'
import chimg2 from '../public/images/sad.png'
import { FaHeart } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import { useMisonyeoStore } from '../stores/useMisonyeoStore';
import { FcLikePlaceholder } from "react-icons/fc";

// aiText?: string, // 비서 말풍선에 전달되는 텍스트
// text?: string, // 주인공이나 시스템이 말하는 텍스트
// love: number, // 호감도
// mood?: number, // 0: 일반, 1: 기쁨, 2: 슬픔, 3: 화남

export default function backgroundUI() {
  const [dokbak, setDokbak] = useState(.0);
  const misonyeoStore = useMisonyeoStore();
  const [game, setGame] = useState(false);
  const im = [chimg0, chimg1, chimg2];

  useEffect(()=>{
    misonyeoStore.buttonOn = true;
  }, [])

  useEffect(() => {
    console.log(misonyeoStore.dokbackList.length)
    if (misonyeoStore.dokbackList.length) {
      setDokbak(0.8);
    }
    else {
      setDokbak(0);
    }
  }, [misonyeoStore.dokbackList.length])
  return (
    <div className="relative w-450 h-600">
      <div className='absolute flex inset-0 z-30 bg-black justify-center items-center'
      style={{opacity: dokbak}}>
        {misonyeoStore.dokbackList.map((script, index) => <p key={index}>{script}</p>)}
      </div>
      <div className='absolute inset-0 z-0'>
        <Image src={bgimg} alt='fda'
        layout='fill'
        objectFit='cover'/>
      </div>
      <div className='absolute z-10 left-100 bottom-5'>
        <Image src={im[misonyeoStore.mood]} alt='cha' className='w-250'/>
      </div>
      <div className='absolute inset-0 flex flex-col gap-20 z-[10000] justify-center items-center'
      style={game ? null : {opacity:.0}}>
        <Link href='/mini/quiz' className=' bg-white w-200 text-black rounded-full p-10 text-center'>메일 삭제 데이트</Link>
        <Link href='/mini/quiz' className=' bg-white w-200 text-black rounded-full p-10 text-center'>퀴즈 데이트</Link>
      </div>
      <div className='absolute z-20 right-20 top-20 bg-white rounded-full p-20'
      style={misonyeoStore.buttonOn ? null : {opacity:.0}}>
        <VscClose color='black' size={25}/>
      </div>
      <button className='absolute z-[10000] left-20 top-20 bg-white rounded-full p-20'
      style={misonyeoStore.buttonOn ? null : {opacity:.0}}
      onClick={(e)=>{
        setGame(!game);
        }}
      >
        <FaHeart color='red' size={25}/>
      </button>
      <div className='absolute flex flex-col items-center z-20 right-30 top-150'>
        <FcLikePlaceholder size={50}/>
        <p>{misonyeoStore.favorability}%</p>
      </div>
      <div className='absolute z-20 text-center px-10 left-1/2 -translate-x-1/2 bottom-1/4 bg-black text-24'>
        {misonyeoStore.scriptList.map((script, index) => <p key={index}>{script}</p>)}
      </div>
    </div>
  )
}
