import React, { useEffect, useState, PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SideBar from './SideBar';
import axios from '../../adapters/axios'
import { useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';


function Wrapper() {
    const [orders, setorders] = useState([]);
    const { user } = useSelector((state) => state.userReducer);


    const getOrders = async () => {
        const response = await axios.get('/order/allorders');
        setorders(response.data);
        //console.log(orders);
    }

    const desiredSellerId = user._id; // Replace with the seller's ID
    // Get the current date and time
    const currentDate = new Date();

    // Create an array to store the results for the last 5 days
    const results = [];
    // Loop for the last 5 days
    for (let i = 0; i < 5; i++) {
        // Calculate the date for the current iteration
        const currentDateMinusDays = new Date(currentDate);
        currentDateMinusDays.setDate(currentDate.getDate() - i);

        // Format the date in "YYYY-MM-DD" format
        const formattedDate = currentDateMinusDays.toISOString().split("T")[0];

        // Filter and calculate total quantity for the current date
        const totalQtySold = orders.reduce((totalQty, order) => {
            // Check if the order date matches the formatted date
            if (order.orderDate.startsWith(formattedDate)) {
                // Find items sold by the desired seller on the current date
                const itemsSoldBySeller = order.items.filter(
                    (item) => item.seller.id === desiredSellerId
                );

                // Sum up the quantities of items sold by the seller
                const qtySoldBySeller = itemsSoldBySeller.reduce(
                    (qtySum, item) => qtySum + item.qty,
                    0
                );

                return totalQty + qtySoldBySeller;
            }

            return totalQty;
        }, 0);

        // Push the result for the current date into the results array
        results.push({ date: formattedDate, totalQtySold: totalQtySold });
    }
    console.log(results);
    //setorders(results)








    useEffect(() => {
        getOrders();
    }, [])


    return (
      
            <div id="wrapper" width="100%">

                <SideBar />
                <div className="divmaldito my-5" s>

                    <Typography variant='h6' tyle={{ marginTop: 50 }}>
                        Past 5 days Stats
                    </Typography>
                    <ResponsiveContainer width="60%" height="60%">
                        <LineChart width={300} height={300} data={results} margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="totalQtySold" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>


                </div>
            </div>
       
    )
}
export default Wrapper;