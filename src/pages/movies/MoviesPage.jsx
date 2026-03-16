import { useEffect, useState, useCallback } from "react";
import useApi from "../../api/useApi";
import { API_URLS } from "../../api/apiUrls";
import Spinner from "../../components/ui/Spinner";
import noImage from "../../assests/noimage.jpg";
import Layout from "../../components/layout/Layout";

  const MoviesPage = () => {
  const movieService = useApi(API_URLS.GET_TOP_RATED_MOVIES);
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loader, setLoader] = useState(false);

  const fetchMovies = useCallback(async () => {
    setLoader(true);

    try {
      const res = await movieService.call(pageNumber);
      setMovies(prev => [...prev, ...(res?.results || [])]);
    } catch (err) {
      console.log("Movie API error", err);
    } finally {
      setLoader(false);
    }
    }, [pageNumber]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 150;

      if (isBottom && !loader) {
        setPageNumber(p => p + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loader]);
  
  const breadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Movies" }
  ];

  return (
    <Layout breadcrumb={breadcrumbItems}>

      <div style={{ padding: "2rem" }}>

        <h2>🎬 Top Rated Movies</h2>

        {movies.length > 0 ? (
          <div className="movie-grid">
            {movies.map((m) => (
              <div key={m.id} className="movie-card">

                <img
                  src={
                    m.poster_path
                      ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
                      : noImage
                  }
                  alt={m.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = noImage;
                  }}
                />

                <h4>{m.title}</h4>
                <p>⭐ {m.vote_average.toFixed(1)}</p>

              </div>
            ))}
          </div>
        ) : (
          !loader && <h3>No Movies Found</h3>
        )}

        {loader && <Spinner showGlobal={loader} />}

      </div>
    </Layout>
  );
};

export default MoviesPage;
