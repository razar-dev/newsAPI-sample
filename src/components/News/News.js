import React, {useEffect, useState} from "react";
import axios from "axios";
import NewsItem from "./Item/NewsItem";
import Spinner from "./Spinner/Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import {Col, Row} from "react-bootstrap";
import {card, Container, Header} from "./index";
import {endpointPath} from "../../config/api";


function News(props) {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);

    document.title = `${props.category.toUpperCase()} - News`;

    const updateNews = async () => {
        try {
            const response = await axios.get(endpointPath(props.country, props.category, page, props.pageSize), {
                /*headers: {
                    "origin": "http://localhost:3001",
                    "referer": "http://localhost:3001/"
                }*/
            });
            setLoading(true);
            const parsedData = response.data;
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        updateNews();
    }, []);

    const fetchMoreData = async () => {
        const response = await axios.get(endpointPath(props.country, props.category, page + 1, props.pageSize));
        setPage(page + 1);
        const parsedData = response.data;
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };

    return (
        <>
            <Header>
            </Header>
            {loading && <Spinner/>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
            >
                <Container>
                    <Row>
                        {articles.map((element) => {
                            return (
                                <Col
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                    style={card}
                                    key={element.url}
                                >
                                    <NewsItem
                                        title={element.title}
                                        description={element.description}
                                        author={element.author}
                                        date={element.publishedAt}
                                        channel={element.source.name}
                                        publishedAt={element.publishedAt}
                                        imageUrl={
                                            element.urlToImage === null
                                                ? element.visibility = false
                                                : element.urlToImage
                                        }
                                        urlNews={element.url}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </InfiniteScroll>
        </>
    );
}

News.defaultProps = {
    country: "us",
    pageSize: 7,
    category: "general",
};
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;
