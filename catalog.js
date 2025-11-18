import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import ZooCard from "../zoocard/zoocard";

import { getZoos } from "../../api/zoos";

import "./catalog.css";

function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialQuery);
  const [debouncedSearch, setDebouncedSearch] = useState(initialQuery);

  const [filterType, setFilterType] = useState("All");
  const [animalRange, setAnimalRange] = useState("All");

  const [zoos, setZoos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const types = ["All", "Urban Area", "Wildlife Reserve", "National Park"];

  const animalRanges = [
    { label: "All", min: 0, max: Infinity },
    { label: "0 - 200", min: 0, max: 200 },
    { label: "201 - 300", min: 201, max: 300 },
    { label: "301 - 400", min: 301, max: 400 },
    { label: "401 - 500", min: 401, max: 500 },
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setSearchParams(search ? { q: search } : {});
    }, 500);

    return () => clearTimeout(handler);
  }, [search, setSearchParams]);

  const fetchZoos = async () => {
    setLoading(true);
    setError("");

    try {
      let filters = {};

      if (debouncedSearch.trim() !== "") {
        filters.q = debouncedSearch;
      } else if (filterType !== "All") {
        filters.type = filterType;
      }

      const selectedRange = animalRanges.find((r) => r.label === animalRange);
      if (selectedRange) {
        if (selectedRange.min !== 0) filters.animals_gte = selectedRange.min;
        if (selectedRange.max !== Infinity) filters.animals_lte = selectedRange.max;
      }

      const data = await getZoos(filters);
      setZoos(data);
    } catch (err) {
      setError("Failed to load zoos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZoos();
  }, [debouncedSearch, filterType, animalRange]);

  return (
    <div className="catalog-page">
      <Header />
      <main className="catalog-main">
        <h2>Zoo Catalog</h2>

        {loading && <div className="loader">Loading...</div>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <>
            <div className="catalog-controls">
              <input
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {types.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                value={animalRange}
                onChange={(e) => setAnimalRange(e.target.value)}
              >
                {animalRanges.map((range, i) => (
                  <option key={i} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="catalog-grid">
              {zoos.length ? (
                zoos.map((zoo) => <ZooCard key={zoo.id} zoo={zoo} />)
              ) : (
                <p>No zoos found.</p>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Catalog;
