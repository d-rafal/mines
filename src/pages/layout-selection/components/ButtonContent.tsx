import styles from "./ButtonContent.module.scss";

interface ButtonContentProps {
  layoutSize: string;
  minesQn: string;
}

const ButtonContent = ({ layoutSize, minesQn }: ButtonContentProps) => {
  return (
    <div>
      <p className={styles.layoutSize}>{layoutSize}</p>
      <p className={styles.minesQn}>{minesQn}</p>
    </div>
  );
};

export default ButtonContent;
