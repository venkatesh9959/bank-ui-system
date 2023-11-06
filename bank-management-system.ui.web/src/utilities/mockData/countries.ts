const countries: string[] = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'India',
];

const statesByCountry: Record<string, string[]> = {
  'United States': ['New York', 'California', 'Texas', 'Florida'],
  Canada: ['Ontario', 'Quebec', 'Alberta', 'British Columbia'],
  'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  Germany: ['Berlin', 'Bavaria', 'Hamburg', 'Baden-Württemberg'],
  France: ['Île-de-France', "Provence-Alpes-Côte d'Azur", 'Occitanie', 'Auvergne-Rhône-Alpes'],
  India: ['Telangana', 'Andhra Pradesh', 'Tamil Nadu', 'Karnataka', 'Assam'],
};

export { countries, statesByCountry };
