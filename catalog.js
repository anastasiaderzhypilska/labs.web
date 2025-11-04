import React, { useContext, useMemo, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import ZooCard from "../zoocard/zoocard";
import { ZooContext } from '../../zoocontext';

import "./catalog.css";

function Catalog() {
  const { zoos } = useContext(ZooContext);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const types = useMemo(() => ["All", ...Array.from(new Set(zoos.map(z => z.type)))], [zoos]);

  const filtered = useMemo(() => {
    return zoos.filter(z => {
      const matchesSearch = z.name.toLowerCase().includes(search.toLowerCase().trim());
      const matchesType = filterType === "All" ? true : z.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [zoos, search, filterType]);

  return (
    <div className="catalog-page">
      <Header />
      <main className="catalog-main">
        <h2>Zoo Catalog</h2>
        <div className="catalog-controls">
          <input
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={filterType} onChange={e => setFilterType(e.target.value)}>
            {types.map((t, i) => <option key={i} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="catalog-grid">
          {filtered.length ? filtered.map(zoo => <ZooCard key={zoo.id} zoo={zoo} />)
            : <p>No zoos found.</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Catalog;
