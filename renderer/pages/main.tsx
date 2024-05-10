import React, {useEffect, useState} from 'react';
import BackgroundUI from '../components/backgroundUI';
import { useMisonyeoStore } from '../stores/useMisonyeoStore';
import { useRouter } from 'next/router';

export default function HomePage() {
  const misonyeoStore = useMisonyeoStore();
  const router = useRouter();
  
  useEffect(()=>{
    console.log(misonyeoStore);
      misonyeoStore.resetScript();
      if (misonyeoStore.favorability >= 50) {
          misonyeoStore.addScript('안녕 동훈쿤! 반가워!');
      } else if (misonyeoStore.favorability >= 20) {
          misonyeoStore.addScript('안녕!');
      } else {
          misonyeoStore.addScript('안녕. 환경파괴범?');
      }
    if (misonyeoStore.favorability >= 100) {
        alert('호감도가 100이 되어 미소녀가 당신에게 고백합니다.');
        router.push('/story/ending');
    };
  }, [])

  // useEffect(()=>{
  //   if (misonyeoStore.favorability >= 100) {
  //       alert('호감도가 100이 되어 미소녀가 당신에게 고백합니다.');
  //       router.push('/story/ending');
  //   };
  // }, [misonyeoStore.favorability])

  return (
    <React.Fragment>
      <BackgroundUI
        key={'background'}
      />
    </React.Fragment>
  )
}