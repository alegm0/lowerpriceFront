/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import imageMark from '../../assets/img/imagen-marca.jpeg';
import carousel from '../../assets/img/carousel.svg';

function Carousel ({ list }) {
    const [groupsItems, setGroupsItems] = useState([]);
    const [positionGroup, setPositionGroup] = useState({init: 0, finish: 4});

    useEffect(() => {
        const countList = list.length;
        if (countList > 0) {
            const resultado = countList / 4;
            const groups = [];
            let algo = 0;
            for (let index = 0; index < resultado; index++) {
                groups.push({ init: algo  , finish: algo + 4 });
                algo+= 4;
            }
            setGroupsItems(groups);
            setPositionGroup(groups[0]);
        }
    }, [list]);

    setTimeout(() => {
    }, 3000);

    return (
        <div style={{ width: '50rem', overflow: 'hidden', margin: 'auto' }}>
            <div style={{display: "flex", width: 'max-content'}}>
                {list.length > 0 &&
                    list.slice(positionGroup.init, positionGroup.finish).map((mark, index) => (
                        <div style={{ width: '20rem' }} key={index}>
                            <Card className="card-my-product">
                                <div className="card-header-my-product" style={{marginTop:"inherit"}}>
                                    <Card.Img src={imageMark}></Card.Img>
                                </div>
                                <Card.Body className="card-footer-my-product">
                                    <div className="card-info-my-product">
                                        <span>{mark.name} {index}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                }
            </div>
            <div style={{ width: 'fit-content', overflow: 'hidden', margin: 'auto' }}>
                <div style={{display: "flex", width: 'max-content'}}>
                    {groupsItems.map((item, index) => (
                        <div key={index} onClick={() => {setPositionGroup({...item}) }} style={{marginRight: "1rem"}}>
                            <img key={index} src={carousel}/>
                        </div>     
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Carousel;