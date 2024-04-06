// React.js da API hosil qilish uchun foydalanilgan komponent
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // API so'rovlarini jo'natish uchun

// MD5 hash yaratish funksiyasi
const generateMD5 = (str) => {
    let hash = '', i, chr;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash += chr;
    }
    return hash;
};

const Tester = () => {
    // State o'zgaruvchilari
    const [key, setKey] = useState('');
    const [secret, setSecret] = useState('');
    const [sign, setSign] = useState('');

    // Ro'yxatdan o'tish tugmasi bosilganda
    // const handleSignUp = async () => {
    //     try {
    //         // Ro'yxatdan o'tish uchun so'rovnoma ma'lumotlari
    //         const requestBody = {
    //             key: key,
    //             secret: secret
    //         };

    //         // APIga so'rovni yuborish
    //         const response = await axios.post('https://no23.lavina.tech/signup', requestBody);

    //         console.log(response.data,"hgfds");

             
            
    //     } catch (error) {
    //         console.error('Ro\'yxatdan o\'tishda xatolik yuz berdi:', error);
    //     }
    // };

  useEffect(()=>{
    async function fechtData(api){
  
  let path = new URLSearchParams(window.location.search)
  let id = path.get("id")
  let getData = await fetch(`${api}/${id}`)
  getData
    .json()
    .then(res => createSingle(res))
    .catch(err => {
      console.log(err)
    })
}
fechtData("https://no23.lavina.tech/books/1")
  })
 
    return (
        <div>
           
        </div>
    );
};

export default Tester;
