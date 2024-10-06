import { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const npcList = useRef([]);
  const buyerList = [0, 1, 0, 1];

  function onLoad(spline) {
    const npc1 = spline.findObjectByName('npc1');
    const npc2 = spline.findObjectByName('npc2');
    const npc3 = spline.findObjectByName('npc3');
    if (npc1) {
      npcList.current.push(npc1);
    }
    if (npc2) {
      npcList.current.push(npc2);
    }
    if (npc3) {
      npcList.current.push(npc3);
    }
    
  }

  function queueAnimation() {
    npcList.current.forEach((npc, index) => {
      setTimeout(() => {
        if (buyerList[index] === 1) {
          animateWalk(npc);
        } else {
          animateBuy(npc);
        }

      }, index * 500); // Delay each animation by 500ms times the index
    });
  }

  function animateWalk(obj) {
    const speed = 10;
    const duration = 5000; // Duration of the animation in milliseconds
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      // Update the position of the object
      if (obj && progress < 1) {
        obj.position.x += speed;
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function animateBuy(obj) {
    const xSpeed = 10; // Speed in x direction
    const zSpeed = 10; // Speed in z direction
    let xTotalMoved = 0; // Total x movement
    let zTotalMoved = 0; // Total z movement
    let phase = 1; // Current phase of the movement
  
    function step() {
      if (phase === 1) { // Move in positive x direction
        if (xTotalMoved < 1000) {
          obj.position.x += xSpeed;
          xTotalMoved += xSpeed;
        } else {
          phase = 2; // Switch to moving in positive z direction
        }
      } else if (phase === 2) { // Move in positive z direction
        if (zTotalMoved < 150) {
          obj.position.z -= zSpeed;
          zTotalMoved += zSpeed;
        } else {
          phase = 3; // Switch to moving in negative z direction
          zTotalMoved = 0; // Reset z movement counter for next phase
        }
      } else if (phase === 3) { // Move in negative z direction
        if (zTotalMoved < 150) {
          obj.position.z += zSpeed;
          zTotalMoved += zSpeed;
        } else {
          phase = 4; // Continue moving in positive x direction indefinitely
        }
      } else if (phase === 4) { // Continue in positive x direction
        obj.position.x += xSpeed;
      }
  
      if (phase < 4 || (phase === 4 && obj)) {
        requestAnimationFrame(step); // Continue animation
      }
    }
  
    requestAnimationFrame(step);
  }
  

  return (
    <main className={styles.main}>
      <Spline
        scene="https://prod.spline.design/6L7p54Vza-jC8aBM/scene.splinecode"
        onLoad={onLoad}
      />
      <button type="button" onClick={queueAnimation}>
        Animate Cube
      </button>
    </main>
  );
}