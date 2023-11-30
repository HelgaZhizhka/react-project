export interface Country {
  name: { common: string };
}

export interface RootState {
  countries: Country[];
}
