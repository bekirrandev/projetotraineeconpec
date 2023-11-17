import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json';
import '../css/Loading.css';

function Loading():JSX.Element {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="loading-wrapper">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
}

export default Loading;
