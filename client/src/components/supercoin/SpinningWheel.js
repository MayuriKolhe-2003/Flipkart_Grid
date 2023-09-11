import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './SpinWheel.css';


const SpinningWheel = ({ sections, onSpin }) => {
    const [spinning, setSpinning] = useState(false);
    const wheelRef = useRef(null);
    const [btnSpin, setBtn] = useState('Spin Me');
    const { user } = useSelector((state) => state.userReducer);

    const checkSpin = async () => {

        const resp = await axios.get(`api/accounts/spin?id=${user._id}`)
        console.log(resp);
        if (resp) {
            setSpinning(resp.data);
            if (resp.data) {
                setBtn('Spinned')
            }
        }
    }



    const spin = () => {



        if (!spinning) {
            //     axios.get(`api/accounts/setspin?id=${user._id}`)
            // .then((r)=>{
            //     setSpinning(r.data);
            //     console.log(r);
            // })
            // .catch((e)=>{
            //     console.log(e);
            // })
            const randomDegree = Math.floor(Math.random() * 360); // Random degree for rotation
            const spins = 10; // Number of complete spins
            const totalRotation = 360 * spins + randomDegree;

            setSpinning(true);
            wheelRef.current.style.transition = 'transform 3s ease-out';
            wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;

            setTimeout(() => {
                const selectedSection = Math.floor(randomDegree / (360 / sections.length));
                //setSpinning(false);
                onSpin(sections[selectedSection]);
            }, 3500); // Wait for 3.5 seconds to match the animation duration

        }
        setBtn('Spinned')
        // setSpinning(true)

    };

    // useEffect(() => {
    //     checkSpin();
    // }, [spinning])

    return (
        <div className="spinning-wheel-container">
            <div className={`spinning-wheel ${spinning ? 'spinning' : ''}`} ref={wheelRef}>
                {sections.map((section, index) => (
                    <div className={`wheel-section section-${index}`} key={index}>
                        {'coins'}
                    </div>
                ))}
            </div>
            <button className="spin-button" onClick={spin}>
                {btnSpin}
            </button>
        </div>
    );
};

export default SpinningWheel;
