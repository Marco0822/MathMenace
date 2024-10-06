import styles from "@/styles/Home.module.css";
import Spline from "@splinetool/react-spline";


export default function Home() {
  return (
    <>
        <main className={styles.main}>
          <Spline scene="https://prod.spline.design/6L7p54Vza-jC8aBM/scene.splinecode" />
        </main>
    </>
  );
}
