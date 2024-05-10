import React, {useEffect, useState} from 'react';
import Link from 'next/link'
import BackgroundUI from '../components/backgroundUI';
import { useMisonyeoStore } from '../stores/useMisonyeoStore';
import { useRouter } from 'next/router';

export default function HomePage() {
  const misonyeoStore = useMisonyeoStore();
  const router = useRouter();
  
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