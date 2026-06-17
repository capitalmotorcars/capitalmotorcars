import fs from 'fs';

const filePath = 'src/components/JsonLd.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const vehicleSchemaFuncs = `
export function createVehicleSchema(deal: {
  make: string;
  model: string;
  year: number;
  trim?: string;
  monthly_price: number;
  down_payment: number;
  lease_term: number;
  image_url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: \`\${deal.year} \${deal.make} \${deal.model} \${deal.trim || ''}\`.trim(),
    image: deal.image_url,
    brand: {
      '@type': 'Brand',
      name: deal.make,
    },
    modelDate: deal.year.toString(),
    itemCondition: 'https://schema.org/NewCondition',
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: deal.monthly_price,
        priceCurrency: 'USD',
        unitCode: 'MON',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitCode: 'MON'
        }
      },
      itemOffered: {
        '@type': 'Service',
        name: 'Auto Lease',
        description: \`\${deal.lease_term} month lease with $\${deal.down_payment} due at signing.\`
      },
      seller: {
        '@type': 'AutoDealer',
        name: 'Capital Motor Cars',
        url: 'https://www.capitalmotorcars.com',
      },
    },
  };
}
`;

content = content + '\n' + vehicleSchemaFuncs;
fs.writeFileSync(filePath, content);
console.log('Added createVehicleSchema to JsonLd.tsx');
