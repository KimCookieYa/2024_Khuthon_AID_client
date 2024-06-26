import React, {useEffect, useState} from 'react';
import Link from 'next/link'
import BackgroundUI from '../../../components/backgroundUI';
import { useMisonyeoStore } from '../../../stores/useMisonyeoStore';
import { useRouter } from 'next/router';
import { endingData } from '../../../datas/ending';

export default function HomePage() {
  const misonyeoStore = useMisonyeoStore();
  const [index, setIndex] = useState(0);
  const router = useRouter();
  
  useEffect(()=>{
    misonyeoStore.buttonOn = false;
    setIndex(0);
    console.log(endingData);
  }, [])

  useEffect(()=>{
    if (misonyeoStore.scriptList.length + misonyeoStore.dokbackList.length == 0){
        console.log(misonyeoStore.dokbackList);
        console.log(misonyeoStore.scriptList);
        if (endingData[index].isGirl) {
            misonyeoStore.addScript(endingData[index].script);
            misonyeoStore.changeMood(endingData[index].mood);
        } else {
            misonyeoStore.addDokback(endingData[index].script);
        }
        setTimeout(() => {
            if (index+1 < endingData.length) setIndex(index+1);
        }, 3000);
    }

    if (index >= endingData.length) {
        misonyeoStore.setIsEnd(true);
        setTimeout(() => {
            router.push('/main');
            misonyeoStore.buttonOn = true;
            misonyeoStore.setIsEnd(false);
        }, 2100);
    }
  }, [index])

  return (
    <React.Fragment>
      <BackgroundUI
        key={'background'}
      />
    </React.Fragment>
  )
}