import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { MapPin } from 'lucide-react';

export default function HTMLSitemapPage() {
  return (
    <Layout>
      <SEO
        title="HTML Sitemap & Locations | Capital Motor Cars"
        description="Browse all the areas we serve in New Jersey and New York. Find specific brand lease deals in your exact city."
        canonicalPath="/sitemap"
      />
      
      <div className="bg-muted/10 border-b border-border/30 pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tight">Areas We Serve</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the best lease deals delivered straight to your driveway in the following locations.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border/50">BMW Lease Deals by City</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <li><Link to="/bmw-lease-deals-paramus" className="text-muted-foreground hover:text-accent transition-colors">Paramus, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-hoboken" className="text-muted-foreground hover:text-accent transition-colors">Hoboken, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-jersey-city" className="text-muted-foreground hover:text-accent transition-colors">Jersey City, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-edgewater" className="text-muted-foreground hover:text-accent transition-colors">Edgewater, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-short-hills" className="text-muted-foreground hover:text-accent transition-colors">Short Hills, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-englewood" className="text-muted-foreground hover:text-accent transition-colors">Englewood, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-fort-lee" className="text-muted-foreground hover:text-accent transition-colors">Fort Lee, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-alpine" className="text-muted-foreground hover:text-accent transition-colors">Alpine, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-saddle-river" className="text-muted-foreground hover:text-accent transition-colors">Saddle River, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-ridgewood" className="text-muted-foreground hover:text-accent transition-colors">Ridgewood, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-tenafly" className="text-muted-foreground hover:text-accent transition-colors">Tenafly, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-cherry-hill" className="text-muted-foreground hover:text-accent transition-colors">Cherry Hill, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-marlton" className="text-muted-foreground hover:text-accent transition-colors">Marlton, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-moorestown" className="text-muted-foreground hover:text-accent transition-colors">Moorestown, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-haddonfield" className="text-muted-foreground hover:text-accent transition-colors">Haddonfield, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-princeton" className="text-muted-foreground hover:text-accent transition-colors">Princeton, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-morristown" className="text-muted-foreground hover:text-accent transition-colors">Morristown, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-westfield" className="text-muted-foreground hover:text-accent transition-colors">Westfield, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-summit" className="text-muted-foreground hover:text-accent transition-colors">Summit, NJ</Link></li>
                <li><Link to="/bmw-lease-deals-montclair" className="text-muted-foreground hover:text-accent transition-colors">Montclair, NJ</Link></li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border/50">Mercedes-Benz Lease Deals by City</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <li><Link to="/mercedes-benz-lease-deals-paramus" className="text-muted-foreground hover:text-accent transition-colors">Paramus, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-hoboken" className="text-muted-foreground hover:text-accent transition-colors">Hoboken, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-jersey-city" className="text-muted-foreground hover:text-accent transition-colors">Jersey City, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-edgewater" className="text-muted-foreground hover:text-accent transition-colors">Edgewater, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-short-hills" className="text-muted-foreground hover:text-accent transition-colors">Short Hills, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-englewood" className="text-muted-foreground hover:text-accent transition-colors">Englewood, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-fort-lee" className="text-muted-foreground hover:text-accent transition-colors">Fort Lee, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-alpine" className="text-muted-foreground hover:text-accent transition-colors">Alpine, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-saddle-river" className="text-muted-foreground hover:text-accent transition-colors">Saddle River, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-ridgewood" className="text-muted-foreground hover:text-accent transition-colors">Ridgewood, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-tenafly" className="text-muted-foreground hover:text-accent transition-colors">Tenafly, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-cherry-hill" className="text-muted-foreground hover:text-accent transition-colors">Cherry Hill, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-marlton" className="text-muted-foreground hover:text-accent transition-colors">Marlton, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-moorestown" className="text-muted-foreground hover:text-accent transition-colors">Moorestown, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-haddonfield" className="text-muted-foreground hover:text-accent transition-colors">Haddonfield, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-princeton" className="text-muted-foreground hover:text-accent transition-colors">Princeton, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-morristown" className="text-muted-foreground hover:text-accent transition-colors">Morristown, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-westfield" className="text-muted-foreground hover:text-accent transition-colors">Westfield, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-summit" className="text-muted-foreground hover:text-accent transition-colors">Summit, NJ</Link></li>
                <li><Link to="/mercedes-benz-lease-deals-montclair" className="text-muted-foreground hover:text-accent transition-colors">Montclair, NJ</Link></li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border/50">Audi Lease Deals by City</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <li><Link to="/audi-lease-deals-paramus" className="text-muted-foreground hover:text-accent transition-colors">Paramus, NJ</Link></li>
                <li><Link to="/audi-lease-deals-hoboken" className="text-muted-foreground hover:text-accent transition-colors">Hoboken, NJ</Link></li>
                <li><Link to="/audi-lease-deals-jersey-city" className="text-muted-foreground hover:text-accent transition-colors">Jersey City, NJ</Link></li>
                <li><Link to="/audi-lease-deals-edgewater" className="text-muted-foreground hover:text-accent transition-colors">Edgewater, NJ</Link></li>
                <li><Link to="/audi-lease-deals-short-hills" className="text-muted-foreground hover:text-accent transition-colors">Short Hills, NJ</Link></li>
                <li><Link to="/audi-lease-deals-englewood" className="text-muted-foreground hover:text-accent transition-colors">Englewood, NJ</Link></li>
                <li><Link to="/audi-lease-deals-fort-lee" className="text-muted-foreground hover:text-accent transition-colors">Fort Lee, NJ</Link></li>
                <li><Link to="/audi-lease-deals-alpine" className="text-muted-foreground hover:text-accent transition-colors">Alpine, NJ</Link></li>
                <li><Link to="/audi-lease-deals-saddle-river" className="text-muted-foreground hover:text-accent transition-colors">Saddle River, NJ</Link></li>
                <li><Link to="/audi-lease-deals-ridgewood" className="text-muted-foreground hover:text-accent transition-colors">Ridgewood, NJ</Link></li>
                <li><Link to="/audi-lease-deals-tenafly" className="text-muted-foreground hover:text-accent transition-colors">Tenafly, NJ</Link></li>
                <li><Link to="/audi-lease-deals-cherry-hill" className="text-muted-foreground hover:text-accent transition-colors">Cherry Hill, NJ</Link></li>
                <li><Link to="/audi-lease-deals-marlton" className="text-muted-foreground hover:text-accent transition-colors">Marlton, NJ</Link></li>
                <li><Link to="/audi-lease-deals-moorestown" className="text-muted-foreground hover:text-accent transition-colors">Moorestown, NJ</Link></li>
                <li><Link to="/audi-lease-deals-haddonfield" className="text-muted-foreground hover:text-accent transition-colors">Haddonfield, NJ</Link></li>
                <li><Link to="/audi-lease-deals-princeton" className="text-muted-foreground hover:text-accent transition-colors">Princeton, NJ</Link></li>
                <li><Link to="/audi-lease-deals-morristown" className="text-muted-foreground hover:text-accent transition-colors">Morristown, NJ</Link></li>
                <li><Link to="/audi-lease-deals-westfield" className="text-muted-foreground hover:text-accent transition-colors">Westfield, NJ</Link></li>
                <li><Link to="/audi-lease-deals-summit" className="text-muted-foreground hover:text-accent transition-colors">Summit, NJ</Link></li>
                <li><Link to="/audi-lease-deals-montclair" className="text-muted-foreground hover:text-accent transition-colors">Montclair, NJ</Link></li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border/50">Porsche Lease Deals by City</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <li><Link to="/porsche-lease-deals-paramus" className="text-muted-foreground hover:text-accent transition-colors">Paramus, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-hoboken" className="text-muted-foreground hover:text-accent transition-colors">Hoboken, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-jersey-city" className="text-muted-foreground hover:text-accent transition-colors">Jersey City, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-edgewater" className="text-muted-foreground hover:text-accent transition-colors">Edgewater, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-short-hills" className="text-muted-foreground hover:text-accent transition-colors">Short Hills, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-englewood" className="text-muted-foreground hover:text-accent transition-colors">Englewood, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-fort-lee" className="text-muted-foreground hover:text-accent transition-colors">Fort Lee, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-alpine" className="text-muted-foreground hover:text-accent transition-colors">Alpine, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-saddle-river" className="text-muted-foreground hover:text-accent transition-colors">Saddle River, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-ridgewood" className="text-muted-foreground hover:text-accent transition-colors">Ridgewood, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-tenafly" className="text-muted-foreground hover:text-accent transition-colors">Tenafly, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-cherry-hill" className="text-muted-foreground hover:text-accent transition-colors">Cherry Hill, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-marlton" className="text-muted-foreground hover:text-accent transition-colors">Marlton, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-moorestown" className="text-muted-foreground hover:text-accent transition-colors">Moorestown, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-haddonfield" className="text-muted-foreground hover:text-accent transition-colors">Haddonfield, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-princeton" className="text-muted-foreground hover:text-accent transition-colors">Princeton, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-morristown" className="text-muted-foreground hover:text-accent transition-colors">Morristown, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-westfield" className="text-muted-foreground hover:text-accent transition-colors">Westfield, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-summit" className="text-muted-foreground hover:text-accent transition-colors">Summit, NJ</Link></li>
                <li><Link to="/porsche-lease-deals-montclair" className="text-muted-foreground hover:text-accent transition-colors">Montclair, NJ</Link></li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border/50">Lexus Lease Deals by City</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <li><Link to="/lexus-lease-deals-paramus" className="text-muted-foreground hover:text-accent transition-colors">Paramus, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-hoboken" className="text-muted-foreground hover:text-accent transition-colors">Hoboken, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-jersey-city" className="text-muted-foreground hover:text-accent transition-colors">Jersey City, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-edgewater" className="text-muted-foreground hover:text-accent transition-colors">Edgewater, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-short-hills" className="text-muted-foreground hover:text-accent transition-colors">Short Hills, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-englewood" className="text-muted-foreground hover:text-accent transition-colors">Englewood, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-fort-lee" className="text-muted-foreground hover:text-accent transition-colors">Fort Lee, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-alpine" className="text-muted-foreground hover:text-accent transition-colors">Alpine, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-saddle-river" className="text-muted-foreground hover:text-accent transition-colors">Saddle River, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-ridgewood" className="text-muted-foreground hover:text-accent transition-colors">Ridgewood, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-tenafly" className="text-muted-foreground hover:text-accent transition-colors">Tenafly, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-cherry-hill" className="text-muted-foreground hover:text-accent transition-colors">Cherry Hill, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-marlton" className="text-muted-foreground hover:text-accent transition-colors">Marlton, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-moorestown" className="text-muted-foreground hover:text-accent transition-colors">Moorestown, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-haddonfield" className="text-muted-foreground hover:text-accent transition-colors">Haddonfield, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-princeton" className="text-muted-foreground hover:text-accent transition-colors">Princeton, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-morristown" className="text-muted-foreground hover:text-accent transition-colors">Morristown, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-westfield" className="text-muted-foreground hover:text-accent transition-colors">Westfield, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-summit" className="text-muted-foreground hover:text-accent transition-colors">Summit, NJ</Link></li>
                <li><Link to="/lexus-lease-deals-montclair" className="text-muted-foreground hover:text-accent transition-colors">Montclair, NJ</Link></li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border/50">Land Rover Lease Deals by City</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <li><Link to="/land-rover-lease-deals-paramus" className="text-muted-foreground hover:text-accent transition-colors">Paramus, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-hoboken" className="text-muted-foreground hover:text-accent transition-colors">Hoboken, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-jersey-city" className="text-muted-foreground hover:text-accent transition-colors">Jersey City, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-edgewater" className="text-muted-foreground hover:text-accent transition-colors">Edgewater, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-short-hills" className="text-muted-foreground hover:text-accent transition-colors">Short Hills, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-englewood" className="text-muted-foreground hover:text-accent transition-colors">Englewood, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-fort-lee" className="text-muted-foreground hover:text-accent transition-colors">Fort Lee, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-alpine" className="text-muted-foreground hover:text-accent transition-colors">Alpine, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-saddle-river" className="text-muted-foreground hover:text-accent transition-colors">Saddle River, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-ridgewood" className="text-muted-foreground hover:text-accent transition-colors">Ridgewood, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-tenafly" className="text-muted-foreground hover:text-accent transition-colors">Tenafly, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-cherry-hill" className="text-muted-foreground hover:text-accent transition-colors">Cherry Hill, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-marlton" className="text-muted-foreground hover:text-accent transition-colors">Marlton, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-moorestown" className="text-muted-foreground hover:text-accent transition-colors">Moorestown, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-haddonfield" className="text-muted-foreground hover:text-accent transition-colors">Haddonfield, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-princeton" className="text-muted-foreground hover:text-accent transition-colors">Princeton, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-morristown" className="text-muted-foreground hover:text-accent transition-colors">Morristown, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-westfield" className="text-muted-foreground hover:text-accent transition-colors">Westfield, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-summit" className="text-muted-foreground hover:text-accent transition-colors">Summit, NJ</Link></li>
                <li><Link to="/land-rover-lease-deals-montclair" className="text-muted-foreground hover:text-accent transition-colors">Montclair, NJ</Link></li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border/50">Jeep Lease Deals by City</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <li><Link to="/jeep-lease-deals-paramus" className="text-muted-foreground hover:text-accent transition-colors">Paramus, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-hoboken" className="text-muted-foreground hover:text-accent transition-colors">Hoboken, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-jersey-city" className="text-muted-foreground hover:text-accent transition-colors">Jersey City, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-edgewater" className="text-muted-foreground hover:text-accent transition-colors">Edgewater, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-short-hills" className="text-muted-foreground hover:text-accent transition-colors">Short Hills, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-englewood" className="text-muted-foreground hover:text-accent transition-colors">Englewood, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-fort-lee" className="text-muted-foreground hover:text-accent transition-colors">Fort Lee, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-alpine" className="text-muted-foreground hover:text-accent transition-colors">Alpine, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-saddle-river" className="text-muted-foreground hover:text-accent transition-colors">Saddle River, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-ridgewood" className="text-muted-foreground hover:text-accent transition-colors">Ridgewood, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-tenafly" className="text-muted-foreground hover:text-accent transition-colors">Tenafly, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-cherry-hill" className="text-muted-foreground hover:text-accent transition-colors">Cherry Hill, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-marlton" className="text-muted-foreground hover:text-accent transition-colors">Marlton, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-moorestown" className="text-muted-foreground hover:text-accent transition-colors">Moorestown, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-haddonfield" className="text-muted-foreground hover:text-accent transition-colors">Haddonfield, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-princeton" className="text-muted-foreground hover:text-accent transition-colors">Princeton, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-morristown" className="text-muted-foreground hover:text-accent transition-colors">Morristown, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-westfield" className="text-muted-foreground hover:text-accent transition-colors">Westfield, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-summit" className="text-muted-foreground hover:text-accent transition-colors">Summit, NJ</Link></li>
                <li><Link to="/jeep-lease-deals-montclair" className="text-muted-foreground hover:text-accent transition-colors">Montclair, NJ</Link></li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border/50">Honda Lease Deals by City</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <li><Link to="/honda-lease-deals-paramus" className="text-muted-foreground hover:text-accent transition-colors">Paramus, NJ</Link></li>
                <li><Link to="/honda-lease-deals-hoboken" className="text-muted-foreground hover:text-accent transition-colors">Hoboken, NJ</Link></li>
                <li><Link to="/honda-lease-deals-jersey-city" className="text-muted-foreground hover:text-accent transition-colors">Jersey City, NJ</Link></li>
                <li><Link to="/honda-lease-deals-edgewater" className="text-muted-foreground hover:text-accent transition-colors">Edgewater, NJ</Link></li>
                <li><Link to="/honda-lease-deals-short-hills" className="text-muted-foreground hover:text-accent transition-colors">Short Hills, NJ</Link></li>
                <li><Link to="/honda-lease-deals-englewood" className="text-muted-foreground hover:text-accent transition-colors">Englewood, NJ</Link></li>
                <li><Link to="/honda-lease-deals-fort-lee" className="text-muted-foreground hover:text-accent transition-colors">Fort Lee, NJ</Link></li>
                <li><Link to="/honda-lease-deals-alpine" className="text-muted-foreground hover:text-accent transition-colors">Alpine, NJ</Link></li>
                <li><Link to="/honda-lease-deals-saddle-river" className="text-muted-foreground hover:text-accent transition-colors">Saddle River, NJ</Link></li>
                <li><Link to="/honda-lease-deals-ridgewood" className="text-muted-foreground hover:text-accent transition-colors">Ridgewood, NJ</Link></li>
                <li><Link to="/honda-lease-deals-tenafly" className="text-muted-foreground hover:text-accent transition-colors">Tenafly, NJ</Link></li>
                <li><Link to="/honda-lease-deals-cherry-hill" className="text-muted-foreground hover:text-accent transition-colors">Cherry Hill, NJ</Link></li>
                <li><Link to="/honda-lease-deals-marlton" className="text-muted-foreground hover:text-accent transition-colors">Marlton, NJ</Link></li>
                <li><Link to="/honda-lease-deals-moorestown" className="text-muted-foreground hover:text-accent transition-colors">Moorestown, NJ</Link></li>
                <li><Link to="/honda-lease-deals-haddonfield" className="text-muted-foreground hover:text-accent transition-colors">Haddonfield, NJ</Link></li>
                <li><Link to="/honda-lease-deals-princeton" className="text-muted-foreground hover:text-accent transition-colors">Princeton, NJ</Link></li>
                <li><Link to="/honda-lease-deals-morristown" className="text-muted-foreground hover:text-accent transition-colors">Morristown, NJ</Link></li>
                <li><Link to="/honda-lease-deals-westfield" className="text-muted-foreground hover:text-accent transition-colors">Westfield, NJ</Link></li>
                <li><Link to="/honda-lease-deals-summit" className="text-muted-foreground hover:text-accent transition-colors">Summit, NJ</Link></li>
                <li><Link to="/honda-lease-deals-montclair" className="text-muted-foreground hover:text-accent transition-colors">Montclair, NJ</Link></li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border/50">Toyota Lease Deals by City</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <li><Link to="/toyota-lease-deals-paramus" className="text-muted-foreground hover:text-accent transition-colors">Paramus, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-hoboken" className="text-muted-foreground hover:text-accent transition-colors">Hoboken, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-jersey-city" className="text-muted-foreground hover:text-accent transition-colors">Jersey City, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-edgewater" className="text-muted-foreground hover:text-accent transition-colors">Edgewater, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-short-hills" className="text-muted-foreground hover:text-accent transition-colors">Short Hills, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-englewood" className="text-muted-foreground hover:text-accent transition-colors">Englewood, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-fort-lee" className="text-muted-foreground hover:text-accent transition-colors">Fort Lee, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-alpine" className="text-muted-foreground hover:text-accent transition-colors">Alpine, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-saddle-river" className="text-muted-foreground hover:text-accent transition-colors">Saddle River, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-ridgewood" className="text-muted-foreground hover:text-accent transition-colors">Ridgewood, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-tenafly" className="text-muted-foreground hover:text-accent transition-colors">Tenafly, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-cherry-hill" className="text-muted-foreground hover:text-accent transition-colors">Cherry Hill, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-marlton" className="text-muted-foreground hover:text-accent transition-colors">Marlton, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-moorestown" className="text-muted-foreground hover:text-accent transition-colors">Moorestown, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-haddonfield" className="text-muted-foreground hover:text-accent transition-colors">Haddonfield, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-princeton" className="text-muted-foreground hover:text-accent transition-colors">Princeton, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-morristown" className="text-muted-foreground hover:text-accent transition-colors">Morristown, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-westfield" className="text-muted-foreground hover:text-accent transition-colors">Westfield, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-summit" className="text-muted-foreground hover:text-accent transition-colors">Summit, NJ</Link></li>
                <li><Link to="/toyota-lease-deals-montclair" className="text-muted-foreground hover:text-accent transition-colors">Montclair, NJ</Link></li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border/50">Ford Lease Deals by City</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <li><Link to="/ford-lease-deals-paramus" className="text-muted-foreground hover:text-accent transition-colors">Paramus, NJ</Link></li>
                <li><Link to="/ford-lease-deals-hoboken" className="text-muted-foreground hover:text-accent transition-colors">Hoboken, NJ</Link></li>
                <li><Link to="/ford-lease-deals-jersey-city" className="text-muted-foreground hover:text-accent transition-colors">Jersey City, NJ</Link></li>
                <li><Link to="/ford-lease-deals-edgewater" className="text-muted-foreground hover:text-accent transition-colors">Edgewater, NJ</Link></li>
                <li><Link to="/ford-lease-deals-short-hills" className="text-muted-foreground hover:text-accent transition-colors">Short Hills, NJ</Link></li>
                <li><Link to="/ford-lease-deals-englewood" className="text-muted-foreground hover:text-accent transition-colors">Englewood, NJ</Link></li>
                <li><Link to="/ford-lease-deals-fort-lee" className="text-muted-foreground hover:text-accent transition-colors">Fort Lee, NJ</Link></li>
                <li><Link to="/ford-lease-deals-alpine" className="text-muted-foreground hover:text-accent transition-colors">Alpine, NJ</Link></li>
                <li><Link to="/ford-lease-deals-saddle-river" className="text-muted-foreground hover:text-accent transition-colors">Saddle River, NJ</Link></li>
                <li><Link to="/ford-lease-deals-ridgewood" className="text-muted-foreground hover:text-accent transition-colors">Ridgewood, NJ</Link></li>
                <li><Link to="/ford-lease-deals-tenafly" className="text-muted-foreground hover:text-accent transition-colors">Tenafly, NJ</Link></li>
                <li><Link to="/ford-lease-deals-cherry-hill" className="text-muted-foreground hover:text-accent transition-colors">Cherry Hill, NJ</Link></li>
                <li><Link to="/ford-lease-deals-marlton" className="text-muted-foreground hover:text-accent transition-colors">Marlton, NJ</Link></li>
                <li><Link to="/ford-lease-deals-moorestown" className="text-muted-foreground hover:text-accent transition-colors">Moorestown, NJ</Link></li>
                <li><Link to="/ford-lease-deals-haddonfield" className="text-muted-foreground hover:text-accent transition-colors">Haddonfield, NJ</Link></li>
                <li><Link to="/ford-lease-deals-princeton" className="text-muted-foreground hover:text-accent transition-colors">Princeton, NJ</Link></li>
                <li><Link to="/ford-lease-deals-morristown" className="text-muted-foreground hover:text-accent transition-colors">Morristown, NJ</Link></li>
                <li><Link to="/ford-lease-deals-westfield" className="text-muted-foreground hover:text-accent transition-colors">Westfield, NJ</Link></li>
                <li><Link to="/ford-lease-deals-summit" className="text-muted-foreground hover:text-accent transition-colors">Summit, NJ</Link></li>
                <li><Link to="/ford-lease-deals-montclair" className="text-muted-foreground hover:text-accent transition-colors">Montclair, NJ</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </Layout>
  );
}
