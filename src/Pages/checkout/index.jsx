
import React, { useState } from 'react'
// ~~~~~~~~~Hooks~~~~~~~~//
// ~~~~~~~~~Components~~~~~~~~//
import styles from './styles.module.scss'
import { useSelector } from 'react-redux'
import { formatCurrency } from '../../Constants/utils/moneyCurrent'
import { IoIosArrowDown } from 'react-icons/io'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css';

// ~~~~~~~~~Images~~~~~~~~//
import visa from '../../assets/creditCardLogos/visa.png'
import uzcard from '../../assets/creditCardLogos/uzcard.png'
import humo from '../../assets/creditCardLogos/humo.png'
import paypal from '../../assets/creditCardLogos/paypal.png'

// ~~~~~~~~~React Icons~~~~~~~~//
import { BsArrowLeft } from "react-icons/bs";
import { Link } from 'react-router-dom'

// ~~~~~~~~~Libraries~~~~~~~~//
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../Firebase/config'
import { toast } from 'react-toastify'
import { playErrorSound, playSuccessSound } from '../../Constants/sounds'
import UseAuth from '../../Custom Hooks/UseAuth'

const Checkout = () => {
  const totalQty = useSelector(state => state.cart.totalQuantity)
  const totalAmout = useSelector(state => state.cart.totalAmout)
  const shippingPrice = useSelector(state => state.cart.shippingPrice)
  const productItems = useSelector(state => state.cart.cartItems)
  const { currentUser } = UseAuth()
  console.log(currentUser);
  // ~~~~~~~~~ States ~~~~~~~~~~~//
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [adress, setAdress] = useState('')
  const [phone, setPhone] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  // ~~~~~~ Credit Card information ~~~~~~//

  const [cardNumber, setCardNumber] = useState('')
  const [fullName, setFullName] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const id = uuidv4()
  const cardNumberToNumber = parseInt(cardNumber.split(' ').join(''))
  const data = {
    ID: id,
    user: {
      displayName: currentUser?.displayName,
      email: currentUser?.email,
    },
    orderPrice: (totalAmout + shippingPrice),
    date: new Date(),
    firstName,
    lastName,
    email,
    adress,
    phone,
    postalCode: parseInt(postalCode),
    country,
    region,
    creditCard: {
      cardNumber: cardNumberToNumber,
      fullName,
      month: parseInt(month),
      year: parseInt(year),
      cardCvv: parseInt(cardCvv),
    },
    productItems
  }
  const docRef = collection(db, 'orders');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(phone);
    switch (true) {
      case firstName === '': {
        toast.error("Please Enter your First Name!")
        playErrorSound()
      } break;
      case lastName === '': {
        toast.error("Please Enter your Last Name!")
        playErrorSound()
      } break;
      case email === '': {
        toast.error("Please Enter your Email!")
        playErrorSound()
      } break;
      case adress === '': {
        toast.error("Please Enter your Adress!")
        playErrorSound()
      } break;
      case postalCode === '': {
        toast.error("Please Enter your Postal code!")
        playErrorSound()
      } break;
      case phone === '+998': {
        toast.error("Please Enter your Phone Number!")
        playErrorSound()
      } break;
      case country === '': {
        toast.error("Please Enter your Country!")
        playErrorSound()
      } break;
      case region === '': {
        toast.error("Please Enter your Region!")
        playErrorSound()
      } break;
      case (cardNumber === '' && cardNumber.length < 16): {
        toast.error("Please Enter your Card Number!")
        playErrorSound()
      } break;
      case (cardCvv === '' && cardCvv.length < 2): {
        toast.error("Please Enter your Cards' Cvv!")
        playErrorSound()
      } break;
      case (month === '' && month.length < 2): {
        toast.error("Please Enter your Cards' Month!")
        playErrorSound()
      } break;
      case (year === '' && year.length < 2): {
        toast.error("Please Enter your Cards' year!")
        playErrorSound()
      } break;
      case fullName === '': {
        toast.error("Please Enter your Full Name")
        playErrorSound()
      } break;
      case (!window.confirm("Do you want to buy?")): break
      default: {
        await addDoc(docRef, data)
        toast.success("chotki")
        playSuccessSound()
      }

    }


  };
  const handleCountry = (e) => {
    setCountry(e.target.value)
  }
  const handleRegion = (e) => {
    setRegion(e.target.value)
  }
  console.log(typeof cardNumber);
  return (
    <div className={styles.checkout}>

      <div className={styles.form_pay_details}>
        <form onSubmit={handleSubmit}>
          <h3>Customer info</h3>
          <div className={styles.first_last_name}>
            <div>
              <label> First Name </label>
              <input type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                name="text" />
            </div>
            <div>
              <label> Last Name </label>

              <input type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                name="text" />
            </div>
            <div>
              <label>Your Email </label>

              <input type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="text" />
            </div>

          </div>
          <div className={styles.adress_country}>

            <div>
              <label>Adress</label>

              <input type="text"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                name="text"
                placeholder="Mirobod,Amir Temur ko'chasi 133-uy ..."
              />
            </div>
            <div className={styles.postal_phone}>
              <PhoneInput
                className={styles.phone_input}
                defaultCountry='uz'
                value={phone}
                onChange={setPhone}
                placeholder="Enter phone number"
              />


              <div>
                <label>Postal</label>
                <input className={styles.postel_code} type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="0000"
                  maxLength={4}
                  name="text" />
              </div>
            </div>

          </div>
          <div className={styles.selects}>
            <select
              name="languages"
              id="language-select"
              onfocus="this.size=6;"
              onblur="this.size=0;"
              onchange="this.size=1; this.blur()"
              onChange={handleCountry}
            >
              <option>--Country--</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Tojikistan">Tojikistans</option>
              <option value="Turkiya">Turkiya</option>
              <option value="Kazakistan">Kazakistan</option>
              <option value="Amerika">Amerika</option>
            </select>
            <select
              name="languages"
              id="language-select"
              onfocus="this.size=6;"
              onblur="this.size=0;"
              onchange="this.size=1; this.blur()"
              onChange={handleRegion}
            >
              <option>--Region--</option>
              <option value="Tashkent">Tashkent</option>
              <option value="Fargana">Fargana</option>
              <option value="Samarkand">Samarkand</option>
              <option value="Bukhara">Bukhara</option>
              <option value="Namangan">Namangan</option>
              <option value="Andijon">Andijon</option>
            </select>


          </div>
          <br />
          <h3>Payment info</h3>
          <div className={styles.credit_number}>
            <div>
              <label> Card number </label>

              <input
                type="text"
                value={cardNumber}
                onChange={(e) => {
                  let enteredValue = e.target.value.replace(/\D/g, ''); // Faqat raqamlarni qabul qilish
                  enteredValue = enteredValue.replace(/(\d{4})(?=\d)/g, '$1 '); // Har 4 ta raqamdan so'ng bo'shlik qo'shish
                  cardNumber.split(' ').join('')
                  setCardNumber(enteredValue);
                }}
                placeholder="0000 0000 0000 0000"
                maxLength={19} // Har bir kartaning maksimal uzunligi (raqamlar + bo'shliklar)
                name="number"
              />

            </div><div>
              <label> Full Name </label>

              <input type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                // placeholder="Name"
                name="text" />
            </div>

          </div>
          <br />
          <p>Expiration</p>
          <div className={styles.credit_month_year}>
            <div className={styles.inputs}>
              <input type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="MM"
                maxLength={2}
                name="number" />
              <input type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="YY"
                maxLength={2}
                name="number" />
              <input type="text"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                placeholder="CVV"
                maxLength={2}
                name="number" />
            </div>
            <div className={styles.card_logos}>
              <img src={visa} alt="" />
              <img src={paypal} alt="" />
              <img src={humo} alt="" />
              <img src={uzcard} alt="" />
            </div>




          </div>

          <div className={styles.pay_btn}>
            <button type='submit'>Pay <span>{formatCurrency(totalAmout + shippingPrice)}  </span></button>
          </div>

        </form>
        <div className={styles.pay_details}>
          <div className={styles.price}>
            <h4>Count of products:</h4><span>{totalQty}</span>

          </div>
          <div className={styles.price}>
            <h4>All orders price: </h4>
            <span>{formatCurrency(totalAmout)}</span>

          </div>
          <div className={styles.price}>
            <h4>Shipping:  </h4>
            <span>{formatCurrency(shippingPrice)}</span>

          </div>
          <div className={styles.price}>
            <h1>Total Cost: </h1>
            <span>{formatCurrency(totalAmout + shippingPrice)}</span>

          </div>
          <div className={styles.back_btn}>
            <Link to='/cart'> <BsArrowLeft size={20} className={styles.back_icon} /> Back to Cart </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Checkout
