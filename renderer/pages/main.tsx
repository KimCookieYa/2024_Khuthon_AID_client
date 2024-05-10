import React, {useEffect, useState} from 'react';
import BackgroundUI from '../components/backgroundUI';
import { useMisonyeoStore } from '../stores/useMisonyeoStore';
import { useBackStore } from '../stores/useBackStore';
import { useRouter } from 'next/router';

export default function HomePage() {
  const misonyeoStore = useMisonyeoStore();
  const backStore = useBackStore();
  const router = useRouter();
  
  useEffect(()=>{
    console.log(misonyeoStore);
      misonyeoStore.resetScript();
      if (misonyeoStore.favorability >= 50) {
          misonyeoStore.addScript('안녕 동훈! 반가워!');
      } else if (misonyeoStore.favorability >= 20) {
          misonyeoStore.addScript('안녕!');
      } else {
          misonyeoStore.addScript('안녕. 환경파괴범?');
      }
    if (misonyeoStore.favorability >= 100) {
        alert('호감도가 100이 되어 미소녀가 당신에게 고백합니다.');
        router.push('/story/ending');
    };
    window.ipc.on('get-battery-info', (message: boolean) => {
      console.log(`${backStore.battery} ${message}`);
        if (!backStore.battery && message) {
          backStore.setBattery(true);
          misonyeoStore.addScript('배터리 너무 많이 충전하는거 아니야?');
          misonyeoStore.changeMood(2);
          setTimeout(()=>{
            misonyeoStore.changeMood(2);
          }, 2000);
        }
    })
  }, [])

  useEffect(()=>{
    if (misonyeoStore.favorability >= 100) {
        alert('호감도가 100이 되어 미소녀가 당신에게 고백합니다.');
        router.push('/story/ending');
    };
  }, [misonyeoStore.favorability])

  return (
    <React.Fragment>
      <BackgroundUI
        key={'background'}
      />
    </React.Fragment>
  )
}