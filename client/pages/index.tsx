import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import styles from '../styles/index.module.scss'


const Index = () => {
  return (
    <MainLayout>
      <div className={styles.hero}>
      <img src={`${process.env.NEXT_PUBLIC_API_URL}/image/obl.jpg`} alt="SoundNest Cover" className={styles.heroImg}/>
        <h1>Добро пожаловать в <span>SoundNest</span>!</h1>
        <h3>Исследуйте, создавайте и наслаждайтесь лучшей музыкой со всего мира.</h3>
        <p>SoundNest — это место, где музыка оживает. Открывайте новые треки, делитесь своими плейлистами и находите вдохновение в ритме.</p>
      </div>
      
      <style jsx>
        {`
          h1 {
            font-size: 3rem;
            font-weight: bold;
            color: #800080;
          }
          h1 span {
            color: #ffcc00;
          }
          h3 {
            font-size: 1.5rem;
            color: #A17F7F;
            margin-bottom: 10px;
          }
          p {
            font-size: 1.2rem;
            color: #A17F4D;
            max-width: 600px;
          }
          .explore-btn {
            margin-top: 20px;
            padding: 12px 24px;
            font-size: 1.2rem;
            font-weight: bold;
            color: #fff;
            background: #ff5500;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s ease;
          }
          .explore-btn:hover {
            background: #ff7700;
          }
        `}
      </style>
    </MainLayout>
  );
};

export default Index;