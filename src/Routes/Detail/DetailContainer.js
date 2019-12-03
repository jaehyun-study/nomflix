import React from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi } from "api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      collection: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie")
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
      return push("/");
    }
    let result = null;
    let collection = null;
    let collectionId = null;
    try {
      if (isMovie) {
        ({
          data: result,
          data: {
            belongs_to_collection: { id: collectionId }
          }
        } = await movieApi.movieDetail(parseId));
        ({ data: collection } = await movieApi.collection(collectionId));
      } else {
        ({ data: result } = await tvApi.showDetail(parseId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result, collection });
    }
  }

  render() {
    const { result, collection, error, loading } = this.state;
    return (
      <DetailPresenter
        result={result}
        collection={collection}
        error={error}
        loading={loading}
      />
    );
  }
}
