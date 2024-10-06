import { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import styles from '@/styles/Home.module.css';

export default function Home() {
    const cube = useRef();
    const [currentPrice, setCurrentPrice] = useState(null); // State to hold current price

    function onLoad(spline) {
        const obj = spline.findObjectByName('npc2');
        cube.current = obj;
    }

    function moveObj() {
        cube.current.visible = true;
        console.log(cube.current);
        cube.current.position.x += 10;
    }

    // Function to handle price setting
    const handleSetPrice = () => {
        const priceInput = document.getElementById('priceInput').value;
        setCurrentPrice(parseFloat(priceInput)); // Update state with the price
        console.log(`Current Price set to: ${currentPrice}`);
    };

    // Function to handle opening store
    const handleOpenStore = () => {
        console.log("The store is now open!");
        console.log(`Current Price: ${currentPrice}`);
    };

    return (
        <main className={styles.main}>
            <Spline
                scene="https://prod.spline.design/6L7p54Vza-jC8aBM/scene.splinecode"
                onLoad={onLoad}
            />
            <button type="button" onClick={moveObj}>
                Move Cube
            </button>

            {/* Input field for setting the price */}
            <input type="number" id="priceInput" placeholder="Enter price" />
            <button type="button" onClick={handleSetPrice}>
                Set Price
            </button>

            <button type="button" onClick={handleOpenStore}>
                Open Store
            </button>
        </main>
    );
}