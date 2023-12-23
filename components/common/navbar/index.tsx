import styles from "./styles.module.scss";

export const Navbar = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.Cta}>
          <p>
            FEITO COM
            <img
              src="/assets/heart.png"
              alt="Coração"
              className={styles.imgHeart}
            />{" "}
            E MUITO
            <img
              src="/assets/coffe.png"
              alt="Café"
              className={styles.imgCoffe}
            />
          </p>
        </div>
        <div className={styles.nav}>
          <div className={styles.container_content}>
            <img
              src="/assets/lupa.png"
              alt="Lupa de pesquisa"
              className={styles.imgSearch}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
