import React from "react";
import {Button, Card} from "react-bootstrap";
import Details from "./Details";
import {btn, btText, card, img, txt} from "./index"


function NewsItem(props) {
    const {imageUrl, alt, description, title, author, channel, date, urlNews} = props
    return (
        <>
            <Card style={card}>
                <Card.Img style={img} variant="top" src={imageUrl} alt={alt}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text style={txt}>
                        {description}
                    </Card.Text>
                    <div style={btText}>
                        <div><Details author={author} channel={channel} date={date}/></div>
                        <div><Button href={urlNews} target="_blank" style={btn}>Read more</Button></div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default NewsItem;
