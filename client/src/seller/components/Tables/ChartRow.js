import React from 'react';


function ChartRow(props){
    return (
                <tr>
                    <td>{props._id}</td>
                    <td>{props.title.shortTitle}</td>
                    <td>{props.price.cost}</td>
                    <td>{props.price.discount} %</td>
                    <td>{props.category}</td>
                    
                    
                    
                </tr>
            )
    }
    
        

export default ChartRow;