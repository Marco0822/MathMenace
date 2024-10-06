import { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import styles from '@/styles/Home.module.css';
import { generateBooleanArray } from './helper'; // Import the generateBooleanArray function

export default function Home() {
  const npcList = useRef([]);
  const [buyerList, setBuyerList] = useState(new Array(20).fill(false)); // State to hold buyerList
  const [currentPrice, setCurrentPrice] = useState(null); // State to hold current price

  function onLoad(spline) {
    // const npcListNames = ['npc1', 'npc2', 'npc3', 'npc4', 'npc5', 'npc6', 'npc7', 'npc8', 'npc9', 'npc10', 'npc11', 'npc12', 'npc13', 'npc14', 'npc15', 'npc16', 'npc17', 'npc18', 'npc19', 'npc20'];
    const npcListNames = ['npc1', 'npc2', 'npc3', 'npc4', 'npc5', 'npc6', 'npc7', 'npc8', 'npc9', 'npc10'];


    npcListNames.forEach(npcName => {
      const npc = spline.findObjectByName(npcName);
      if (npc) {
        npcList.current.push(npc);
      }
    });
  }

  function queueAnimation() {
    const delay = 1500; // Delay between each animation in milliseconds
    npcList.current.forEach((npc, index) => {
      setTimeout(() => {
        if (buyerList[index]) {
          animateWalk(npc);
        } else {
          animateBuy(npc);
        }
      }, index * delay); // Delay each animation by delay times the index
    });
  }

  function animateWalk(obj) {
    const speed = 5;
    const duration = 5000; // Duration of the animation in milliseconds
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      // Update the position of the object
      if (obj) {
        obj.position.x += speed;
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function animateBuy(obj) {
    const xSpeed = 5; // Speed in x direction
    const zSpeed = 5; // Speed in z direction
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
          obj.rotation.y += Math.PI / 2; // Rotate the object 90
        }
      } else if (phase === 2) { // Move in positive z direction
        if (zTotalMoved < 150) {
          obj.position.z -= zSpeed;
          zTotalMoved += zSpeed;
        } else {
          phase = 3; // Switch to moving in negative z direction after a pause
          zTotalMoved = 0; // Reset z movement counter for next phase

          // Add a pause between phase 2 and phase 3
          setTimeout(() => {
            requestAnimationFrame(step); // Continue animation after pause
          }, 1000); // Pause for 1 second (1000 ms)]
          return; // Stop the current frame request until timeout completes
          
        }
      } else if (phase === 3) { // Move in positive x direction for 100 units
        obj.rotation.y = Math.PI / 2; // Rotate the object 90
        if (xTotalMoved < 1100) {
          obj.position.x += xSpeed;
          xTotalMoved += xSpeed;
        } else {
          phase = 4; // Switch to moving in positive z direction
        }
      }
      
      else if (phase === 4) { // Move in negative z direction
        obj.rotation.y = 0; // Rotate the object back to original orientation
        if (zTotalMoved < 150) {
          obj.position.z += zSpeed;
          zTotalMoved += zSpeed;
        } else {
          phase = 5; // Continue moving in positive x direction indefinitely
          obj.rotation.y += Math.PI / 2; // Rotate the object 90
        }
      } else if (phase === 5) { // Continue in positive x direction
        obj.position.x += xSpeed;
      }

      if (phase < 5 || (phase === 5 && obj)) {
        requestAnimationFrame(step); // Continue animation
      }
    }

    requestAnimationFrame(step);
  }

  // Function to handle price setting and generate buyer list
  const handleSetPrice = () => {
    const priceInput = document.getElementById('priceInput').value;

    const priceValue = parseFloat(priceInput); // Parse the input value
    setCurrentPrice(priceValue); // Update state with the price
    console.log(`Current Price set to: ${priceValue}`); // Optional log for confirmation

    // Generate buyerList based on the input price and set it in state
    // const n = Math.min(Math.max(1, Math.round(20 - priceValue)), 20); // Calculate `n` based on price, for demo purposes
    const newBuyerList = generateBooleanArray(priceValue, npcList.current.length); // Generate a new buyer list
    setBuyerList(newBuyerList);
    console.log(newBuyerList); // Optional log for confirmation
  };


  return (
    <main className={styles.main}>
      <Spline
        scene="https://prod.spline.design/SMIRnv5Yjpd5NmqT/scene.splinecode"
        onLoad={onLoad}
      />
      <button type="button" onClick={queueAnimation}>
        Open Store!
      </button>

      {/* Input field for setting the price */}
      <input type="number" id="priceInput" placeholder="Enter price" />
      <button type="button" onClick={handleSetPrice}>
          Set Price
      </button>

  
            
    </main>
  );
}
