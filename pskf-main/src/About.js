import React from 'react';
import styles from './AboutUs.module.css';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import PskOwnerImage from './PskOwner.jpg';

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={PskOwnerImage} alt="PSK Owner" className={styles.ownerImage} />
      </div>
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>About Sri Karpaga Vinayagar Tex</h2>
        <p className={styles.description}>
          Sri Karpaga Vinayagar Tex, founded on October 23, 2003, by C.Kailaas in the name of K tex, later changed to Sri Karpaga Vinayagar Tex, is renowned in Erode for selling high-quality cloth raw materials. Specializing in selling new designs and new patten. Sri Karpaga Vinayagar Tex is committed to providing premium products to its customers.
        </p>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <FaPhone className={styles.icon} />
            <span>989466217</span>
          </div>
          <div className={styles.contactItem}>
            <FaEnvelope className={styles.icon} />
            <span>ckailaas2@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
