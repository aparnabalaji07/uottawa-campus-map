import Container from '@components/Container';

import styles from './Footer.module.scss';

const Footer = ({ ...rest }) => {
  return (
    <footer className={styles.footer} {...rest}>
      <Container className={`${styles.footerContainer} ${styles.footerLegal}`}>
        <p>
          &copy; 
          <b>
            <i>
              uOttaHack - Aparna, Kali and Yasmine {new Date().getFullYear()}
            </i>
          </b>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
