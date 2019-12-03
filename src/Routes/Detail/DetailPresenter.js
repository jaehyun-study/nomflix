import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 16px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 4px;
`;

const IMDb = styled.a`
  padding: 0px 8px;
  background-color: rgb(245, 197, 24);
  color: black;
  font-weight: 900;
  border-radius: 2px;
`;

const Country = styled.span`
  margin: 0px 4px;
`;

const ProductionContainer = styled.div`
  margin: 12px 0;
  display: flex;
  flex-wrap: nowrap;
`;
const Production = styled.span``;

const ProductionLogo = styled.img`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  padding: 4px 4px;
  margin-right: 4px;
  height: 24px;
`;

const Overview = styled.p`
  margin-top: 20px;
  font-size: 14px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

function emoji(country) {
  const offset = 127397;
  const A = 65;
  const Z = 90;
  const f = country.codePointAt(0);
  const s = country.codePointAt(1);
  if (country.length !== 2 || f > Z || f < A || s > Z || s < A) {
    return null;
  } else {
    return String.fromCodePoint(f + offset) + String.fromCodePoint(s + offset);
  }
}

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>

          <ItemContainer>
            {result.imdb_id ? (
              <IMDb
                href={`https://www.imdb.com/title/${result.imdb_id}/`}
                target="_blank"
              >
                IMDb
              </IMDb>
            ) : null}
            {result.production_countries ? (
              <Country>
                {result.production_countries.map((country, index) =>
                  emoji(country.iso_3166_1)
                )}
              </Country>
            ) : result.origin_country ? (
              <Country>
                {result.origin_country.map((country, index) => emoji(country))}
              </Country>
            ) : null}
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <ProductionContainer>
            {result.production_companies &&
              result.production_companies.map((production_companie, index) =>
                production_companie.logo_path ? (
                  <ProductionLogo
                    key={index}
                    src={`https://image.tmdb.org/t/p/original${production_companie.logo_path}`}
                    alt={production_companie.name}
                  />
                ) : null
              )}
          </ProductionContainer>
          <Overview>{result.overview}</Overview>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
