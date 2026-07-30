import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { foodPageData } from '../data/sections';
import {
  filterPlaces,
  getVibeSuggestions,
  buildActiveFilterChips,
  buildDirectionsUrl,
} from '../lib/foodPageFilters';

export default function FoodPage() {
  const { hero, search, mustTaste, places, riverside, stories } = foodPageData;
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [activeVibe, setActiveVibe] = useState<string | null>(searchParams.get('vibe'));
  const [priceFilter, setPriceFilter] = useState<string>(searchParams.get('price') ?? 'Any');
  const [openNowFilter, setOpenNowFilter] = useState(searchParams.get('open') === 'true');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>(
    searchParams.get('neighborhood') ?? 'Any',
  );
  const [petFriendlyFilter, setPetFriendlyFilter] = useState(searchParams.get('pet') === 'true');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showAllVibes, setShowAllVibes] = useState(false);
  const [showStructuredFilters, setShowStructuredFilters] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState<number>(-1);

  useEffect(() => {
    const next = new URLSearchParams();
    if (searchQuery.trim()) next.set('q', searchQuery.trim());
    if (activeVibe) next.set('vibe', activeVibe);
    if (priceFilter !== 'Any') next.set('price', priceFilter);
    if (neighborhoodFilter !== 'Any') next.set('neighborhood', neighborhoodFilter);
    if (openNowFilter) next.set('open', 'true');
    if (petFriendlyFilter) next.set('pet', 'true');

    const current = searchParams.toString();
    if (next.toString() !== current) {
      setSearchParams(next, { replace: true });
    }
  }, [
    searchQuery,
    activeVibe,
    priceFilter,
    openNowFilter,
    neighborhoodFilter,
    petFriendlyFilter,
    searchParams,
    setSearchParams,
  ]);

  const featuredVibes = places.vibeTags.filter((v) => v.featured);
  const hiddenVibes = places.vibeTags.filter((v) => !v.featured);

  const filterOptions = useMemo(
    () => ({
      query: searchQuery,
      activeVibe,
      price: priceFilter,
      openNow: openNowFilter,
      neighborhood: neighborhoodFilter,
      petFriendly: petFriendlyFilter,
    }),
    [searchQuery, activeVibe, priceFilter, openNowFilter, neighborhoodFilter, petFriendlyFilter],
  );

  const vibeSuggestions = useMemo(
    () => getVibeSuggestions(searchQuery, places.vibeTags),
    [searchQuery, places.vibeTags],
  );

  const filteredPlaces = useMemo(
    () => filterPlaces(places.places, places.vibeTags, filterOptions),
    [places.places, places.vibeTags, filterOptions],
  );

  const visiblePlaces = filteredPlaces.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPlaces.length;

  const selectedPlace = useMemo(
    () => places.places.find((p) => p.id === selectedPlaceId) ?? null,
    [places.places, selectedPlaceId],
  );

  useEffect(() => {
    if (!selectedPlaceId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPlaceId(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPlaceId]);

  const activeFilterChips = useMemo(
    () => buildActiveFilterChips(filterOptions, places.vibeTags),
    [filterOptions, places.vibeTags],
  );

  const clearAllFilters = () => {
    setActiveVibe(null);
    setPriceFilter('Any');
    setNeighborhoodFilter('Any');
    setOpenNowFilter(false);
    setPetFriendlyFilter(false);
  };

  const removeFilter = (key: string) => {
    switch (key) {
      case 'vibe':
        setActiveVibe(null);
        break;
      case 'price':
        setPriceFilter('Any');
        break;
      case 'neighborhood':
        setNeighborhoodFilter('Any');
        break;
      case 'openNow':
        setOpenNowFilter(false);
        break;
      case 'petFriendly':
        setPetFriendlyFilter(false);
        break;
    }
  };

  const handleDishClick = (dishTitle: string) => {
    setSearchQuery(dishTitle);
    const placesSection = document.getElementById('places-directory');
    if (placesSection) placesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleVibeSuggestion = (vibeId: string) => {
    setActiveVibe(vibeId);
    setSearchQuery('');
    const placesSection = document.getElementById('places-directory');
    if (placesSection) placesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleRiversideCta = () => {
    setActiveVibe('riverside');
    setSearchQuery('');
    setPriceFilter('Any');
    setNeighborhoodFilter('Any');
    setOpenNowFilter(false);
    setPetFriendlyFilter(false);
    const placesSection = document.getElementById('places-directory');
    if (placesSection) placesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollMustTaste = (direction: 'left' | 'right') => {
    const el = document.getElementById('must-taste-scroll');
    if (el) el.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' });
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[795px] overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={hero.imageUrl}
            alt="Steaming bowl of traditional Vietnamese noodles with fresh herbs, sliced pork, and crispy crackers"
            className="w-full h-full object-cover scale-110 animate-breath"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-background/80 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop pb-hero-pad-sm md:pb-hero-pad-lg w-full">
          <div className="ml-auto max-w-3xl text-right">
            <span className="font-label text-label text-on-primary-fixed-variant bg-primary-fixed px-3 py-1 rounded-full w-fit mb-4 inline-block">
              {hero.eyebrow}
            </span>
            <h1
              className="font-display-lg-mobile md:text-display-lg text-on-surface mb-6 drop-shadow-lg"
              style={{ textShadow: '0 2px 24px rgba(30, 27, 18, 0.35)' }}
            >
              {hero.title}
            </h1>
            <p
              className="text-on-surface-variant text-body md:text-lg max-w-xl ml-auto leading-relaxed"
              style={{ textShadow: '0 1px 12px rgba(30, 27, 18, 0.35)' }}
            >
              {hero.description}
            </p>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => {
                  const placesSection = document.getElementById('places-directory');
                  if (placesSection) placesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="bg-primary-container text-on-primary-container px-8 py-4 rounded-lg font-label text-label uppercase tracking-widest hover:translate-y-[-4px] transition-all duration-300 shadow-lg btn-hover"
              >
                {hero.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Strip */}
      <section className="bg-surface-container rounded-2xl mx-margin-mobile md:mx-margin-desktop max-w-3xl md:max-w-4xl lg:mx-auto p-4 mb-section-gap shadow-sm">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setHighlightedSuggestion(-1);
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
            onKeyDown={(e) => {
              if (vibeSuggestions.length === 0) return;
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSearchFocused(true);
                setHighlightedSuggestion((i) =>
                  i < vibeSuggestions.length - 1 ? i + 1 : vibeSuggestions.length - 1,
                );
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHighlightedSuggestion((i) => (i > 0 ? i - 1 : 0));
              } else if (e.key === 'Enter' && highlightedSuggestion >= 0) {
                e.preventDefault();
                handleVibeSuggestion(vibeSuggestions[highlightedSuggestion].id);
              } else if (e.key === 'Escape') {
                setSearchFocused(false);
              }
            }}
            placeholder={search.placeholder}
            className="w-full bg-surface-container-lowest rounded-xl pl-12 pr-4 py-3 font-body text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {searchFocused && vibeSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 overflow-hidden z-50">
              <p className="px-4 py-2 font-label text-label text-on-surface-variant uppercase tracking-wider">
                {search.suggestionsTitle}
              </p>
              {vibeSuggestions.map((vibe, index) => (
                <button
                  key={vibe.id}
                  onMouseDown={() => handleVibeSuggestion(vibe.id)}
                  className={`w-full text-left px-4 py-3 font-body text-on-surface flex items-center gap-3 ${
                    highlightedSuggestion === index
                      ? 'bg-surface-container'
                      : 'hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-primary">tag</span>
                  {vibe.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Places to Eat Directory */}
      <section id="places-directory" className="mt-section-gap px-margin-mobile md:px-margin-desktop scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <span className="font-label text-label uppercase tracking-[0.1em] text-secondary font-semibold block mb-3">
              {places.subtitle}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="font-headline text-headline text-on-surface">{places.title}</h2>
                <p className="font-body text-on-surface-variant mt-2 max-w-2xl">{places.description}</p>
              </div>
              <p className="font-body text-sm text-on-surface-variant shrink-0">
                <span className="font-semibold text-on-surface">{filteredPlaces.length}</span> place
                {filteredPlaces.length !== 1 ? 's' : ''} match{filteredPlaces.length === 1 ? 'es' : ''} your filters
              </p>
            </div>
          </div>

          {/* Vibe chips */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {featuredVibes.map((vibe) => (
              <button
                key={vibe.id}
                onClick={() => setActiveVibe(activeVibe === vibe.id ? null : vibe.id)}
                className={`px-4 py-2 rounded-full font-body text-sm transition-all border ${
                  activeVibe === vibe.id
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-container text-on-surface border-outline-variant hover:border-primary/50'
                }`}
              >
                {vibe.label}
              </button>
            ))}
            {!showAllVibes ? (
              <button
                onClick={() => setShowAllVibes(true)}
                className="px-4 py-2 rounded-full font-body text-sm bg-surface-container text-secondary border border-outline-variant hover:border-secondary/50 transition-all flex items-center gap-1"
              >
                More vibes
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            ) : (
              <>
                {hiddenVibes.map((vibe) => (
                  <button
                    key={vibe.id}
                    onClick={() => setActiveVibe(activeVibe === vibe.id ? null : vibe.id)}
                    className={`px-4 py-2 rounded-full font-body text-sm transition-all border ${
                      activeVibe === vibe.id
                        ? 'bg-primary text-on-primary border-primary'
                        : 'bg-surface-container text-on-surface border-outline-variant hover:border-primary/50'
                    }`}
                  >
                    {vibe.label}
                  </button>
                ))}
                <button
                  onClick={() => setShowAllVibes(false)}
                  className="px-4 py-2 rounded-full font-body text-sm bg-surface-container text-secondary border border-outline-variant hover:border-secondary/50 transition-all flex items-center gap-1"
                >
                  Less
                  <span className="material-symbols-outlined text-sm">expand_less</span>
                </button>
              </>
            )}
          </div>

          {/* Structured filters toggle (mobile only) */}
          <button
            onClick={() => setShowStructuredFilters((v) => !v)}
            className={`md:hidden w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-body text-sm border transition-all mb-4 ${
              showStructuredFilters
                ? 'bg-surface-container text-on-surface border-outline-variant'
                : 'bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:border-primary/50'
            }`}
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            {showStructuredFilters ? 'Fewer filters' : 'More filters'}
          </button>

          {/* Structured filters */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 ${showStructuredFilters ? 'grid' : 'hidden md:grid'}`}>
            <div className="space-y-2">
              <label className="font-label text-label text-on-surface-variant uppercase tracking-wider">
                {places.priceLabel}
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full bg-surface-container-lowest rounded-xl px-4 py-2.5 font-body text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 border border-outline-variant/30"
              >
                <option>Any</option>
                <option>$</option>
                <option>$$</option>
                <option>$$$</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-label text-label text-on-surface-variant uppercase tracking-wider">
                {places.neighborhoodLabel}
              </label>
              <select
                value={neighborhoodFilter}
                onChange={(e) => setNeighborhoodFilter(e.target.value)}
                className="w-full bg-surface-container-lowest rounded-xl px-4 py-2.5 font-body text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 border border-outline-variant/30"
              >
                <option>Any</option>
                {places.neighborhoods.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setOpenNowFilter((v) => !v)}
              className={`self-end flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-sm border transition-all ${
                openNowFilter
                  ? 'bg-success text-on-success border-success'
                  : 'bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:border-success/50'
              }`}
            >
              <span className="material-symbols-outlined text-sm">schedule</span>
              {places.openNowLabel}
            </button>
            <button
              onClick={() => setPetFriendlyFilter((v) => !v)}
              className={`self-end flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-sm border transition-all ${
                petFriendlyFilter
                  ? 'bg-secondary text-on-secondary border-secondary'
                  : 'bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:border-secondary/50'
              }`}
            >
              <span className="material-symbols-outlined text-sm">pets</span>
              {places.petFriendlyLabel}
            </button>
          </div>

          {/* Active filter chips */}
          {activeFilterChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {activeFilterChips.map((chip) => (
                <span
                  key={chip.key}
                  className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-surface-container-high text-on-surface font-body text-sm border border-outline-variant/30"
                >
                  {chip.label}
                  <button
                    onClick={() => removeFilter(chip.key)}
                    className="w-5 h-5 rounded-full bg-surface-container hover:bg-error-container flex items-center justify-center transition-colors"
                    aria-label={`Remove ${chip.label}`}
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="font-label text-label text-secondary uppercase tracking-wider hover:text-primary transition-colors"
              >
                {places.clearAllLabel}
              </button>
            </div>
          )}

          {/* Place cards grid */}
          {visiblePlaces.length === 0 ? (
            <div className="text-center py-20 bg-surface-container rounded-3xl px-6">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">search_off</span>
              <h3 className="font-headline text-xl text-on-surface mb-2">{places.emptyHeading}</h3>
              <p className="font-body text-on-surface-variant mb-6">{places.emptyBody}</p>
              <button
                onClick={clearAllFilters}
                className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label text-label uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                {places.clearAllLabel}
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-10">
                {visiblePlaces.map((place) => (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => setSelectedPlaceId(place.id)}
                    className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col text-left"
                    aria-label={`View details for ${place.name}`}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={place.imageUrl}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                      {place.isOpen && (
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success text-on-success font-label text-label">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>
                          Open
                        </span>
                      )}
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur text-on-surface font-label text-label">
                        {place.price}
                      </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="font-headline text-xl text-on-surface">{place.name}</h3>
                        <span className="flex items-center gap-1 text-sm font-body text-on-surface-variant shrink-0">
                          <span className="material-symbols-outlined text-[16px] text-primary">star</span>
                          {place.rating}
                        </span>
                      </div>
                      <p className="font-body text-sm text-on-surface-variant mb-4 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        {place.neighborhood}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {place.vibes.slice(0, 2).map((vibeId) => {
                          const label = places.vibeTags.find((v) => v.id === vibeId)?.label ?? vibeId;
                          return (
                            <span
                              key={vibeId}
                              className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-body text-xs border border-outline-variant/20"
                            >
                              {label}
                            </span>
                          );
                        })}
                        {place.dishes.slice(0, 2).map((dish) => (
                          <span
                            key={dish}
                            className="px-2.5 py-1 rounded-full bg-primary-container/50 text-on-primary-container font-body text-xs"
                          >
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={() => setVisibleCount((c) => c + 6)}
                    className="bg-surface-container text-on-surface border border-outline-variant px-8 py-3 rounded-lg font-label text-label uppercase tracking-widest hover:bg-surface-container-high transition-colors"
                  >
                    {places.loadMoreLabel}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Place Detail Modal */}
      {selectedPlace && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="place-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPlaceId(null)}
          />
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-surface rounded-[32px] shadow-2xl overflow-hidden flex flex-col">
            <button
              onClick={() => setSelectedPlaceId(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-surface/90 backdrop-blur flex items-center justify-center text-on-surface hover:bg-error-container transition-colors"
              aria-label="Close place details"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="overflow-y-auto">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={selectedPlace.imageUrl}
                  alt={selectedPlace.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 md:left-8 text-white">
                  {selectedPlace.isOpen && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success text-on-success font-label text-label mb-3">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      Open now
                    </span>
                  )}
                  <h2 id="place-modal-title" className="font-headline text-3xl md:text-4xl">
                    {selectedPlace.name}
                  </h2>
                  <p className="font-body opacity-90 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    {selectedPlace.neighborhood}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-container text-on-primary-container font-body text-sm">
                    <span className="material-symbols-outlined text-[16px]">star</span>
                    {selectedPlace.rating}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-body text-sm border border-outline-variant/30">
                    {selectedPlace.price}
                  </span>
                  {selectedPlace.isPetFriendly && (
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-body text-sm">
                      <span className="material-symbols-outlined text-[16px]">pets</span>
                      {places.petFriendlyLabel}
                    </span>
                  )}
                </div>

                <p className="font-body text-on-surface-variant leading-relaxed">
                  {selectedPlace.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-surface-container rounded-2xl p-4">
                    <p className="font-label text-label text-on-surface-variant uppercase tracking-wider mb-2">
                      Hours
                    </p>
                    <p className="font-body text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary">schedule</span>
                      {selectedPlace.hours}
                    </p>
                  </div>
                  <div className="bg-surface-container rounded-2xl p-4">
                    <p className="font-label text-label text-on-surface-variant uppercase tracking-wider mb-2">
                      Dishes
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlace.dishes.map((dish) => (
                        <span
                          key={dish}
                          className="px-2.5 py-1 rounded-full bg-primary-container/50 text-on-primary-container font-body text-xs"
                        >
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-label text-label text-on-surface-variant uppercase tracking-wider mb-3">
                    Vibes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlace.vibes.map((vibeId) => {
                      const label = places.vibeTags.find((v) => v.id === vibeId)?.label ?? vibeId;
                      return (
                        <span
                          key={vibeId}
                          className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-body text-sm border border-outline-variant/30"
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <a
                  href={buildDirectionsUrl(selectedPlace.name, selectedPlace.neighborhood)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-on-primary px-6 py-3 rounded-lg font-label text-label uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg"
                >
                  <span className="material-symbols-outlined">directions</span>
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Must-Taste Icons */}
      <section className="mt-section-gap">
        <div className="px-margin-mobile md:px-margin-desktop flex justify-between items-end mb-8">
          <div>
            <h2 className="font-headline text-headline text-on-surface">{mustTaste.title}</h2>
            <p className="font-body text-on-surface-variant mt-2">{mustTaste.description}</p>
          </div>
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => scrollMustTaste('left')}
              className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary/5 transition-colors"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              onClick={() => scrollMustTaste('right')}
              className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary/5 transition-colors"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div
          id="must-taste-scroll"
          className="flex overflow-x-auto gap-gutter px-margin-mobile md:px-margin-desktop pb-8 hide-scrollbar snap-x snap-mandatory scroll-pl-6 md:scroll-pl-20"
        >
          {mustTaste.items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleDishClick(item.title)}
              className="flex-none w-[85vw] max-w-sm md:w-96 group text-left snap-start"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface-container relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-label text-label mb-1 opacity-90">{item.tag}</p>
                  <h3 className="font-headline text-2xl">{item.title}</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-body text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  {item.location}
                </span>
                <span className="font-label text-label text-primary">{item.price}</span>
              </div>
              {item.servingPlaceCount > 0 && (
                <p className="mt-2 font-body text-sm text-secondary">
                  {item.servingPlaceCount} place{item.servingPlaceCount !== 1 ? 's' : ''} serve this
                </p>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Riverside Elegance */}
      <section className="py-section-gap relative">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="relative w-full h-[600px] md:h-[700px]">
            <div className="absolute inset-0 w-full md:w-3/4 h-full rounded-[48px] overflow-hidden">
              <img
                src={riverside.imageUrl}
                alt="Evening dining tables by the Thu Bon River illuminated by silk lanterns"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-12 right-0 md:right-12 w-full md:w-5/12 bg-surface/85 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-xl border border-outline-variant/20">
              <span className="font-label text-label uppercase tracking-[0.1em] text-secondary font-semibold block mb-4">
                {riverside.eyebrow}
              </span>
              <h2 className="font-headline text-headline text-on-surface mb-6">{riverside.title}</h2>
              <p className="font-body text-on-surface-variant mb-8 leading-relaxed">{riverside.description}</p>
              <button
                onClick={handleRiversideCta}
                className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-3 rounded-lg font-body font-medium hover:opacity-90 transition-opacity shadow-lg"
              >
                {riverside.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen Stories */}
      <section className="mt-section-gap px-margin-mobile md:px-margin-desktop mb-24">
        <div className="mb-12">
          <h2 className="font-headline text-4xl text-on-surface mb-2">{stories.title}</h2>
          <p className="font-body text-on-surface-variant">{stories.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[320px_320px] gap-6">
          {/* Large Story Card */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer min-h-[360px] md:min-h-0">
            <img
              src={stories.stories[0].imageUrl}
              alt={stories.stories[0].title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
              <span className="font-label text-white/70 uppercase text-[10px] tracking-[0.2em] mb-2">
                {stories.stories[0].tag}
              </span>
              <h3 className="font-display-lg text-white text-3xl mb-4">{stories.stories[0].title}</h3>
              <p className="text-white/80 font-body max-w-md line-clamp-2">{stories.stories[0].excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-white font-label text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                Read Full Story
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Mini Story */}
          <div className="md:col-span-1 md:row-span-1 bg-surface-container rounded-3xl p-8 flex flex-col justify-between group cursor-pointer border border-outline-variant/10 hover:border-primary/30 transition-all min-h-[260px] md:min-h-0">
            <div>
              <span className="font-label text-tertiary-container text-[10px] uppercase tracking-[0.2em] block mb-4">
                {stories.miniStory.tag}
              </span>
              <h4 className="font-headline text-2xl mb-3 text-on-surface">{stories.miniStory.title}</h4>
              <p className="text-on-surface-variant font-body">{stories.miniStory.body}</p>
            </div>
            <span
              className="material-symbols-outlined text-tertiary-container/50 self-end"
              aria-hidden="true"
            >
              {stories.miniStory.icon}
            </span>
          </div>

          {/* Spice Card */}
          <div className="md:col-span-1 md:row-span-1 bg-tertiary-container rounded-3xl p-8 flex flex-col justify-between group cursor-pointer transition-all min-h-[260px] md:min-h-0">
            <div>
              <span className="font-label text-primary-fixed text-[10px] uppercase tracking-[0.2em] block mb-4">
                {stories.spiceCard.tag}
              </span>
              <h4 className="font-headline text-2xl mb-3 text-on-surface">{stories.spiceCard.title}</h4>
              <p className="text-on-surface-variant font-body">{stories.spiceCard.body}</p>
            </div>
            <span
              className="material-symbols-outlined text-primary-fixed/50 self-end"
              aria-hidden="true"
            >
              {stories.spiceCard.icon}
            </span>
          </div>

          {/* Wide Story Card */}
          <div className="md:col-span-2 md:row-span-1 relative rounded-3xl overflow-hidden group cursor-pointer min-h-[260px] md:min-h-0">
            <img
              src={stories.stories[1].imageUrl}
              alt={stories.stories[1].title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-10 max-w-md">
              <span className="font-label text-white/70 uppercase text-[10px] tracking-[0.2em] mb-2">
                {stories.stories[1].tag}
              </span>
              <h3 className="font-display-lg text-white text-3xl mb-4">{stories.stories[1].title}</h3>
              <p className="text-white/80 font-body line-clamp-2">{stories.stories[1].excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-white font-label text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                Read Full Story
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
