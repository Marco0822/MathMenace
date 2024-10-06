// import styles from "@/styles/Home.module.css";
// import Spline from "@splinetool/react-spline";


// export default function Home() {
//   return (
//     <>
//         <main className={styles.main}>
//           <Spline scene="https://prod.spline.design/6L7p54Vza-jC8aBM/scene.splinecode" />
//         </main>
//     </>
//   );
// }

import { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const cube = useRef();

  function onLoad(spline) {
    const obj = spline.findObjectByName('npc2');

    cube.current = obj;
  }

  function moveObj() {
    cube.current.visible = true;
    console.log(cube.current)
    cube.current.position.x += 10;
  }

  

  return (
    <main className={styles.main}>
      <Spline
        scene="https://prod.spline.design/6L7p54Vza-jC8aBM/scene.splinecode"
        onLoad={onLoad}
      />
      <button type="button" onClick={moveObj}>
        Move Cube
      </button>
    </main>
  );
}

