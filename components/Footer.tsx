import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        {"This is a fanmade site. All in-game artwork used belong to "}
        <a href="https://projectmoon.studio/"
          target="_blank" rel="noopener noreferrer">
          {"PROJECT MOON"}
        </a>
      </p>
      <p>
        {" By "}
        <a href="https://github.com/darylhcw"
          target="_blank" rel="noopener">
          {"Daryl"}
        </a>
        {" for "}
        <a href="https://limbuscompany.com/"
          target="_blank" rel="noopener noreferrer">
          {"LIMBUS COMPANY"}
        </a>
      </p>
    </footer>
  )
}