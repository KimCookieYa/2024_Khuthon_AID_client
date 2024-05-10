import React, {useEffect, useState} from 'react';
import Link from 'next/link'
import BackgroundUI from '../components/backgroundUI';
import { useMisonyeoStore } from '../stores/useMisonyeoStore';
import { useBackStore } from '../stores/useBackStore';
import { useRouter } from 'next/router';

export default function HomePage() {
  const misonyeoStore = useMisonyeoStore();
  const backStore = useBackStore();
  const router = useRouter();
  window.ipc.on('get-battery-info', (message: boolean) => {
    console.log(`${backStore.battery} ${message}`);
      if (!backStore.battery && message) {
        backStore.setBattery(true);
        misonyeoStore.addScript('배터리 너무 많이 충전하는거 아니야?');
        misonyeoStore.mood = 2;
        setTimeout(()=>{
          misonyeoStore.mood = 0;
        }, 4000);
      }
  })
  
  useEffect(()=>{
    console.log(misonyeoStore);
    if (misonyeoStore.favorability >= 100) router.push('/story/ending');
  }, [])

  useEffect(()=>{
    if (misonyeoStore.favorability >= 100) router.push('/story/ending');
  }, [misonyeoStore.favorability])

  return (
    <React.Fragment>
      <BackgroundUI
        key={'background'}
      />
    </React.Fragment>
  )
}